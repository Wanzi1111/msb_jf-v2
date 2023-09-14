<!--
 * @Author: ZhangYeLei
 * @Date: 2022-05-12 15:43:15
 * @LastEditTime: 2022-05-18 16:18:36
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="andriod-box">
    <div class="andriod-screen">
      <div class="msg-box">
        <div class="msg-wrap">
          <div class="msg-title">
            <div>
              <img class="msg-log" src="./img/logo.png" alt="logo">
              <span class="msg-tit">美术宝1对1</span>
              <span class="msg-time">56分钟前</span>
            </div>
            <img class="msg-arrow" src="./img/arrow-down.png" alt="logo">
          </div>
          <div class="msg-content">
            <div class="msg-content-tit">{{ config.templateTitle }}</div>
            <div class="msg-con">
              {{ config.messageContent }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <img class="andriod-bg" src="./img/andriod.png">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AndriodDesk',
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
.andriod-box {
  width: 420px;
  height: 794px;
  padding: 22px;
  position: relative;
  .andriod-bg {
    width: 420px;
    height: 794px;
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
  }
  .andriod-screen {
    width: 375px;
    height: 750px;
    border-radius: 34px;
    padding: 50px 9px 0;
    z-index: 1;
    position: absolute;
    background: url('./img/andriod-screen.jpeg') no-repeat center 0px ;
    background-size: cover;
    .msg-box {
      width: 100%;
      padding: 12px;
      background: rgba(247, 247, 247, 0.6);
      border-radius: 16px;
      backdrop-filter: blur(16px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .msg-wrap {
        flex: 1;
        .msg-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: #333333;
          margin-bottom: 10px;
          font-weight: 400;
          .msg-log {
            width: 16px;
            height: 16px;
            border-radius: 2px;
            margin-right: 4px;
            vertical-align: bottom;
          }
          .msg-arrow {
            width: 12px;
            height: 12px;
            border-radius: 2px;
          }
          span {
            margin: 0 4px;
          }
        }
        .msg-content {
          font-size: 14px;
          .msg-content-tit {
            width: 188px;
            height: 20px;
            font-weight: 600;
            margin-bottom: 4px;
            color: #333333;
            line-height: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .msg-con {
            width: 333px;
            font-weight: 400;
            color: #444444;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
