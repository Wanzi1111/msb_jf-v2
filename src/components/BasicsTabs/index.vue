<!--
 * @Author: ZhangYeLei
 * @Date: 2022-03-03 11:57:26
 * @LastEditTime: 2022-05-20 16:36:51
 * @LastEditors: ZhangYeLei
-->
<template>
  <el-tabs v-model="activeIndex" @tab-click="onTabClick">
    <template v-if="showBadge">
      <el-tab-pane v-for="v in tabList" :key="v.value" :disabled="v.disabled" :label="v.label" :name="v.value + ''">
        <template slot="label">
          <el-badge :value="v.badge">
            {{ v.label }}
          </el-badge>
        </template>
      </el-tab-pane>
    </template>

    <template v-else>
      <el-tab-pane v-for="v in tabList" :key="v.value" :disabled="v.disabled" :label="v.label" :name="v.value + ''" />
    </template>
  </el-tabs>
</template>

<script>

// 后续有需要再拓展
export default {
  name: 'BasicsTabs',
  props: {
    activeTab: {
      type: [Number, String],
      default: ''
    },
    handleTabClick: {
      type: Function,
      default: () => {}
    },
    tabList: {
      type: Array,
      default: () => ([])
    },
    showBadge: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeIndex: {
      get() {
        return this.activeTab
      },
      set() {}
    }
  },
  methods: {
    onTabClick(val) {
      this.$emit('handleTabClick', val.name, val)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-badge__content {
  line-height: 25px;
  background: transparent;
  color: #999;
  right: 5px;
}
</style>
