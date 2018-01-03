<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <!--<el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>-->
    </panel-title>
    <el-form ref="form" :model="form"   v-show="!isFold">
      <div :inline="true">
        <el-form-item label="标题" prop="title" style="display:inline-block;" label-width="100px">
          <el-input
            class="width_input"
            v-model="form.title"
            icon="search"
            :on-icon-click="search"
            placeholder="请输入标题">
          </el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" style="display:inline-block;" label-width="100px">
          <el-input
            class="width_input"
            v-model="form.content"
            icon="search"
            :on-icon-click="search"
            placeholder="请输入内容">
          </el-input>
        </el-form-item>
      </div>
      <div class="block" style="margin-top:15px;" >
        <label class="el-form-item__label" style="width:100px;text-align:right">投诉时间</label>
        <el-date-picker
          v-model="form.dateRange"
          type="datetimerange"
          placeholder="请选择时间范围">
        </el-date-picker>
      </div>
      <el-form-item label-width="100px">
        <el-button type="primary" icon="search" @click="search('form')">查询</el-button>
        <el-button icon="edit" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <main-Contentfold @mainfold="fold()"></main-Contentfold>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
      v-loading="load_data"
      element-loading-text="拼命加载中"
      border>
      <el-table-column
        type="index"
        width="55">
      </el-table-column>
      <el-table-column
        property="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        property="content"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        property="buildTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        property="userName"
        label="用户姓名"
        width="150">
      </el-table-column>
      <el-table-column
        property="mobileNumber"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        property="email"
        label="电子邮箱">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import '../../assets/scss/main.scss'
  import {panelTitle,bottomToolBar,mainContentfold} from 'components'
  export default {
    data() {
      return {
        isFold:false,
        form: {
          title:'',
          dateRange:'',
          content:'',
        },
        currentStep:'',
        currentPage:1,
        total:20,
        length:15,
        load_data:false,
        tableData: [{title:'2017-06-22 09:45',content:'15088754169',buildTime:'2017-06-22 09:45',
        userName:'裘盈小可爱',mobileNumber:'15958027886',email:'270842914@qq.com'}],
        currentRow: null
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      mainContentfold
    },
    created(){
    },
    methods: {
      fold(){
        this.isFold=!this.isFold;
      },

      search(val){

        var a=this.$dateFormat(this.form.dateRange[0],'yyyy-MM-dd hh:mm:ss');
        var b=this.$dateFormat(this.form.dateRange[1],'yyyy-MM-dd hh:mm:ss');
        console.log(a);
        console.log(b);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.dateRange='';
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
.pannel{
  el-form-item{
    margin:10px 0;
  }
  .width_input{
    width:210px!important;
  }
  .el-button{
    padding:10px 20px;
    margin-right:5px;
    margin-top:10px;
  }
  .panel .block {
    text-align: left;
    margin-left: 0;
    label {
      display: inline-block;
      height: 36px;
      font-size: 14px;
      color: #48576a;
      width: 100px;
    }
  }
  .el-pagination{
    padding:20px 10px;
  }
  .inline {
    height:50px;
    el-form-item {
      display: inline-block;
    }
  }
}

</style>
