<template>
  <div class="app-container order-category">
    <block-title title="退款流水" />
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
              v-for="item in businessList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="业务场景">
          <el-select v-model="params.sceneCode" size="small" placeholder="请选择业务场景">
            <el-option
              v-for="item in sceneList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="退款渠道">
          <el-select v-model="params.providerCode" size="small" placeholder="请选择退款渠道">
            <el-option
              v-for="item in providerList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="退款产品">
          <el-select v-model="params.payProductCode" size="small" placeholder="请选择退款产品">
            <el-option
              v-for="item in productList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="退款状态">
          <el-select v-model="params.refundStatus" size="small" placeholder="请选择退款状态">
            <el-option
              v-for="item in statusList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三方退款流水号">
          <el-input v-model.trim="params.uniqueRefundNo" size="small" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" :loading="$store.getters.loadings['_payment_refundList']" @click="searchHandle">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="hd-operation">
      <div class="inline">
        <span>
          累计退款{{ statisticData.totalCount }}笔，共计￥{{ statisticData.amtCny }}，${{ statisticData.amtUsd }}，
          成功{{ statisticData.succCount }}笔，失败{{ statisticData.failCount }}笔，退款成功率{{ statisticData.succRate }}
        </span>
      </div>
    </div>
    <template v-if="false">
      <el-table
        v-loading="tableLoading"
        :data="payList"
        stripe
        size="small"
        :header-cell-style="{background: '#eef1f6',color: '#606266','text-align': 'center'}"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="bizName"
          label="业务方"
          width="150"
        />
        <el-table-column
          align="center"
          prop="sceneName"
          label="业务场景"
        />
        <el-table-column
          align="center"
          prop="sceneCode"
          label="业务方场景编号"
        />
        <el-table-column
          align="center"
          prop="orderId"
          label="业务订单号"
        />
        <el-table-column
          align="center"
          prop="refundSeqId"
          label="中台退款流水号"
        />
        <el-table-column
          align="center"
          prop="refundSeqId"
          label="三方退款流水号"
        />
        <el-table-column
          align="center"
          prop="provider"
          label="退款渠道"
        />
        <el-table-column
          align="center"
          prop="payProduct"
          label="退款产品"
        />
        <el-table-column
          align="center"
          prop="refundTime"
          label="退款时间"
        />
        <el-table-column
          align="center"
          prop="refundAmount"
          label="退款金额(¥/$)"
        />
        <el-table-column
          align="center"
          prop="currency"
          label="币种"
        />
        <el-table-column
          align="center"
          prop="refundStatus"
          label="退款状态"
        />
        <el-table-column
          align="center"
          prop="userId"
          label="用户ID"
        />
        <el-table-column
          align="center"
          prop="pyerAcctId"
          label="退款账号或卡号"
        />
        <el-table-column
          align="center"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="jumpDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination
          layout="total, prev, pager, next, sizes, jumper"
          :total="totalCount"
          :page-size="params.pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
    <basics-table
      ref="table"
      :table="{size: 'small', stripe: true}"
      :list="payList"
      :get-list="getRefundList"
      :columns="columns"
      :total="totalCount"
      :list-query="listQuery"
    >
      <template slot="provider" slot-scope="{ row }">
        <el-tag size="small" :type="providerMap(row.provider)">{{ row.provider }}</el-tag>
      </template>
      <template slot="currency" slot-scope="{ row }">
        <el-tag size="small" :type="currencyMap(row.currency)">{{ row.currency }}</el-tag>
      </template>
      <template slot="action" slot-scope="{ row }">
        <el-button type="text" @click="jumpDetails(row)">查看详情</el-button>
      </template>
    </basics-table>
  </div>
</template>

<script>
import BlockTitle from '@/components/BlockTitle'
import { payBusinessApi, payPrividerApi, payProductApi,
  paySceneApi, refundStatusApi, refundListApi } from "@/api/pay-system/common";
import { refundStatisticApi } from "@/api/pay-system/refund";
import axios from 'axios'
import columns from './columns/list'
// columns不需要watch
Object.freeze(columns)
export default {
  name: 'PaySystemRefund',
  components: { BlockTitle },
  data() {
    const nowTimeStamp = +new Date();
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      columns,
      daterange: [this.setTime(nowTimeStamp, 7), this.setTime(nowTimeStamp, 0)],
      businessId: null,
      tableLoading: false,
      totalCount: 0,
      params: {
        orderNo: null,
        startTime: '',
        endTime: '',
        bizCode: '', // 业务方
        sceneCode: '', // 业务场景
        providerCode: '', // 支付渠道
        payProductCode: '', // 支付产品
        refundStatus: '', // 退款状态
        uniqueRefundNo: '', // 三方流水号
        pageIndex: 1,
        pageSize: 10
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
      }, // 统计相关
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
    this.getRefundList();
    console.log(this.columns, 'columns======');
  },
  methods: {
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
    getRefundStatistic() {
      refundStatisticApi(this.params).then((res) => {
        this.statisticData = res.data;
      })
    },
    /* 获取各个枚举值 */
    getEnumList() {
      // todo
      const requestList = [
        payBusinessApi(), payPrividerApi(), paySceneApi(), refundStatusApi(), payProductApi()
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
      this.getRefundList();
    },
    getRefundList() {
      this.tableLoading = true;
      this.params.startTime = `${this.params.startTime.split(' ')[0]} 00:00:00`;
      this.params.endTime = `${this.params.endTime.split(' ')[0]} 23:59:59`;
      const { listQuery } = this;
      this.params.pageSize = listQuery.limit;
      this.params.pageIndex = listQuery.page;
      refundListApi(this.params).then((res) => {
        this.tableLoading = false;
        this.payList = res.data.items;
        this.totalCount = res.data.totalCount;
      }).catch(() => {
        this.tableLoading = false;
      });
      this.getRefundStatistic();
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getRefundList(this.params)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.pageIndex = val;
      this.getRefundList(this.params);
    },
    jumpDetails(row) {
      const id = row.refundSeqId;
      this.$router.push({
        path: '/pay-system/user/details',
        query: { id }
      })
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

