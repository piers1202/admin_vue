<template>
  <div class="changePassword" >
    <panel-title :title="$route.meta.title"></panel-title>

    <el-form :inline="true" >
      <el-form-item label="旧密码">
        <el-input v-model="form.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="onSubmit">确定</el-button>

  </div>
</template>
<script type="text/javascript">
  import md5 from 'js-md5';
  import { changePassword } from '../../service/getData';
  import { panelTitle } from 'components';
  export default{
    data(){
      return {
        form: {
          oldPassword: null,
          newPassword: null,
        }
      }
    },
    components: {
      panelTitle
    },
    methods: {
      onSubmit() {
        const loginName = JSON.parse(window.localStorage.getItem('userInfo')).name;
        changePassword({
          loginName:loginName,
          oldPassword:md5(this.form.oldPassword).toUpperCase(),
          newPassword:md5(this.form.newPassword).toUpperCase()
        }).then(data => {
          if(data.error) return ;
          this.$message({
            message:'修改成功',
            center:true
          })
          this.$router.push('/home')
        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">

</style>
