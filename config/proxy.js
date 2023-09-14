/*
 * @Author: yelei
 * @Date: 2021-01-18 11:22:46
 * @LastEditors: zhangyelei zhangyelei@meishubao.com
 * @LastEditTime: 2022-06-07 15:23:52
 * @Description: 起本地服务时默认为org对象，其它环境的代理对象会根据 package.json中的--mode后台的变量，打包构建时自行识别~
 */

module.exports = {
  dev: {
    '/work': {
      target: 'https://dmpapi.meishubao.com',
      changeOrigin: true
    },
    '/payment': {
      target: 'https://payment-dev-mp.meishubao.com',
      changeOrigin: true
    },
    '/call-service': {
      target: 'https://platformgateorg.meishubao.com',
      changeOrigin: true
    },
    '/sys': {
      target: 'http://47.96.137.86:8087',
      changeOrigin: true
    },
    '/ums': {
      target: 'http://ums-auth-test-api.meixiu.mobi',
      changeOrigin: true,
      pathRewrite: {
        '^/ums': '/'
      }
    },
    '/k8s': {
      target: 'http://1v1k8s.meishubao.com/vip-app-dev',
      changeOrigin: true,
      pathRewrite: {
        '^/k8s': '/'
      }
    },
    '/sso': {
      target: 'https://resso-dev.meishubao.com',
      changeOrigin: true,
      pathRewrite: {
        '^/sso': ''
      }
    }
  },
  test: {
    '/work': {
      target: 'https://tmpapi.meishubao.com',
      changeOrigin: true
    },
    '/payment': {
      target: 'https://payment-test-mp.meishubao.com',
      changeOrigin: true
    },
    '/call-service': {
      target: 'https://platformgatedev.meishubao.com',
      changeOrigin: true
    },
    '/sys': {
      target: 'http://47.96.137.86:8087',
      changeOrigin: true
    },
    '/ums': {
      target: 'http://ums-auth-test-api.meixiu.mobi',
      changeOrigin: true,
      pathRewrite: {
        '^/ums': '/'
      }
    },
    '/k8s': {
      target: 'http://1v1k8s.meishubao.com/vip-app-dev',
      changeOrigin: true,
      pathRewrite: {
        '^/k8s': '/'
      }
    },
    '/logistics': {
      target: 'https://logisticstest-mp.meishubao.com',
      changeOrigin: true,
      pathRewrite: {
        '^/logistics': ''
      }
    },
    '/sso': {
      target: 'https://resso-test.meishubao.com',
      changeOrigin: true,
      pathRewrite: {
        '^/sso': ''
      }
    }
  },
  staging: {
    '/work': {
      target: 'https://pmpapi.meishubao.com',
      changeOrigin: true
    },
    '/payment': {
      target: 'https://payment-gray-mp.meishubao.com',
      changeOrigin: true
    },
    '/call-service': {
      target: 'https://platformgategray.meishubao.com',
      changeOrigin: true
    },
    '/sys': {
      target: 'http://middle-account-api.meishubao.com',
      changeOrigin: true
    },
    '/ums': {
      target: 'http://ums-auth-prod-api.meixiu.mobi',
      changeOrigin: true,
      pathRewrite: {
        '^/ums': '/'
      }
    },
    '/k8s': {
      target: 'http://1v1k8s.meishubao.com/vip-app-test',
      changeOrigin: true,
      pathRewrite: {
        '^/k8s': '/'
      }
    },
    '/sso': {
      target: 'https://resso-prod.meishubao.com',
      changeOrigin: true,
      pathRewrite: {
        '^/sso': ''
      }
    }
  },
  product: {
    '/work': {
      target: 'https://mpapi.meishubao.com',
      changeOrigin: true
    },
    '/payment': {
      target: 'https://payment-mp.meishubao.com',
      changeOrigin: true
    },
    '/call-service': {
      target: 'https://platformgate.meishubao.com',
      changeOrigin: true
    },
    '/sys': {
      target: 'http://middle-account-api.meishubao.com',
      changeOrigin: true
    },
    '/ums': {
      target: 'http://ums-auth-live-api.meixiu.mobi',
      changeOrigin: true,
      pathRewrite: {
        '^/ums': '/'
      }
    },
    '/k8s': {
      target: 'http://msi.yiqimeishu.com/vip-app-live',
      changeOrigin: true,
      pathRewrite: {
        '^/k8s': '/'
      }
    },
    '/sso': {
      target: 'https://resso.meishubao.com',
      changeOrigin: true,
      pathRewrite: {
        '^/sso': ''
      }
    }
  }
}
