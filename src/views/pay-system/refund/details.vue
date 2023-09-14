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
        prop="orderId"
        label="业务退款订单号"
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
        prop="refundAmount"
        label="退款金额(¥/$)"
      />
      <el-table-column
        align="center"
        prop="currency"
        label="币种"
      />
    </el-table>
    <div class="hd-operation">
      <div class="inline">
        <span>
          退款流水详情
        </span>
      </div>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="payDetails.refundInfo"
      stripe
      size="small"
      :header-cell-style="{background: '#eef1f6',color: '#606266','text-align': 'center'}"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="refundSeqId"
        label="中台退款流水号"
        width="150"
      />
      <el-table-column
        align="center"
        prop="uniqueRefundNo"
        label="三方退款流水号"
        width="150"
      />
      <el-table-column
        align="center"
        prop="provider"
        label="退款渠道"
      />
      <el-table-column
        align="center"
        prop="payProduct"
        label="支付产品"
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
      <!--<el-table-column
        align="center"
        prop="bank"
        label="付款银行"
      />
      <el-table-column
        align="center"
        prop="cardType"
        label="卡类型"
      />-->
      <el-table-column
        align="center"
        prop="pyerAcctId"
        label="退款账号或卡号"
      />
      <el-table-column
        align="center"
        prop="divideDetail"
        label="退款商户号"
      />
      <el-table-column
        align="center"
        label="原中台支付流水号"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="jumpDetails(scope.row)">{{ scope.row.paySeqId }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import BlockTitle from '@/components/BlockTitle'
import { refundDetailsApi } from "@/api/pay-system/refund";
export default {
  name: 'PaySystemRefundDetails',
  components: { BlockTitle },
  data() {
    return {
      tableLoading: false,
      payDetails: {
        bizReqInfo: [],
        refundInfo: []
      }
    }
  },
  async created() {
    this.getRefundDetails();
  },
  methods: {
    getRefundDetails() {
      const id = this.$route.query.id;
      refundDetailsApi({}, id).then((res) => {
        // todo
        this.payDetails.bizReqInfo = [res.data.bizReqInfo];
        this.payDetails.refundInfo = [res.data.refundInfo];
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

