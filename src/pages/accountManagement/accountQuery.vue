<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
    <el-tabs class="account" v-model="ruleForm.activeName" @tab-click="handleClick">
      <el-tab-pane label="注销账号" name="first">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录账号" prop="loginAccount">
            <el-input class="width_input" v-model="ruleForm.loginAccount"></el-input>
          </el-form-item>
          <el-form-item label="管理员口令" prop="adminPass">
            <el-input class="width_input" type="password" v-model="ruleForm.adminPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认口令" prop="checkPass">
            <el-input class="width_input" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="check" @click="submitForm('ruleForm','submit1')">提交</el-button>
            <el-button icon="edit" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="强制接触营销号绑定关系" name="second">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="登录账号" prop="loginAccount2">
            <el-input class="width_input" v-model="ruleForm.loginAccount2"></el-input>
          </el-form-item>
          <el-form-item label="管理员口令" prop="adminPass2">
            <el-input class="width_input" type="password" v-model="ruleForm.adminPass2" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认口令" prop="checkPass2">
            <el-input class="width_input" type="password" v-model="ruleForm.checkPass2" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="check" @click="submitForm('ruleForm2','submit2')">提交</el-button>
            <el-button icon="edit" @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <div class="divide"></div>
    </el-tabs>
  </div>
</template>
<script>
  import '../../assets/scss/main.scss'
  import {panelTitle,bottomToolBar} from 'components'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePasscheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.adminPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass2 !== '') {
            this.$refs.ruleForm2.validateField('checkPass2');
          }
          callback();
        }
      };
      var validatePasscheck2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.adminPass2) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          activeName: 'first',
          loginAccount: '',
          adminPass: '',
          checkPass: '',
          loginAccount2: '',
          adminPass2: '',
          checkPass2: ''
        },
        rules: {
          adminPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePasscheck, trigger: 'blur'}
          ],
          adminPass2: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          checkPass2: [
            {validator: validatePasscheck2, trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    methods: {
      on_refresh(){
        //this.get_table_data();
        //this.load_data=true;
      },
      submitForm(val,content){
        console.log(content+this.ruleForm.loginAccount);
        console.log(this.ruleForm.adminPass+','+this.ruleForm.checkPass)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(tab){
        console.log(tab)
      }
    }
  }
</script>
<style lang="scss">
.pannel{
  .el-form-item{
    margin:15px 0;
  }
  .width_input{
    width:210px;
  }
  .el-button{
    padding:10px 20px;
    margin-right:5px;
    margin-top:10px;
  }
  .block{
    text-align:center;
  }
  .el-pagination{
    padding:20px 10px;
  }
  .el-input__inner {
    margin:10px 0 0 0!important;
  }
}

</style>
