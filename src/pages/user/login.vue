<template>
  <div class="login-body" >
    <img style="position:fixed;top:5%;left:3%;z-index:-1" src="./images/top_2.png">
    <img style="position:fixed;top:5%;right:3%;z-index:-1" src="./images/top_1.png">
    <img style="width:400px;position:fixed;top:30%;right:20%;z-index:-1" src="./images/middle.png">
    <img style="width:400px;position:fixed;top:10%;left:20%;z-index:-1" src="./images/bg_03.png">
    <div class="loginWarp"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submit_form">
      <div class="login-title">
        <img src="./images/login_logo.png">
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input v-model="form.username" placeholder="请输入账户名：" class="form-input" :autofocus="true"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input type="password" v-model="form.password" placeholder="请输入账户密码：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <img style="position:fixed;bottom:0;z-index:-1" src="./images/bottom_img.png">
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  import {port_user, port_code} from 'common/port_uri';
  import md5 from 'js-md5';
  import { login } from '../../service/getData';
  export default{
    data(){
      return {
        form: {
          username: null,
          password: null,

        },
        rules: {
          username: [{required: true, message: '请输入账户名！', trigger: 'blur'}],
          password: [{required: true, message: '请输入账户密码！', trigger: 'blur'}]
        },
        //请求时的loading效果
        load_data: false
      }
    },
    methods: {

      //提交
      submit_form() {
        this.$refs.form.validate((valid) => {
          if (!valid) return ;
          this.load_data = true
          //登录提
          login({
            username:this.form.username,
            password:md5(this.form.password).toUpperCase()
          }).then((data) => {
            this.load_data = false;
            if(data.error){
              this.form.password="";
              return ;
            }
            const name = data.data.account.loginName;
            const role = data.data.account.roleNo;
            const accessToken = data.data.accessToken;
           // 由后端返回姓名
            const user = {name: name,role:role}
            window.localStorage.setItem('userInfo',JSON.stringify(user));
            window.localStorage.setItem('accessToken',accessToken)
            this.$router.push('/home');
          })

        })
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .login-body {
    z-index:0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:white;
    overflow-y:auto;
    .loginWarp {
      z-index:3;
      width:450px;
      height:450px;
      margin: 220px auto;
      background-image:url('./images/ddk_logo.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      text-align:center!important;
      .login-form{
        width:350px;
        padding:0px 50px;
      }
      .login-title {
        padding-top:50px;
        margin-bottom: 40px;
        text-align: center;
        img{
          width:15%;
        }
      }
      .login-item {
        margin-bottom:10px;
        width:100%;
        .el-input__inner {
          margin:10px 0 0 0!important;
        }
      }
      .form-input {
        ::-webkit-input-placeholder { /* WebKit browsers */
          color: #9e9e9e;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #9e9e9e;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #9e9e9e;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #9e9e9e;
        }
        input {
          margin-bottom: 15px;
          font-family:'微软雅黑';
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 8px;
          color: #9e9e9e;
          &:focus{
            border:1px solid #e8546a;
            background:#ffe3e2;
          }
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border:none;
        border-radius:8px;
        background: -webkit-linear-gradient(left,#f63f5b,#fb8570);
        background:-o-linear-gradient(left,#f63f5b,#fb8570);
        background:-moz-linear-gradient(left,#f63f5b,#fb8570);
        background:linear-gradient(to right,#f63f5b,#fb8570);
        &:active, &:hover {
          background: -webkit-linear-gradient(left,#f63f5b,#fb8570);
          background:-o-linear-gradient(left,#f63f5b,#fb8570);
          background:-moz-linear-gradient(left,#f63f5b,#fb8570);
          background:linear-gradient(to right,#f63f5b,#fb8570);
        }
      }
    }
  }
</style>
