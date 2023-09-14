export default (jumNum) => {
  return [
    {
      prop: 'jumped',
      type: 'alert', // 按钮
      label: `已跳转(${jumNum})`,
      attr: {
        type: 'info',
        closable: false
      },
    }
  ]
}
