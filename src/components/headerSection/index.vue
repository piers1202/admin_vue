<template>
  <div class="header-section">
    <!--<div class="search">-->
      <!--<search @search="submit_search"></search>-->
    <!--</div>-->
    <div class="header-article">
      <!--<router-link to="/" class="logo block">
        <img style="display:inline-block;float:left;margin-left:5px;" src="./images/ddk_logo.png" alt="贷贷看后台管理系统">
      </router-link>-->
      <span style="margin-left:5px;line-height:50px;">贷贷看后台管理系统</span>
      <div class="header-content">
        <div v-if="name" style="margin-right:20px;">欢迎您：{{name}}</div>
        <div v-else @click="toLogin">您还未登录,请登录</div>

        <img style="position:fixed;left:300px;height:50px;z-index:1" src="./images/index_02.png">
        <div @click="toLogout" v-if="name" style="margin-left:10px;font-size:16px;">退出登录</div>
        <div @click="toChangePassword" v-if="name" style="margin-left:10px;font-size:16px;">修改密码</div>
      </div>

    </div>
    <menu-right></menu-right>
  </div>
</template>
<script type="text/javascript">
  import menuRight from './menuRight'
  import search from 'components/search'
  import { logout } from '../../service/getData';
  export default{
    data() {
      return {
        name:'',
        avatar:'',
      }
    },
    components: {
      menuRight,
      search
    },
    created() {
      const user = JSON.parse(window.localStorage.getItem('userInfo'))
      this.name= user.name || '';

    },
    methods: {
      submit_search(value) {
        this.$message.success(value)
      },
      toLogin() {
        this.$router.push('/login');
      },
      toLogout() {
        this.$router.push('/login');
        window.localStorage.removeItem('userInfo');
        window.localStorage.removeItem('accessToken');
      },
      toChangePassword() {
        this.$router.push('/user/changePassword')
      }
    }
  }
</script>
<style lang="scss" scoped>
.header-article{
  display: flex;
  justify-content: space-between;

  color:white;
  font-size:20px;
  width:96%;
  height:50px;
  position:fixed;
  top:0;
  padding:0 2%;
  .header-content{
    display: flex;
    align-items: center;
    img{
      width:30px;
    }
  }
  .header-content:hover{
    cursor: pointer;
  }
}

</style>
