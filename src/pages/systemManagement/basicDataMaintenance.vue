<template>
  <div class="basicData">
    <panel-title :title="$route.meta.title">

    </panel-title>

    <form id="form" style="padding-left:20px;" v-loading="loading">
      <div>
        密码：
        <el-input class="width_input" type="password" v-model="password" auto-complete="off"></el-input>
      </div>
      <input type="file" name="shangchuan" @change="getFile($event)" style="margin:20px 0;"><br>
      <el-button @click="submitForm($event)">提交</el-button>
    </form>

    <!--<el-upload
      class="upload-demo"
      drag
      action="https://o2o-management.vcredit.com/api/management/sales/import"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">请上传文件，且不超过500kb</div>
    </el-upload>-->
  </div>
</template>
<script>
  import '../../assets/scss/main.scss'
  import {panelTitle,bottomToolBar} from 'components';
  import { uploadFile } from '../../service/getData';
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    data() {
      return {
        loading:false,
        password:'',
        accessToken:'',
        flie:''
      }
    },
    created() {
      this.accessToken = window.localStorage.getItem('accessToken');
    },
    components: {
      ElFormItem,
      panelTitle,
      bottomToolBar
    },
    methods: {
      submitForm(e) {
        if(!this.password) {
          alert('请输入密码');
          return ;
        }
        this.loading = true;
        e.preventDefault();
        let formData = new FormData();
        formData.append('file',this.file);
        formData.password = this.password;
        uploadFile(formData).then(data=>{
          this.loading = false ;
          if(data.error) return ;
          this.$message({
            message: '恭喜您，文件上传成功！',
            type: 'success'
          });
          formData = {};
        })
      },
      getFile(e) {
        this.file = e.target.files[0];
      },
      // submitForm(val){
      //   this.loading = true;
      //   this.$message.success('导入完成！')
      // },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    }
  }
</script>
<style lang="scss" >
.basicData{
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
