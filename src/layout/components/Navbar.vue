<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span style="cursor: pointer">{{ name }}</span>
          <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
          <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            <span style="display:block;" @click="modifyPwd">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tag v-if="AMBIENT_ENV && ENVTextMap[AMBIENT_ENV]" type="success">{{ ENVTextMap[AMBIENT_ENV] }}</el-tag>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { removeCookies } from '@/utils/cookies'
import { modPwd } from '@/api/login/user'
const AMBIENT_ENV = process.env.VUE_APP_AMBIENT_ENV
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      ENVTextMap: {
        development: '开发',
        test: '测试',
        stage: '预发',
      },
      AMBIENT_ENV
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name',
      'userId'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    modifyPwd() {
      this.$prompt('请输入新密码', '修改密码', {
        inputPattern: /^[\w]{6,20}$/,
        inputPlaceholder: '请输入6-20位密码，支持数字与字母与下划线',
        inputErrorMessage: '密码格式不正确'
      })
        .then(({ value }) => {
          this.$prompt('请确认新密码', '修改密码', {
            inputPattern: /^[\w]{6,20}$/,
            inputPlaceholder: '请输入6-20位密码，支持数字与字母与下划线',
            inputErrorMessage: '密码格式不正确'
          })
            .then(({ value: value2 }) => {
              if (!this.userId) {
                this.$message.error('员工id为空，请重新登录后重试！')
                return false
              }
              if (value !== value2) {
                this.$message.error('两次密码输入不一致！')
                return false
              }
              modPwd({ id: this.userId, password: value })
                .then(() => {
                  this.$message.success('修改密码成功～')
                })
            })
        })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      removeCookies('msb-admin-middle-end')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    margin-right: 18px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
