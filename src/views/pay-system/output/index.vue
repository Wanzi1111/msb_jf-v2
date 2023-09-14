<template>
  <div class="app-container order-category">
    <el-form :inline="true" label-width="120px">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="起止时间">
            <el-date-picker
              v-model="daterange"
              style="width: 100%"
              value-format="yyyy-MM-dd"
              size="small"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="searchHandle"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
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
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
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
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出款渠道">
            <el-select v-model="params.providerCode" size="small" placeholder="请选择退款渠道">
              <el-option
                v-for="item in providerList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出款类型">
            <el-select v-model="params.payoutType" size="small" placeholder="请选择退款产品">
              <el-option
                v-for="item in payoutTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出款产品">
            <el-select v-model="params.payoutProductCode" size="small" placeholder="请选择退款产品">
              <el-option
                v-for="item in productList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出款状态">
            <el-select v-model="params.payoutStatus" size="small" placeholder="请选择退款状态">
              <el-option
                v-for="item in statusList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6">
          <el-form-item label="出款流水号">
            <el-input v-model.trim="params.uniqueRefundNo" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item class="search-wrap">
            <el-button type="primary" size="small" :loading="$store.getters.loadings['_payment_refundList']" @click="searchHandle">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="hd-operation">
      <div class="inline">
        <span>
          累计出款{{ statisticData.totalCount }}笔，共计￥{{ statisticData.amtCny }}，${{ statisticData.amtUsd }}，
          成功{{ statisticData.succCount }}笔，失败{{ statisticData.failCount }}笔，出款成功率{{ statisticData.succRate }}
        </span>
      </div>
    </div>
    <basics-table
      ref="table"
      :table="{size: 'small', stripe: true}"
      :list="payList"
      :get-list="getPayoutList"
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
import {
  payBusinessApi,
  payPrividerApi,
  paySceneApi,
  payoutProductApi
} from "@/api/pay-system/common";
import {
  payoutListApi,
  payoutStatisticApi,
  payoutStatusListApi
} from "@/api/pay-system/output";
import axios from 'axios'
import columns from './columns/list'
// columns不需要watch
Object.freeze(columns)
export default {
  name: 'PaySystemPayout',
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
        payoutType: '', // 出款类型
        payoutProductCode: '', // 出款产品
        payoutStatus: '', // 出款状态
        payoutSeqId: '', // 出款流水号
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
      payoutTypeList: [
        { code: "", name: "全部" },
        { code: "PUBLIC", name: "对公" },
        { code: "PRIVATE", name: "对私" },
      ],
      productList: [
        { code: "", name: "全部" },
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
    this.getPayoutList();
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
    getPayoutStatistic() {
      payoutStatisticApi(this.params).then((res) => {
        this.statisticData = res.data;
      })
    },
    /* 获取各个枚举值 */
    getEnumList() {
      const requestList = [
        payBusinessApi(), payPrividerApi(), paySceneApi(), payoutProductApi(), payoutStatusListApi()
      ];
      axios.all(requestList)
        .then(axios.spread((businessList, providerList, sceneList, productList, statusList) => {
          // todo
          this.businessList.push(...businessList.data);
          this.providerList.push(...providerList.data);
          this.sceneList.push(...sceneList.data);
          this.productList.push(...productList.data);
          this.statusList.push(...statusList.data);
        }));
    },
    searchHandle() {
      this.getPayoutList();
    },
    getPayoutList() {
      this.tableLoading = true;
      this.params.startTime = `${this.params.startTime.split(' ')[0]} 00:00:00`;
      this.params.endTime = `${this.params.endTime.split(' ')[0]} 23:59:59`;
      const { listQuery } = this;
      this.params.pageSize = listQuery.limit;
      this.params.pageIndex = listQuery.page;
      payoutListApi(this.params).then((res) => {
        this.tableLoading = false;
        this.payList = res.data.items;
        this.totalCount = res.data.totalCount;
      }).catch(() => {
        this.tableLoading = false;
      });
      this.getPayoutStatistic();
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getPayoutList(this.params)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.params.pageIndex = val;
      this.getPayoutList(this.params);
    },
    jumpDetails(row) {
      const id = row.payoutSeqId;
      this.$router.push({
        path: '/pay-system/output/details',
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
  /deep/.el-form-item {
    display: flex;
    .el-form-item__content {
      flex: 1;
      > div {
        width: 100%;
      }
    }
  }
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
  /deep/.search-wrap {
    .el-form-item__content {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>

