<template>
  <div class="pre-wrap">
    <div class="pre-box">
      <div class="msg-wrap">
        <div v-if="!config.textImage" class="msg-box msg-box-icon">
          <img v-if="config.textIcon" class="textIcon" :src="config.textIcon" alt="textIcon">
          <div :class="titleBox">
            <div class="templateTitle">{{ config.templateTitle }}</div>
            <div class="messageContent">{{ config.messageContent }}</div>
          </div>
          <img v-if="config.buttonImageUrl" class="buttonImageUrl" :style="{ marginTop: config.textIcon ? 0 : '15px' }" :src="config.buttonImageUrl" alt="textIcon">
        </div>
        <div v-else class="msg-box msg-box-image">
          <div class="templateTitle">{{ config.templateTitle }}</div>
          <div class="messageContent">{{ config.messageContent }}</div>
          <div class="textImageBox">
            <img class="textImage" :class="textImage" :src="config.textImage" alt="textImage">
            <img v-if="config.buttonImageUrl" class="buttonImageUrl" :src="config.buttonImageUrl" alt="textIcon">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { config } from 'yargs';

export default {
  name: 'CustomPreview',
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
    ...mapGetters(['loadings']),
    titleBox() {
      const { config: { textIcon, buttonImageUrl }} = this
      if (textIcon && buttonImageUrl) {
        return 'title-box-s'
      } else if (buttonImageUrl) {
        return 'title-box-m'
      } else if (textIcon) {
        return 'title-box-l'
      }
      return 'title-box-xl'
    },
    textImage() {
      const { config: { buttonImageUrl }} = this
      return buttonImageUrl ? 'textImage-s' : 'textImage-l'
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.pre-wrap {
  width: 420px;
  height: 856px;
  padding: 22px;
  transform: scale(0.8);
  background-image: url('../preview/img/ios.png');
  background-color: #ccc;
  border-radius: 50px;
  position: relative;
  .pre-box {
    width: 100%;
    height: 100%;
    padding: 44px 12px 0 12px;
  }
  .msg-wrap {
    width: 350px;
    padding: 12px;
    border-radius: 15px;
    height: auto;
    min-height: 60px;
    background-color: #fff;
    .msg-box {
      width: 100%;
      height: 100%;
    }
    .msg-box-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .textIcon {
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
      .title-box-s {
        width: 180px;
      }
      .title-box-m {
        width: 240px;
      }
      .title-box-l {
        width: 255px;
      }
      .title-box-xl {
        width: 100%;
      }
    }
    .msg-box-image {
      .textImageBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .textImage {
        margin-top: 5px;
      }
      .textImage-s {
        width: 240px;
        height: 60px;
      }
      .textImage-l {
        width: 100%;
        height: 85px;
      }
    }
  }
  .templateTitle {
    font-size: 16px;
    color: #333;
  }
  .messageContent {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .buttonImageUrl {
    width: 64px;
    height: 28px;
  }
}
</style>
