import store from '@/store';

const { dinc = {}} = store.state.pushCenter

export default [
  {
    prop: 'scenarioName',
    label: '场景名称',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入场景名称！' }
    ],
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'businessType',
    label: '业务线',
    type: 'select', // 选择器,
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true
    },
    options: [...dinc.listBusinessType]
  },
  {
    prop: 'oneTypeId',
    label: '科目',
    type: 'select',
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true
    },
    options: []
  },
  {
    prop: 'twoTypeId',
    label: '分类',
    type: 'select', // 选择器,
    rules: [
      // 校验
      { required: true, message: '请选择分类！' }
    ],
    attr: {
      clearable: true
    },
    options: []
  },
  {
    prop: 'departmentId',
    label: '归属部门',
    type: 'select',
    rules: [
      // 校验
      { required: true, message: '请选择业务线！' }
    ],
    attr: {
      clearable: true
    },
    options: [...dinc.listDepartment]
  },
  {
    prop: 'leader',
    label: '负责人',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入负责人！' }
    ],
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'templateId',
    label: '中台模板ID',
    type: 'input', // 选择器,
    rules: [
      { required: true, message: '请输入中台模板ID！' }
    ],
    attr: {
      placeholder: '请输入'
    }
  },
  {
    prop: 'remark',
    label: '模板内容',
    type: 'textarea',
    defaultVal: '',
    attr: {
      disabled: true,
      placeholder: '请输入'
    }
  }
]

export const formActions = () => {
  return {
    submit: {
      hide: false, // 是否显示 默认false
      label: '提交'
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    },
    cancel: {
      hide: true
    }
  }
}
