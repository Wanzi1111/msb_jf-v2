<template>
  <div class="app-container order-category">
    <block-title title="支付流水" />
    <el-form :inline="true">
      <el-row>
        <el-form-item label="起止时间">
          <el-date-picker
            v-model="daterange"
            value-format="yyyy-MM-dd"
            size="small"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="searchHandle"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="业务方">
          <el-select v-model="params.bizCode" size="small" placeholder="请选择业务方">
            <el-option
              v-for="(item,key) in businessList"
              :key="item.code + key"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="业务场景">
          <el-select v-model="params.sceneCode" size="small" placeholder="请选择业务场景">
            <el-option
              v-for="(item,key) in sceneList"
              :key="item.code + key"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支付渠道">
          <el-select v-model="params.providerCode" size="small" placeholder="请选择支付渠道">
            <el-option
              v-for="(item,key) in providerList"
              :key="item.code + key"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="支付产品">
          <el-select v-model="params.payProductCode" size="small" placeholder="请选择支付产品">
            <el-option
              v-for="(item,key) in productList"
              :key="item.code + key"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="params.payStatus" size="small" placeholder="请选择支付状态">
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="业务订单号">
          <el-input v-model.trim="params.orderId" size="small" />
        </el-form-item>
        <el-form-item label="三方支付流水号">
          <el-input v-model.trim="params.uniqueOrderNo" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" :loading="$store.getters.loadings['_payment_payList']" @click="searchHandle">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="hd-operation">
      <div class="inline">
        <span>
          累计支付{{ statisticData.totalCount }}笔，共计￥{{ statisticData.amtCny }}，${{ statisticData.amtUsd }}，
          成功{{ statisticData.succCount }}笔，失败{{ statisticData.failCount }}笔，支付成功率{{ statisticData.succRate }}
        </span>
      </div>
    </div>
    <basics-table
      ref="table"
      :table="table"
      :loading="loading"
      :list="payList"
      :get-list="getList"
      :columns="columns"
      :total="totalCount"
      :list-query="listQuery"
      :action-function="actionFunction"
    >
      <template slot="provider" slot-scope="{ row }">
        <el-tag size="small" :type="providerMap(row.provider)">{{ row.provider }}</el-tag>
      </template>
      <template slot="currency" slot-scope="{ row }">
        <el-tag size="small" :type="currencyMap(row.currency)">{{ row.currency }}</el-tag>
      </template>
      <template slot="payStatus" slot-scope="{ row }">
        <el-tag size="small" :type="payStatusMap(row.payStatus)">{{ row.payStatus }}</el-tag>
      </template>
    </basics-table>
  </div>
</template>

<script>
import BlockTitle from '@/components/BlockTitle'
import columns, { actions } from './columns/list'
import { payBusinessApi, payPrividerApi, payProductApi,
  paySceneApi, payStatusApi } from "@/api/pay-system/common";
import { payListApi, payStatisticApi } from "@/api/pay-system/flow";
import axios from 'axios'
Object.freeze(columns)
export default {
  name: 'PaySystemFlow',
  components: { BlockTitle },
  data() {
    const nowTimeStamp = +new Date();
    return {
      table: { stripe: true },
      columns,
      actionFunction: actions({ handleDetails: this.jumpDetails }),
      list: null,
      loading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      /* ====== */
      daterange: [this.setTime(nowTimeStamp, 7), this.setTime(nowTimeStamp, 0)],
      businessId: null,
      tableLoading: false,
      totalCount: 0,
      params: {
        startTime: '',
        endTime: '',
        bizCode: '', // 业务方
        sceneCode: '', // 业务场景
        providerCode: '', // 支付渠道
        payProductCode: '', // 支付产品
        payStatus: '', // 支付状态
        paySeqId: '', // 流水号
        pageIndex: 1,
        pageSize: 10,
        uniqueOrderNo: '', // 三方支付流水号
        orderId: '', // 订单号
      },
      businessList: [
        { code: "", name: "全部" }
      ],
      sceneList: [
        { code: "", name: "全部" }
      ],
      providerList: [
        { code: "", name: "全部" }
      ],
      productList: [
        { code: "", name: "全部" }
      ],
      statusList: [
        { code: "", name: "全部" }
      ],
      payList: [],
      statisticData: {
        "totalCount": 0,
        "succCount": 0,
        "failCount": 0,
        "succRate": null,
        "amtCny": 0,
        "amtUsd": 0
      }
    }
  },
  watch: {
    daterange(val) {
      if (val !== '') {
        this.params.startTime = val[0];
        this.params.endTime = val[1];
      }
    },
  },
  async created() {
    this.params.startTime = this.daterange[0];
    this.params.endTime = this.daterange[1];
    this.getEnumList();
    this.getPayList();
  },
  methods: {
    getList() {
      const { listQuery } = this;
      console.log(listQuery, 'query')
      this.getPayList();
    },
    fomatTime(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      let mm = month;
      let dd = day;
      if (mm < 10) {
        mm = `0${mm}`
      }
      if (dd < 10) {
        dd = `0${dd}`
      }
      return `${year}-${mm}-${dd}`;
    },
    setTime(timestamp, num) {
      const time = timestamp - num * 24 * 3600 * 1000;
      return this.fomatTime(time);
    },
    /* 获取统计字段 */
    getPayStatistic() {
      payStatisticApi(this.params).then((res) => {
        this.statisticData = res.data;
      })
    },
    /* 获取各个枚举值 */
    getEnumList() {
      // todo
      const requestList = [
        payBusinessApi(), payPrividerApi(), paySceneApi(), payStatusApi(), payProductApi()
      ];
      axios.all(requestList)
        .then(axios.spread((businessList, providerList, sceneList, statusList, productList) => {
          // todo
          this.businessList.push(...businessList.data);
          this.providerList.push(...providerList.data);
          this.sceneList.push(...sceneList.data);
          this.statusList.push(...statusList.data);
          this.productList.push(...productList.data);
        }));
    },
    searchHandle() {
      this.getPayList();
    },
    getPayList() {
      this.tableLoading = true;
      this.params.startTime = `${this.params.startTime.split(' ')[0]} 00:00:00`;
      this.params.endTime = `${this.params.endTime.split(' ')[0]} 23:59:59`;
      const { listQuery } = this;
      this.params.pageSize = listQuery.limit;
      this.params.pageIndex = listQuery.page;
      payListApi(this.params).then((res) => {
        this.tableLoading = false;
        this.payList = res.data.items;
        this.totalCount = res.data.totalCount;
      }).catch(() => {
        this.tableLoading = false;
      });
      this.getPayStatistic();
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getPayList(this.params)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.pageIndex = val;
      this.getPayList(this.params);
    },
    jumpDetails(value, row) {
      // todo
      const id = row.paySeqId;
      this.$router.push({
        path: '/pay-system/flow/details',
        query: { id }
      })
    },
    /* 支付状态映射 */
    payStatusMap(status) {
      let type = 'success';
      switch (status) {
        case '支付失败':
          type = 'danger';
          break
        case '待支付':
          type = 'warning';
          break
        case '其他':
          type = 'info';
          break
      }
      return type;
    },
    currencyMap(currency) {
      return currency === '人民币' ? 'success' : 'warning'
    },
    providerMap(provider) {
      let type = 'success';
      switch (provider) {
        case '易宝':
          type = '';
          break
        case '银联':
          type = 'warning';
          break
        case 'Paypal':
          type = 'danger';
          break
      }
      return type;
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-wrap {
    padding-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
  .hd-operation .inline {
    display: inline-block;
    padding: 10px;
    border-left: 3px solid #97a8be;
    margin-bottom: 5px;
    font-size: 13px;
  }
</style>

