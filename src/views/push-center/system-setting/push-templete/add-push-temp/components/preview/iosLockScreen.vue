<!--
 * @Author: ZhangYeLei
 * @Date: 2022-05-12 15:43:15
 * @LastEditTime: 2022-05-19 17:58:48
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="ios-box">
    <div class="ios-screen">
      <div class="msg-box">
        <img class="msg-log" src="./img/logo.png" alt="logo">
        <div class="msg-wrap">
          <div class="msg-title">
            <span class="msg-tit">{{ config.templateTitle }}</span>
            <span class="msg-time">56分钟前</span>
          </div>
          <div class="msg-content">
            <span>
              {{ config.messageContent }}
            </span>
            <img v-if="config.notificationIcon" :src="config.notificationIcon" alt="img">
          </div>
        </div>
      </div>
    </div>
    <img class="ios-bg" src="./img/ios.png">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'IosLockScreen',
  components: {},
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.ios-box {
  width: 420px;
  height: 856px;
  padding: 22px;
  background-image: url('./img/ios.png');
  position: relative;
  .ios-bg {
    width: 420px;
    height: 856px;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
  }
  .ios-screen {
    width: 375px;
    height: 812px;
    border-radius: 34px;
    padding: 278px 9px 0;
    z-index: 1;
    position: absolute;
    background: url('./img/ios-screen.png') no-repeat center 0px ;
    background-size: cover;
    .msg-box {
      width: 100%;
      padding: 8px 14px 10px 8px;
      background: rgba(247, 247, 247, 0.6);
      border-radius: 16px;
      backdrop-filter: blur(16px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .msg-log {
        width: 35px;
        height: 35px;
        border-radius: 8px;
        margin-right: 8px;
      }
      .msg-wrap {
        flex: 1;
        .msg-title {
          display: flex;
          justify-content: space-between;
          .msg-tit {
            width: 188px;
            height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            font-weight: 600;
            color: #333333;
            line-height: 20px;
          }
          .msg-time {
            width: 51px;
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            color: #555555;
            line-height: 17px;
          }
        }
        .msg-content {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 400;
          margin-top: 4px;
          color: #333333;
          line-height: 16px;
          img {
            margin-left: 10px;
            width: 30px;
            height: 30px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
