<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form"  label-width="150px">
            <el-form-item label="门店名称" prop="name">
              <el-input v-model="form.storeName" placeholder="请输入门店名称" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="门店地址" prop="address">
              <el-input v-model="form.storeAddress" placeholder="请输入门店地址" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="是否关闭">
              <el-radio class="radio" v-model="radio" label="否">未关闭</el-radio>
              <el-radio class="radio" v-model="radio" label="是">已关闭</el-radio>
            </el-form-item>
            <el-form-item label="是否扩大经营">
              <el-radio class="radio" v-model="radio1" label="是">是</el-radio>
              <el-radio class="radio" v-model="radio1" label="否">否</el-radio>
            </el-form-item>
            <el-form-item label="是否网外城市">
              <el-radio class="radio" v-model="radio2" label="是">是</el-radio>
              <el-radio class="radio" v-model="radio2" label="否">否</el-radio>
            </el-form-item>
            <el-form-item label="是否添加网外城市">
              <el-radio class="radio" v-model="radio3" label="否">否</el-radio>
              <el-radio class="radio" v-model="radio3" label="是">是</el-radio>
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
          storeName: this.$route.params.storeName,
          //birthday: this.$dateFormat(new Date, "yyyy-MM-dd"),
          storeAddress: this.$route.params.storeAddress,
        },
        radio:this.$route.params.isClosed,
        radio1:this.$route.params.isSpread,
        radio2:'是',
        radio3:'否',
        //route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
      }
    },
    created(){
      //this.route_id && this.get_form_data()
      console.log(this.address);
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
