<template>
  <div class="login-container">
    <el-form v-loading="loading" class="login-form">
      <div class="title-container">
        <h3 class="title">基础服务中台</h3>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MessageBox } from 'element-ui'

export default {
  name: 'SsoLogin',
  components: {},
  data() {
    return {
      loading: false,
      redirect: '/'
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('111', 111);
      this.handleLogin()
    })
  },
  methods: {
    handleLogin() {
      const { auth_code } = this.$route.query
      if (auth_code) {
        this.loading = true
        this.$store.dispatch('user/ssoLogin', { auth_code })
          .then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((res) => {
            this.loading = false
            console.log('res', res);
            MessageBox.confirm(
              res,
              '登录失败',
              {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              location.reload()
            })
          })
      } else {
        const { VUE_APP_SSO_URL, NODE_ENV, VUE_APP_PRODUCT_URL } = process.env
        let loginUrl = `${VUE_APP_SSO_URL}/login?from=${window.location.href}`
        // 兼容下本地跳转登录
        if (NODE_ENV === 'development') {
          loginUrl += `&productUrl=${VUE_APP_PRODUCT_URL}`
        }
        window.location.href = loginUrl
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$bg:#283443;
$light_gray:#fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
