// import moment from 'moment'
/**
 * @author: Liwei
 * @description:
 * @date: 2020/1/2
 */
export default [
  {
    prop: 'payProduct',
    label: '支付产品',
    align: 'left',
  },
  {
    prop: 'payProductCode',
    label: '支付编号',
    align: 'center'
  },
  {
    prop: 'provider',
    label: '支付服务商/通道',
    align: 'left',
    slot: 'provider',
  },
  {
    prop: 'providerStatus',
    label: '通道可用状态',
    align: 'left',
    slot: 'providerStatus'
  },
  {
    prop: 'action',
    label: '开启/关闭通道',
    align: 'left',
    slot: 'openAction'
  },
  {
    label: '当前路由配置',
    align: 'left',
    render: (h, dat, row, index) => {
      let label = '按路由规则';
      if (row.config !== '') {
        label = `${JSON.parse(row.config).dayTradeCount}笔/日`
      }
      return label;
    }
  },
  {
    action: true,
    name: 'action',
    width: 230,
    prop: 'action',
    label: '配置/更改路由规则',
    align: 'center'
  },
]
export const actions = ({ configHandle, openChannelHandle }) => {
  return {
    type: (dat, row, index) => {},
    action: (data, row, index) => {
      if (row.single) {
        return [
          {
            type: 'text',
            label: '暂不支持',
          }
        ]
      } else {
        return [
          {
            type: 'button',
            label: '更新',
            click: configHandle,
            attr: {
              size: 'mini',
              type: 'text'
            }
          }
        ]
      }
    },
    open: (data, row, index) => {
      if (row.providerStatus === '1') {
        return [
          {
            type: 'button',
            label: '关闭',
            disabled: true,
            click: openChannelHandle,
            attr: {
              size: 'mini',
              type: 'button',
            }
          }
        ]
      } else {
        return [
          {
            type: 'button',
            label: '开启',
            click: openChannelHandle,
            attr: {
              size: 'mini',
              type: 'button',
            }
          }
        ]
      }
    }
  }
}
