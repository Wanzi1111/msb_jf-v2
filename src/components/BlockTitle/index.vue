<template>
  <div class="title-wrap">
    <span>{{ title }}</span>
  </div>
</template>

<script>

export default {
  name: 'BlockTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .title-wrap {
    border-bottom: 1px solid #409EFF;
    margin-bottom: 13px;
  }
  .title-wrap span {
    display: inline-block;
    position: relative;
    padding-bottom: 13px;
    color: #409EFF;
  }
  span:after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    width: 100%;
    height: 2px;
    background-color: #409EFF;
  }
</style>
