<template>
  <div class="view-page">
    <header-section style="z-index:300"></header-section>
    <left-slide style="z-index:200" @change="change"></left-slide>
    <main-content style="z-index:100;" :main-msg="msg">
      <router-view></router-view>
    </main-content>
  </div>
</template>
<script type="text/javascript">
  import { mainContent,leftSlide ,headerSection } from 'components';
  import { getPermissions } from '../service/getData';
  export default{
    name: 'page',
    data(){
      return {
        msg:false
      }
    },
    components: {
      mainContent,
      leftSlide,
      headerSection
    },
    created() {
      getPermissions().then((data) => {   //获取权限列表
        console.log(data.data.permissions)
        this.$store.state.permissions = data.data.permissions;    //将权限存在vuex中全局共享
      })
    },
    methods:{
        change(){
            this.msg=!this.msg;
        }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
</style>
