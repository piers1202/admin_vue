<template>
  <div class="error-page">
    <img class="imgleft" src="./images/404_03.png"/>
    <img class="imgright" src="./images/404_05.png"/>
    <div class="errorWarp">
      <div class="image">
        <img :src="image"/>
      </div>
      <h2 class="title" v-text="title"></h2>
      <router-link :to="path" class="backBtn" tag="span">返回首页</router-link>
    </div>
    <img class="imgbottom" src="./images/404_15.png" />
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'noPage',
    data() {
      return {
        image: require('./images/404_10.png'),
        title: '您要找的网页不存在',
        path: '/home'
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .error-page {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    .imgleft{
      position:fixed;
      left:5%;top:5%;
    }
    .imgright{
      position:fixed;
      right:5%;
      top:5%;
    }
    .imgbottom{
      position:fixed;
      bottom:0;
      left:0;
      right:0;
    }
    .errorWarp {
      width: 1000px;
      margin: 10% auto auto auto;
      .image {
        margin: 20px auto;
      }
      .title {
        color: #f63f5b;
        font-size: 40px;
        padding: 15px 30px;
        margin-bottom: 20px;
        margin-top: 50px;
        font-weight: bold;
      }
      .backBtn {
        display: inline-block;
        background:#f63f5b;
        color: #fff;
        font-size:30px;
        margin-bottom: 20px;
        margin-top: 20px;
        padding: 15px 120px;
        border: 1px solid #f63f5b;
        border-radius: 40px;
        cursor: pointer;
      }
    }
  }
</style>
