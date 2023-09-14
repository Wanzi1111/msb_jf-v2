const { businessClassificationLIst } = window.baseData

let newTaps = []

if (businessClassificationLIst) {
  newTaps = businessClassificationLIst.map((v) => {
    return {
      ...v,
      label: v.label,
      children: v.childName ? window.baseData[v.childName]?.map(vv => {
        return {
          ...vv,
          value: `${vv.value}_${vv.wuraoList}`,
          label: vv.label,
        }
      }) : undefined
    }
  })
}

const TabList = newTaps

export {
  TabList
}
