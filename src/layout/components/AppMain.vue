<template>
  <section class="app-main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key" />
    <!-- <transition name="fade-transform" mode="out-in">
      <template>

      </template>
    </transition> -->
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppMain',
  data() {
    return {
      renderFlag: false
    }
  },
  computed: {
    ...mapState('global', ['baseData']),
    key() {
      // console.log(`this.$route.path`, this.$route.path, this.baseData, JSON.stringify(this.baseData))
      // if (this.baseData && JSON.stringify(this.baseData) === '{}') {
      //   console.log(`1`, 1)
      //   return null
      // }
      // console.log(`2`, this.baseData)
      return this.$route.path
    }
  },
  watch: {
    // baseData(newVal) {
    //   if (newVal && JSON.stringify(newVal) !== '{}') {
    //     this.renderFlag = true
    //   }
    // },
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f1f1f3;
  /*padding: 13px;*/
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
