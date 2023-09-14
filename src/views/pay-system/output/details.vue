<template>
  <div class="app-container order-category">
    <block-title title="退款详情" />
    <div class="hd-operation">
      <div class="inline">
        <span>
          业务请求信息
        </span>
      </div>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="payDetails.bizReqInfo"
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
        label="业务方-场景编号"
      />
      <el-table-column
        align="center"
        prop="userId"
        label="用户ID"
      />
      <el-table-column
        align="center"
        prop="openId"
        label="用户openID"
      />
      <el-table-column
        align="center"
        prop="orderId"
        label="业务订单号"
      />
      <el-table-column
        align="center"
        prop="payoutAmount"
        label="请求出款金额(¥/$)"
      />
      <el-table-column
        align="center"
        prop="payoutType"
        label="出款类型"
      />
      <el-table-column
        align="center"
        prop="userName"
        label="用户户名"
      />
      <el-table-column
        align="center"
        prop="acctId"
        label="用户账号"
      />
      <el-table-column
        align="center"
        prop="bankName"
        label="开户行名称"
      />
      <el-table-column
        align="center"
        prop="bankNo"
        label="开户行行号"
      />
    </el-table>
    <div class="hd-operation">
      <div class="inline">
        <span>
          出款流水详情
        </span>
      </div>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="payDetails.payoutInfo"
      stripe
      size="small"
      :header-cell-style="{background: '#eef1f6',color: '#606266','text-align': 'center'}"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="payoutSeqId"
        label="出款流水号"
        width="150"
      />
      <el-table-column
        align="center"
        prop="provider"
        label="出款渠道"
      />
      <el-table-column
        align="center"
        prop="payProduct"
        label="出款产品"
      />
      <el-table-column
        align="center"
        prop="payoutTime"
        label="出款时间"
      />
      <el-table-column
        align="center"
        prop="payoutAmount"
        label="出款金额(¥/$)"
      />
      <el-table-column
        align="center"
        prop="payoutStatus"
        label="出款状态"
      />
      <el-table-column
        align="center"
        prop="userName"
        label="用户户名"
      />
      <el-table-column
        align="center"
        prop="acctId"
        label="用户账号"
      />
      <el-table-column
        align="center"
        prop="bankName"
        label="开户行名称"
      />
      <el-table-column
        align="center"
        prop="bankNo"
        label="开户行行号"
      />
      <el-table-column
        align="center"
        prop="merchantNo"
        label="出款商户号"
      />
      <!--<el-table-column
        align="center"
        label="原中台支付流水号"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="jumpDetails(scope.row)">{{ scope.row.paySeqId }}</el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import BlockTitle from '@/components/BlockTitle'
import { payoutDetailsApi } from "@/api/pay-system/output";
export default {
  name: 'PaySystemPayoutDetails',
  components: { BlockTitle },
  data() {
    return {
      tableLoading: false,
      payDetails: {
        bizReqInfo: [],
        payoutInfo: []
      }
    }
  },
  async created() {
    this.getPayoutDetails();
  },
  methods: {
    getPayoutDetails() {
      const id = this.$route.query.id;
      payoutDetailsApi(id).then((res) => {
        this.payDetails.bizReqInfo = [res.data.bizReqInfo];
        this.payDetails.payoutInfo = [res.data.paySeqInfo];
      })
    },
    jumpDetails(row) {
      const id = row.paySeqId;
      this.$router.push({
        path: '/pay-system/flow/details',
        query: { id }
      })
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

