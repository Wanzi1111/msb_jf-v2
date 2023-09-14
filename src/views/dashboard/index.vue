<!--
 * @Author: ZhangYeLei
 * @Date: 2022-02-15 16:22:15
 * @LastEditTime: 2022-05-16 16:35:22
 * @LastEditors: ZhangYeLei
-->
<template>
  <div class="app-container home-container">
    <p :class="`title ${show ? 'title_illustration' : ''}`">欢迎使用基础服务中台</p>
    <!--<img class="illustration" src="@/assets/images/c1.png">-->
    <!--<img class="illustration" src="@/assets/images/c2.png">-->
    <!-- <img class="illustration" src="@/assets/images/c3.png"> -->
    <img v-if="show" class="illustration" src="@/assets/images/c6.png">
    <!-- <img class="illustration" src="@/assets/images/c5.png"> -->
    <!--    <img v-else class="illustration" src="@/assets/images/c6.png">-->
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      show: true
      // show: parseInt(Math.random()*10) >= 5
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-container {
    padding: 20px;
    margin: 20px;
    height: calc(100% - 40px);
    width: calc(100% - 40px);
    position: absolute;
    display: flex;
    flex-direction: column;
    /*!* justify-content: center;*/
  }
  .title {
    /*text-align: center;*/
    /*font-size: 28px;*/
    /*color: #666666;*/
    /*font-family: serif, Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;*/

    text-align: center;
    font-size: 20px;
    color: #333;
    font-family: cursive;
    font-weight: bold;
  }
  .title_illustration {
    color: #6072fb;
  }
  .illustration {
    width: 460px;
    margin: 0 auto;
  }
</style>
