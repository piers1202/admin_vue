<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.saleName" placeholder="请输入销售姓名" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" prop="address">
              <el-input v-model="form.loginAccount" placeholder="请输入销售登录账号" style="width:250px;"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="selectBranch">
              <el-select v-model="form.position" clearable placeholder="请选择职位" style="width:250px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="门店-团队-销售" prop="selectStore">
              <el-select class="width_input" v-model="form.selectStore" clearable placeholder="请选择门店信息" style="width:250px!important">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
              <el-select class="width_input" v-model="form.selectTeam" clearable placeholder="请选择团队信息" style="width:250px!important;"
                         :disabled="form.selectStore===''">
                <el-option label="是" value="yes2"></el-option>
                <el-option label="否" value="no2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">保存</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'

  export default{
    data(){
      return {
        form: {
          saleName: this.$route.params.saleName,
          //birthday: this.$dateFormat(new Date, "yyyy-MM-dd"),
          loginAccount: this.$route.params.loginAccount,
          position:this.$route.params.position,
          selectStore:this.$route.params.store,
          selectTeam:this.$route.params.team
        },
        options:[{
          value: '选项1',
          label: '客户经理'
        }, {
          value: '选项2',
          label: '销售主管'
        }],
        load_data: false,
        on_submit_loading: false
      }
    },
    created(){
      //this.route_id && this.get_form_data()
      if(this.form.selectStore==''){
          this.form.selectTeam='';
      }
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        this.$fetch.api_table.get({
          id: this.route_id,
          address: this.form.storeAddress,
        })
          .then(({data}) => {
            this.form = data
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.api_table.save(this.form)
            .then(({msg}) => {
              this.$message.success(msg)
              setTimeout(this.$router.back(), 500)
            })
            .catch(() => {
              this.on_submit_loading = false
            })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .width_input{
    width:30%;
  }
</style>
