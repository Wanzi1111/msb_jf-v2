import store from '@/store';

const { dinc = {}} = store.state.pushCenter

export default [
  {
    prop: "messageType",
    label: "消息类型",
    type: "select", // 选择器,
    rules: [{ required: true, message: "请输入消息类型！" }],
    defaultVal: dinc.listMessageType?.[0]?.value,
    attr: {
      placeholder: "请输入"
    },
    options: [...dinc.listMessageType]
  },
  {
    prop: "supplierId",
    label: "供应商",
    type: "select", // 选择器,
    rules: [{ required: true, message: "请选择供应商！" }],
    attr: {
      clearable: true
    },
    options: [...dinc.listSupplierNameType]
  },
  {
    prop: "applyId",
    label: "应用",
    type: "select",
    rules: [{ required: true, message: "请选择应用！" }],
    attr: {
      clearable: true
    },
    options: [...dinc.listApply]
  },
  {
    prop: "templateName",
    label: "模板名称",
    type: "input", // 选择器,
    rules: [
      { required: true, message: "请输入模板名称！" },
      {
        required: true,
        validator: (_, value, callBack) => {
          if (value.length > 30) {
            callBack(new Error("请控制在30个字符以内！"));
          }
          callBack();
        }
      }
    ],
    attr: {
      placeholder: "请输入"
    }
  },
  {
    slot: "click_open_divider"
  },
  {
    prop: 'deviceTypes',
    label: '目标平台',
    type: 'checkbox',
    defaultVal: ['android', 'ios'],
    options: [
      {
        label: 'android',
        value: 'android'
      },
      {
        label: 'ios',
        value: 'ios'
      }
    ]
  },
  {
    prop: "templateTitle",
    label: "标题",
    type: "input", // 选择器,
    rules: [
      { required: true, message: "请输入标题！" },
      {
        required: true,
        validator: (_, value, callBack) => {
          if (value.length > 20) {
            callBack(new Error("请控制在20个字符以内！"));
          }
          callBack();
        }
      }
    ],
    attr: {
      placeholder: "请输入"
    }
  },
  {
    prop: "messageContent",
    label: "内容",
    type: "textarea",
    rules: [
      { required: true, message: "请输入内容！" },
      {
        required: true,
        validator: (_, value, callBack) => {
          if (value.length > 110) {
            callBack(new Error("请控制在110个字符以内！"));
          }
          callBack();
        }
      }
    ],
    attr: {
      placeholder: "请输入110个字符以内的文本",
      maxlength: 110,
      showWordLimit: true
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: 'IOS最多支持110个字符，安卓设备超过50个字符请使用大段文本样式'
    }
  },
  {
    slot: "emoji"
  },
  {
    prop: 'notificationStypeType',
    label: '通知栏样式',
    type: 'radio',
    defaultVal: '0',
    options: [
      { label: '默认', value: '0' },
      { label: '大段文本样式', value: '1' },
      { label: '大图片样式', value: '2' }
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '大段文本及大图片样式，目前仅安卓设备支持'
    }
  },
  {
    prop: "notificationBigText",
    label: " ",
    type: "textarea",
    visible: false,
    rules: [
      { required: true, message: "请输入文本！" },
      {
        required: true,
        validator: (_, value, callBack) => {
          if (value.length > 180) {
            callBack(new Error("请控制在180个字符以内！"));
          }
          callBack();
        }
      }
    ],
    attr: {
      placeholder: "请输入180个字符以内的文本",
      maxlength: 180,
      showWordLimit: true
    },
  },
  {
    prop: 'notificationBigImage',
    label: ' ',
    type: 'upload-media',
    visible: false,
    rules: [{ required: true, message: "请上传图片！" }],
    mediaRules: {
      time: 60,
      size: 1,
      media: 'img',
      type: 'PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请上传1M以下的图片，支持PNG和JPG格式'
    }
  },
  // 适用id为3的消息类型
  {
    prop: 'appMessageType',
    label: '通知样式',
    type: 'radio',
    defaultVal: 'text',
    options: [
      { label: '文本样式', value: 'text' },
      { label: '大图片样式', value: 'textImage' },
      { label: '文本+图标样式', value: 'textIcon' }
    ],
  },
  {
    prop: 'textImage',
    label: ' ',
    type: 'upload-media',
    visible: false,
    rules: [{ required: true, message: "请上传图片！" }],
    mediaRules: {
      width: 690,
      height: 180,
      time: 60,
      size: 1,
      media: 'img',
      type: 'PNG,JPG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请上传1M以下的690*180图片，支持PNG和JPG格式'
    }
  },
  {
    prop: 'textIcon',
    label: ' ',
    type: 'upload-media',
    visible: false,
    rules: [{ required: true, message: "请上传图片！" }],
    mediaRules: {
      width: 120,
      height: 120,
      time: 60,
      size: 0.2,
      media: 'img',
      type: 'PNG,JPG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请上传200K以下的120*120图片，支持PNG和JPG格式'
    }
  },
  {
    prop: 'buttonImage',
    label: '点击按钮',
    type: 'radio',
    defaultVal: '0',
    options: [
      { label: '默认', value: '0' },
      { label: '上传本地图片', value: '1' },
    ]
  },
  {
    prop: 'buttonImageUrl',
    label: ' ',
    type: 'upload-media',
    visible: false,
    rules: [{ required: true, message: "请上传图片！" }],
    mediaRules: {
      width: 128,
      height: 56,
      time: 60,
      size: 0.2,
      media: 'img',
      type: 'PNG,JPG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请上传200K以下的128*56图片，支持PNG和JPG格式'
    }
  },
  {
    prop: 'notificationIconType',
    label: '通知图标',
    type: 'radio',
    defaultVal: '0',
    options: [
      { label: '默认', value: '0' },
      { label: '上传本地图片', value: '1' },
    ]
  },
  {
    prop: 'notificationIcon',
    label: ' ',
    type: 'upload-media',
    visible: false,
    rules: [{ required: true, message: "请上传图片！" }],
    mediaRules: {
      time: 60,
      size: 0.2,
      media: 'img',
      type: 'PNG,JPG,JPEG'
    },
    note: true,
    noteConfig: {
      type: 'text',
      text: '请上传200K以下的图片，支持PNG和JPG格式'
    }
  },
  {
    prop: 'openType',
    label: '点击消息打开',
    type: 'radio',
    defaultVal: '0',
    options: [
      {
        label: '打开应用',
        value: '0'
      },
      {
        label: '客户端自定义',
        value: '1'
      },
      {
        label: '打开URL',
        value: '2'
      },
    ]
  },
  {
    prop: 'openUrl',
    label: ' ',
    type: 'input',
    rules: [{ required: true, message: "请输入URL！" }],
    visible: false,
    attr: {
      placeholder: '请输入地址'
    }
  },
  {
    prop: 'remindType',
    label: '消息提醒类型',
    type: 'checkbox',
    defaultVal: [1, 2, 3],
    options: [...dinc?.listAndroidRemindType]
  },
  {
    prop: 'isSilent',
    label: '静默推送',
    type: 'radio',
    defaultVal: '0',
    options: [
      { label: '关闭', value: '0' },
      { label: '开启', value: '1' },
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '部分安卓设备因系统限制无法实现静默能力'
    }
  },
  // {
  //   prop: 'silentTime',
  //   label: ' ',
  //   rules: [{ required: true, message: "请输入时间范围！" }],
  //   defaultVal: [new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0)],
  //   type: 'timeRange',
  //   visible: false
  // },
  {
    prop: 'silentTime',
    label: ' ',
    rules: [{ required: true, message: "请输入时间范围！" }],
    defaultVal: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8, 0), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9, 0)],
    type: 'timeFrame',
    visible: false
  },
  {
    prop: 'offLineTime',
    label: '离线时长',
    type: 'select',
    defaultVal: '86400',
    options: [
      { label: '0分钟-不设置离线', value: '0' },
      { label: '1分钟', value: '60' },
      { label: '10分钟', value: '600' },
      { label: '1小时', value: '3600' },
      { label: '3小时', value: '10800' },
      { label: '12小时', value: '43200' },
      { label: '1天-默认', value: '86400' },
      { label: '5天', value: '345600' },
      { label: '10天-最长', value: '691200' },
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '可选择0-10天，该时间段内联网用户均可收到消息。最多保存最新的5条'
    }
  },
  {
    prop: 'threadId',
    label: '通知栏消息分组',
    type: 'radio',
    defaultVal: '0',
    options: [
      { label: '系统默认', value: '0' },
      { label: '自定义分组', value: '1' },
    ],
    note: true,
    noteConfig: {
      type: 'text',
      text: '仅IOS10以上版本生效，系统默认为系统自定义规则'
    }
  },
  {
    prop: 'threadIdList',
    label: ' ',
    type: 'select',
    // defaultVal: '1',
    visible: false,
    options: [...dinc.listPushThread],
  },
  {
    prop: 'badgeType',
    label: '消息角标',
    type: 'radio',
    defaultVal: '0',
    options: [
      { label: '默认', value: '0' },
      { label: '自定义数字', value: '1' },
      { label: '关闭', value: '2' },
    ]
  },
  {
    prop: 'badge',
    label: ' ',
    type: 'inputNumber',
    defaultVal: 1,
    visible: false,
    attr: {
      min: 1
    }
  },
];

export const formActions = ({ handleActions }) => {
  return {
    submit: {
      hide: false, // 是否显示 默认false
      label: "提交"
    },
    reset: {
      hide: true
    },
    back: {
      hide: true
    },
    preview: {
      type: 'button',
      click: () => handleActions('upPreview'),
      label: "更新预览"
    }
  };
};
