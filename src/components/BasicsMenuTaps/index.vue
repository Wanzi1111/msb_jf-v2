/**
* @author: Liweiyu
* @description: 多层级taps
* @date: 2021/7/20
*/
<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <template v-for="item in actions">
      <el-menu-item v-if="!item.children" :key="item.value" v-bind="item.attr" :index="item.value">{{ item.label }}</el-menu-item>
      <el-submenu v-if="item.children" :key="item.value" v-bind="item.attr" :index="item.value">
        <template slot="title">{{ item.label }}</template>
        <el-menu-item v-for="v in item.children" :key="v.value" v-bind="v.attr" :index="v.value">{{ v.label }}</el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>

export default {
  name: 'BasicsMenuTaps',
  props: {
    mode: {
      default: 'horizontal',
      type: String
    },
    handleSelect: {
      default: () => {},
      type: Function
    },
    activeIndex: {
      default: '1',
      type: String
    },
    actions: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
  @mixin boxStyle() {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    padding: 0;
    margin-right: 40px;
  }
  /deep/ .el-tabs__item {
    font-size: 16px;
  }
  .el-menu-demo {
    border-bottom: none;
    margin-bottom: 15px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 2px;
      width: 100%;
      background: #E4E7ED;
      bottom: 0;
      left: 0;
    }
    /deep/ .el-menu-item, .el-submenu, .el-submenu__title {
      @include boxStyle();
    }
    /deep/ .el-submenu__title {
      &:hover {
        background: transparent;
      }
    }
    /deep/ .el-menu-item {
      &:hover {
        color: #409eff;
        background: transparent;
      }
    }
    /deep/ .el-submenu__title {
      @include boxStyle();
      margin-right: 0;
    }
    /deep/ .is-disabled {
      &:hover {
        color: #303133;
      }
    }
    /deep/ .is-active {
      color: #409eff !important;
      .el-submenu__title {
        color: #409eff !important;
      }
    }
    /deep/ .is-opened {
      color: #409eff;
      .el-submenu__title {
        color: #409eff;
      }
    }
  }

</style>
