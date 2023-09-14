import moment from 'moment'

export default [
  {
    prop: 'mailType',
    label: '邮件类型',
    minWidth: 80,
    align: 'center'
  },
  {
    prop: 'recipient',
    label: '发送对象',
    minWidth: 140,
    align: 'center'
  },
  {
    prop: 'title',
    slot: 'contentSlot',
    label: '邮件内容',
    minWidth: 220,
    align: 'center'
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 60,
    align: 'center',
    render: (h, dat, row, index, list) => {
      const { clickJumpUrlNumber, errorMsg } = row
      const condition = {
        '发送成功': `是否点击跳转：${clickJumpUrlNumber || '无点击'}`,
        '发送失败': `是否点击跳转：${errorMsg || '已失败'}`,
        '处理中': '处理中'
      }
      return h('el-tooltip', {
        props: {
          content: condition[dat],
        }
      },
      [h('el-tag', dat)]
      )
    }
  },
  {
    prop: 'ctime',
    label: '发送时间',
    minWidth: 160,
    align: 'center',
    render: (h, dat, row) => {
      return h('el-link', { props: { icon: 'el-icon-date' }}, moment(Number(dat)).format('YYYY-MM-DD hh:mm:ss') || Number(dat))
    }
  }
]
