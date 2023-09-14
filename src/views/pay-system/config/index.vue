<template>
  <div class="app-container order-category">
    <block-title title="支付配置" />
    <basics-table
      ref="table"
      :table="table"
      :loading="loading"
      :list="configList"
      :get-list="getPayConfigList"
      :columns="columns"
      :total="totalCount"
      :list-query="listQuery"
      :action-function="actionFunction"
    >
      <template slot="provider" slot-scope="{ row }">
        <el-tag size="small" :type="providerMap(row.provider)">{{ row.provider }}</el-tag>
      </template>
      <template slot="providerStatus" slot-scope="{ row }">
        <el-tag size="small" effect="plain" :type="row.providerStatus === '1' ? 'success' : 'warning'">{{ row.providerStatusName }}</el-tag>
      </template>
      <template slot="openAction" slot-scope="{ row }">
        <el-button size="mini" :disabled="row.providerStatus === '1'" @click="openChannelHandle(row)">{{ row.providerStatus === '1' ? '关闭' : '开启' }}</el-button>
      </template>
    </basics-table>
    <!--配置弹窗-->
    <el-dialog
      title="路由参数配置"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleOfSure"
        width="30%"
        center
        append-to-body
      >
        <div>
          <span>已配置参数：{{ providerText }}{{ configForm.count }}笔/日，剩余笔数{{ otherProviderText }}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="postConfigHandle">确定</el-button>
        </span>
      </el-dialog>
      <el-form label-width="80px" :model="configForm">
        <el-form-item label="支付通道">
          <el-select v-model="configForm.provider" placeholder="请选择">
            <el-option
              v-for="item in providerList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="路由笔数">
          <div style="display: flex">
            <div>
              <el-input v-model="configForm.count" placeholder="" />
            </div>
            <span>笔/日</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextHandle">下一步</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BlockTitle from '@/components/BlockTitle'
import columns, { actions } from './columns/list'
import { payConfigListApi, putPayConfigApi, prdTradeCountApi, openChannelApi } from "@/api/pay-system/config";
export default {
  name: 'PaySystemConfig',
  components: { BlockTitle },
  data() {
    return {
      table: {
        stripe: true,
        spanMethod: this.objectSpanMethod
      },
      columns: columns,
      actionFunction: actions({ configHandle: this.configHandle, openChannelHandle: this.openChannelHandle }),
      list: null,
      loading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      businessId: null,
      tableLoading: false,
      totalCount: 0,
      params: {
        businessId: null,
        orderNo: null,
        startTime: '',
        endTime: '',
        bizCode: '', // 业务方
        sceneCode: '', // 业务场景
        providerCode: '', // 支付渠道
        payProductCode: '', // 支付产品
        payStatus: '', // 支付状态
        paySeqId: '', // 流水号
        pageIndex: 1,
        pageSize: 20
      },
      businessList: [
        { name: '全部', id: 1 },
        { name: '1v1', id: 2 },
        { name: '小班课', id: 3 },
        { name: '小熊美术', id: 4 },
      ],
      sceneList: [],
      providerList: [],
      productList: [],
      statusList: [],
      payList: [],
      configList: [],
      configList1: [
        {
          "id": 2,
          "payProduct": "微信公众号",
          "payProductCode": "WechatOpenId",
          "updateTime": "2020-05-06 02:00:00",
          "provider": "易宝",
          "providerStatus": "正常",
          "config": "{\"dayTradeCount\":\"200\"}",
          merge: true,
          count: 2
        },
        {
          "id": 3,
          "payProduct": "微信公众号",
          "payProductCode": "WechatOpenId",
          "updateTime": "2020-05-06 02:00:00",
          "provider": "财富通",
          "providerStatus": "正常",
          "config": "{\"dayTradeCount\":\"200\"}"
        },
        {
          "id": 4,
          "payProduct": "微信小程序",
          "payProductCode": "WechatMiniPrm",
          "updateTime": "2020-05-06 02:00:00",
          "provider": "易宝",
          "providerStatus": "正常",
          "config": "{\"dayTradeCount\":\"100\"}",
          merge: true,
          count: 2
        },
        {
          "id": 7,
          "payProduct": "微信小程序",
          "payProductCode": "WechatMiniPrm",
          "updateTime": "2020-05-06 02:00:00",
          "provider": "财富通",
          "providerStatus": "正常",
          "config": "{\"dayTradeCount\":\"10\"}"
        },
        {
          "id": 8,
          "payProduct": "微信小程序8",
          "payProductCode": "WechatMiniPrm8",
          "updateTime": "2020-05-06 02:00:00",
          "provider": "财富通",
          "providerStatus": "正常",
          "config": "{\"dayTradeCount\":\"10\"}",
          single: true,
        },
        {
          "id": 9,
          "payProduct": "微信小程序9",
          "payProductCode": "WechatMiniPrm9",
          "updateTime": "2020-05-06 02:00:00",
          "provider": "财富通",
          "providerStatus": "正常",
          "config": "{\"dayTradeCount\":\"10\"}",
          single: true,
        }
      ],
      configForm: {
        provider: null,
        count: null,
      },
      dialogVisible: false,
      dialogVisibleOfSure: false,
      providerText: null,
      otherProviderText: null,
      tradeCount: 0, // 日交易总笔数
      currentPayProductCode: '', // 当前支付产品编号
    }
  },
  async created() {
    this.getPayConfigList();
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // todo
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 6) {
        // console.log(row);
        if (row.merge) {
          return {
            rowspan: row.count,
            colspan: 1
          }
        } else if (!row.single) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
      }
    },
    getPayConfigList() {
      payConfigListApi().then((res) => {
        if (res.data && res.data.length) {
          this.groupObj = {};
          res.data.forEach((item) => {
            if (!this.groupObj[item.payProductCode]) {
              this.groupObj[item.payProductCode] = [{
                ...item,
                isStart: true
              }];
            } else {
              this.groupObj[item.payProductCode].push({ ...item, isStart: false });
            }
          });
          res.data.forEach((item) => {
            const flagArr = this.groupObj[item.payProductCode];
            if (flagArr.length > 1) {
              // 一个产品对应多条数据
              if (flagArr[0].isStart) {
                item.merge = true;
                item.count = this.groupObj[item.payProductCode].length;
                // 把flagArr第一个元素中的isStart置为false，表示已经找到合并开始的行
                flagArr[0].isStart = false
              }
            } else {
              item.single = true
            }
          });
          this.configList = res.data;
          console.log(res.data, '对数据打标识====');
        }
      })
    },
    configHandle(data, row) {
      const items = this.groupObj[row.payProductCode];
      this.currentPayProductCode = items[0].payProductCode;
      this.dialogVisible = true;
      this.providerList = [];
      items.forEach((item) => {
        this.providerList.push({
          id: item.id,
          name: item.provider
        })
      })
    },
    nextHandle() {
      this.dialogVisible = false;
      this.dialogVisibleOfSure = true;
      this.providerText = this.providerList.filter((item) => item.id === this.configForm.provider)[0].name;
      this.otherProviderText = this.providerList.filter((item) => item.id !== this.configForm.provider)[0].name;
    },
    async postConfigHandle() {
      // todo config: "{"dayTradeCount":"200"}" /payment/prdTradeCount/{payProductCode}
      await this.getPrdTradeCount(this.currentPayProductCode);
      const id = this.providerList.filter((item) => item.id !== this.configForm.provider)[0].id;
      const dayTradeCount = this.tradeCount - parseInt(this.configForm.count);
      const postData = {
        items: [
          {
            id: this.configForm.provider,
            config: JSON.stringify({ dayTradeCount: this.configForm.count })
          },
          {
            id, config: JSON.stringify({ dayTradeCount })
          }
        ]
      };
      putPayConfigApi(postData).then((res) => {
        this.dialogVisibleOfSure = false;
        this.getPayConfigList();
      })
    },
    getPrdTradeCount(payProductCode) {
      return prdTradeCountApi(payProductCode).then((res) => {
        this.tradeCount = res.data;
      })
    },
    openChannelHandle(row) {
      this.$alert('确认开启该通道？', '提示', {
        confirmButtonText: '确定',
      }).then((res) => {
        const postData = {
          items: [
            { id: row.id, status: 1 }
          ]
        }
        openChannelApi(postData).then((res) => {
          this.getPayConfigList();
        })
      }).catch((err) => {
        console.log('cancel')
      })
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
  }
</style>

