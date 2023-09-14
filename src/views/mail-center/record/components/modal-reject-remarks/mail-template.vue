<template>
  <div style="padding: 0 20px">
    <div style="border-top: solid 2px rgb(215, 215, 215);">
      <br> 收件人：{{ temp.recipient }} <br><br>
      发件时间: {{ temp.ctime }} <br><br>
      正文：<br><br>
    </div>
    <div v-html="temp.content" />
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'MailTemplate',
  props: {
    tempData: {
      type: Object,
      default: () => {},
    }
  },
  data: function() {
    return {
      temp: {}
    };
  },
  created() {
    const { tempData } = this
    this.temp = { ...tempData, ctime: moment(Number(tempData.ctime)).format('YYYY-MM-DD hh:mm:ss'), content: tempData.content || '亲爱的用户，您<br><br>您正在进行邮箱验证，请在验证码输入框中输入：<span style="color: rgb(252, 86, 31);font-size: 28px;">789123</span> ，以进行验证。<br><br><div><el-link type="primary" href="www.wangyiyun.com"> >>>点击此处验证</el-link></div><p style="color: rgb(170, 170, 170)">注意：为了您的账号安全，如非本人操作，请勿泄露。（工作人员不会向您索取此验证码）</p></div><p style="color: rgb(170, 170, 170)">此邮件为系统邮件，无需回复<br>请保管好您的游戏，避免账号被他人盗用<br><br>小熊国际</p>' }
  },
}
</script>
<style lang="scss">
/* 未访问的链接 */
a:link {
  color: #0084ff;
}

/* 已访问的链接 */
a:visited {
  color: #ff1e00;
}

/* 鼠标悬停链接 */
a:hover {
  color: #FF00FF;
}

/* 已选择的链接 */
a:active {
  color: #00FF00;
}
</style>
