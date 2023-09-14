<template>
  <div class="app-container order-category">
    <block-title title="支付详情" />
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
        label="业务订单号"
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
        prop="orderAmount"
        label="订单金额(¥/$)"
      />
      <el-table-column
        align="center"
        prop="currency"
        label="币种"
      />
      <el-table-column
        align="center"
        prop="goodsParamEx"
        label="商品描述"
      />
    </el-table>
    <div class="hd-operation">
      <div class="inline">
        <span>
          支付流水详情
        </span>
      </div>
    </div>
    <el-table
      v-loading="tableLoading"
      :data="payDetails.paySeqInfo"
      stripe
      size="small"
      :header-cell-style="{background: '#eef1f6',color: '#606266','text-align': 'center'}"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="paySeqId"
        label="中台支付流水号"
        width="150"
      />
      <el-table-column
        align="center"
        prop="uniqueOrderNo"
        label="三方支付流水号"
        width="150"
      />
      <el-table-column
        align="center"
        prop="provider"
        label="支付渠道"
      />
      <el-table-column
        align="center"
        prop="payProduct"
        label="支付产品"
      />
      <el-table-column
        align="center"
        prop="payTime"
        label="支付时间"
      />
      <el-table-column
        align="center"
        prop="payAmount"
        label="支付金额(¥/$)"
      />
      <el-table-column
        align="center"
        prop="currency"
        label="币种"
      />
      <el-table-column
        align="center"
        prop="payStatus"
        label="支付状态"
      />
      <el-table-column
        align="center"
        prop="bank"
        label="付款银行"
      />
      <el-table-column
        align="center"
        prop="cardType"
        label="卡类型"
      />
      <el-table-column
        align="center"
        prop="tradeOrderId"
        label="商户订单号"
      />
      <el-table-column
        align="center"
        prop="bankOrderNo"
        label="银行订单号"
      />
      <el-table-column
        align="center"
        prop="pyerAcctId"
        label="支付账号或卡号"
      />
      <el-table-column
        align="center"
        prop="divideDetail"
        label="分账商户号"
      />
    </el-table>
  </div>
</template>

<script>
import BlockTitle from '@/components/BlockTitle'
import { payDetailsApi } from "@/api/pay-system/flow";
export default {
  name: 'PaySystemFlowDetails',
  components: { BlockTitle },
  data() {
    return {
      tableLoading: false,
      payDetails: {
        bizReqInfo: [],
        paySeqInfo: []
      }
    }
  },
  async created() {
    this.getPayDetails();
  },
  methods: {
    getPayDetails() {
      const id = this.$route.query.id;
      payDetailsApi({}, id).then((res) => {
        // todo
        this.payDetails.bizReqInfo = [res.data.bizReqInfo];
        this.payDetails.paySeqInfo = [res.data.paySeqInfo];
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

