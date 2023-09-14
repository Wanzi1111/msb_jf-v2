<!--
 * @Author: ZhangYeLei
 * @Date: 2022-05-12 17:20:03
 * @LastEditTime: 2022-05-18 16:31:04
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="carousel-box">
    <div class="carousel-head">{{ ['安卓-锁屏', '安卓-桌面', 'ios-锁屏', 'ios-桌面'][initialIndex] }}</div>
    <el-carousel class="carousel" :initial-index="initialIndex" :interval="5000" arrow="always" :autoplay="false" @change="onChange">
      <el-carousel-item>
        <andriod-lock-screen :config="config" />
      </el-carousel-item>
      <el-carousel-item>
        <andriod-desk :config="config" />
      </el-carousel-item>
      <el-carousel-item>
        <ios-lock-screen :config="config" />
      </el-carousel-item>
      <el-carousel-item>
        <ios-desk :config="config" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IosLockScreen from './iosLockScreen';
import IosDesk from './iosDesk.vue';
import AndriodLockScreen from './andriodLockScreen.vue';
import AndriodDesk from './andriodDesk.vue';

export default {
  name: 'Preview',
  components: { IosLockScreen, IosDesk, AndriodLockScreen, AndriodDesk },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      initialIndex: 0
    }
  },
  computed: {
    ...mapGetters(['loadings'])
  },
  watch: {},
  mounted() {
    console.log('1 this.config', this.config);
  },
  methods: {
    onChange(ind) {
      this.initialIndex = ind
    }
  }
}
</script>

<style lang='scss' scoped>
.carousel-box {
  width: 420px;
  height: 856px;
  transform: scale(0.8);
  .carousel-head {
    text-align: center;
    margin-bottom: 4px;
  }
  /deep/ .el-carousel{
    height: 100%;
  }
  /deep/ .el-carousel__container {
    height: 100%;
  }
}
</style>
