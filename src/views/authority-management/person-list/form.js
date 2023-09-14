import { checkPassword } from '@/api/authority-management/person'
import { TabList } from '../config'
export default function(form) {
  const passwordLength = (rule, value, callback) => {
    if (value.length < 6) {
      return callback(new Error('密码长度至少6位！'))
    } else {
      return callback()
    }
  }
  const repassword = (rule, value, callback) => {
    if (form.$refs.dialogRef.form.rePassword !== '' && form.$refs.dialogRef.form.password !== '' && (form.$refs.dialogRef.form.rePassword !== form.$refs.dialogRef.form.password)) {
      callback(new Error('两次输入密码不一致！'));
    } else {
      callback();
    }
  }

  // const checkpassword = (rule, value, callback) => {
  //   checkPassword({ oldPassword: value, id: form.actionObj.id }).then(res => {
  //     if (res?.status !== 0) {
  //       callback(new Error('输入错误，请重新输入！'));
  //     } else {
  //       callback();
  //     }
  //   })
  // }
  return [
    // {
    //   prop: 'oldPassword',
    //   label: '输入旧密码',
    //   type: 'input',
    //   defaultVal: '',
    //   placeholder: '请输入',
    //   rules: [ // 校验
    //     { required: true, message: '请输入旧密码！' },
    //     { required: true, message: '密码长度至少6位！', validator: passwordLength, trigger: 'blur' },
    //     { required: true, message: '输入错误，请重新输入！', validator: checkpassword, trigger: 'blur' }
    //   ]
    // },
    {
      prop: 'password',
      label: '输入新密码',
      type: 'input',
      defaultVal: '',
      placeholder: '请输入',
      rules: [ // 校验
        { required: true, message: '请输入新密码！' },
        { required: true, message: '密码长度至少6位！', validator: passwordLength, trigger: 'blur' },
        { required: true, message: '两次输入密码不一致！', validator: repassword, trigger: 'blur' }
      ]
    },
    {
      prop: 'rePassword',
      label: '新密码确认',
      type: 'input',
      defaultVal: '',
      placeholder: '请输入',
      rules: [ // 校验
        { required: true, message: '请确认新密码！' },
        { required: true, message: '密码长度至少6位！', validator: passwordLength, trigger: 'blur' },
        { required: true, message: '两次输入密码不一致！', validator: repassword, trigger: 'blur' }
      ]
    }
  ]
}

export const userForm = [
  {
    prop: 'platform',
    label: '系统',
    type: 'select',
    defaultVal: '',
    placeholder: '请选择',
    showAllLevels: false,
    rules: [ // 校验
      { required: true, message: '请选系统权限' }
    ],
    attr: {
      filterable: true,
      clearable: true
    },
    options: [...TabList]
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    defaultVal: '',
    placeholder: '请输入',
    rules: [ // 校验
      { required: true, message: '请输入手机号' }
    ]
  },
  {
    prop: 'name',
    label: '姓名',
    type: 'input',
    defaultVal: '',
    placeholder: '请输入',
    rules: [ // 校验
      { required: true, message: '用户不存在' }
    ],
    attr: {
      disabled: true
    }
  },
  {
    prop: 'id',
    label: '用户ID',
    type: 'input',
    defaultVal: '',
    placeholder: '请输入',
    rules: [ // 校验
      { required: true, message: '用户不存在' }
    ],
    attr: {
      disabled: true
    }
  },
  {
    prop: 'password',
    label: '初始密码',
    type: 'input',
    defaultVal: '666666',
    attr: {
      disabled: true
    }
  },
]

export const formActions = (cancel) => {
  return {
    submit: {
      hide: false // 是否显示 默认false
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    },
    cancel: {
      click: () => cancel(),
      type: 'button',
      label: '取消'
    }
  }
}
