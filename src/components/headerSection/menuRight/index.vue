<template>
  <div class="menu-right" v-if="get_user_info.login" >
    <div class="notification-menu">
      <el-dropdown trigger="click" class="notification-list">
        <div class="notification-btn">
          <img :src="get_user_info.user.avatar" :alt="get_user_info.user.name">
          <span v-text="get_user_info.user.name"></span>
          <span class="icon"></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="dialogVisible=true">
              <i class="icon fa fa-lock"></i>
              <span>修改密码</span>
            </a>
          </el-dropdown-item>
          <!--<el-dropdown-item class="dropdown-list">-->
            <!--<a href="javascript:" class="dropdown-btn" @click="user_click(0)">-->
              <!--<i class="icon fa fa-user"></i>-->
              <!--<span>个人信息</span>-->
            <!--</a>-->
          <!--</el-dropdown-item>-->
          <!--<el-dropdown-item class="dropdown-list">-->
            <!--<a href="javascript:" class="dropdown-btn" @click="user_click(0)">-->
              <!--<i class="icon fa fa-cog"></i>-->
              <!--<span>设置</span>-->
            <!--</a>-->
          <!--</el-dropdown-item>-->
          <!--<el-dropdown-item class="dropdown-list">-->
            <!--<a href="javascript:" class="dropdown-btn" @click="user_click(0)">-->
              <!--<i class="icon fa fa-sign-out"></i>-->
              <!--<span>安全退出</span>-->
            <!--</a>-->
          <!--</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
      <img @click="user_click(0)" class="logout" src="./images/out_03.png">
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        size="tiny"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="oldPass" style="margin-bottom:20px;!important">
            <el-input class="width_input" type="password" v-model="ruleForm.oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass" style="margin-bottom:20px;!important">
            <el-input class="width_input" type="password" v-model="ruleForm.newPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" style="margin-bottom:20px;!important">
            <el-input class="width_input" type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import {SET_USER_INFO} from 'store/actions/type'

  const USER_OUT = 0;
  const USER_INFO = 1;
  const USER_SETTING = 2;
  const PASS_CHANGE=3;
  export default{
    data(){
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
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
          ruleForm:{
            oldPass: '',
            newPass:'',
            checkPass:''
          },
        dialogVisible:false,
        rules:{
          newPass: [
            {required: true,validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true,validator: validatePasscheck, trigger: 'blur'}
          ],
          oldPass: [{required: true, message: '旧密码不能为空', trigger: 'blur'}]
        }
      }
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    methods: {
      ...mapActions({
        set_user_info: SET_USER_INFO
      }),
      //退出
      user_out(){
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$fetch.api_user.logout()
            .then(({msg}) => {
              this.$message.success(msg)
              this.set_user_info(null)
              setTimeout(this.$router.replace({name: "login"}), 500)
            })
        }).catch(() => {

        })
      },
      user_info() {
        //个人信息
      },
      user_setting() {
        //设置
      },
      pass_change(){
        this.dialogVisible=true;
      },
      user_click(type) {
        switch (type) {
          case USER_OUT :
            //退出
            this.user_out();
            break;
          case USER_INFO:
            //个人信息
            break;
          case USER_SETTING:
            //设置
            break;
          case PASS_CHANGE:
            //更改密码
            this.pass_change();
            break
        }
      },
      submit(){
        this.dialogVisible = false;
        console.log("aaa");
      }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .logout{
    display:inline-block;float:right;margin-right:5px;height:50px;
    &:hover{
      cursor:pointer;
     }
  },
  .width_input{
    width:210px;
  }
</style>
