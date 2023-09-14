<template>
  <div>
    <div class="top-title">
      <span>{{ title }}</span>

    </div>
    <el-divider />
  </div>
</template>

<script>
export default {
  name: 'TopTitle'
}
</script>

<style lang="scss" scoped>
.top-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 18px;
    line-height: 36px;
  }
}
</style>
