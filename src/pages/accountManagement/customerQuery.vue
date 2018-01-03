<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
    </panel-title>
    <el-form ref="form" :model="form" label-width="100px" style="display:flex;">
      <el-form-item label="客户账号" prop="accountId">
        <el-input
          class="width_input"
          v-model="form.accountId"
          icon="search"
          :on-icon-click="search"
          placeholder="请输入客户账号">
        </el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="inviteCode">
        <el-input
          class="width_input"
          v-model="form.inviteCode"
          icon="search"
          :on-icon-click="search"
          placeholder="请输入邀请码">
        </el-input>
      </el-form-item>
      <el-form-item label="申请时间" prop="dateRange">
        <el-date-picker
          v-model="dateRange"
          @change="search"
          type="daterange"
          placeholder="选择时间范围">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item>
        <el-button type="primary" icon="search" @click="search">查询</el-button>
        <el-button icon="edit" @click="resetForm">重置</el-button>
      </el-form-item>-->
    </el-form>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中..."
      border>
      <el-table-column
        fixed
        property="name"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        fixed
        property="idcard"
        label="身份证号"
        width="180">
      </el-table-column>

      <el-table-column
        property="loginName"
        label="登录账号"
        width="130">
      </el-table-column>
      <el-table-column
        property="accountStatus"
        label="账号状态"
        width="100">
      </el-table-column>
      <el-table-column
        property="createTime"
        label="注册时间"
        width="180">
      </el-table-column>
      <el-table-column
        property="customerFrom"
        label="客户来源"
        width="160">
      </el-table-column>
      <el-table-column
        property="isAgent"
        label="是否是代理人"
        width="130">
      </el-table-column>
      <el-table-column
        property="firstBindTime"
        label="首次绑定时间"
        width="150">
      </el-table-column>
      <!--<el-table-column
        property="lockTime"
        label="转介绍关系锁定时间"
        width="170">
      </el-table-column>-->
      <el-table-column
        property="marketerName"
        label="营销人姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="marketerMobile"
        label="营销人账号"
        width="130">
      </el-table-column>
      <el-table-column
        property="marketerStore"
        label="营销人门店"
        width="120">
      </el-table-column>
      <el-table-column
        property="marketerTeam"
        label="营销人团队"
        width="120">
      </el-table-column>
      <el-table-column
        property="agentMobile"
        label="代理人账号"
        width="130">
      </el-table-column>
      <el-table-column
        property="inviteCode"
        label="邀请码"
        fixed="right"
        width="100">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="onPageSizeChange"
        @current-change="onPageNoChange"
        :current-page="form.pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import '../../assets/scss/main.scss'
  import {panelTitle,bottomToolBar } from 'components'
  import { elementDateFormat } from '../../common/config/myUtils';
  import { getCustomerInfo } from '../../service/getData';
  export default {
    data() {
      return {
        loading:false,
        form: {
          accountId:'',
          startDate:'',
          endDate:'',
          inviteCode:'',
          pageNo:1,
          pageSize:10
        },
        total:0,
        dateRange:[],
        tableData: [],
        scanData:[],
        followData: [],
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      const date = new Date();
      this.form.startDate = this.form.endDate = date.getFullYear().toString() + '-'+ (date.getMonth()+1).toString()+ '-' + date.getDate().toString();
      console.log(this.form.startDate)
      this.dateRange[0] = this.form.startDate;
      this.dateRange[1] = this.form.endDate ;
      this.search();
    },
    methods: {
      search(){
        if(this.dateRange.length !==0) {
          this.form.startDate = elementDateFormat(this.dateRange).startTime;
          this.form.endDate = elementDateFormat(this.dateRange).endTime;
        }else{
          this.form.startDate = '';
          this.form.endDate = '';
        }
        this.getDataList();
      },
      getDataList() {
        this.loading = true ;
        getCustomerInfo(this.form).then(data => {
          this.loading = false ;
          if(data.error) return ;
          this.tableData = data.data.data;
          this.total = data.data.total;
        })
      },
      onPageSizeChange(val) {
        this.form.pageSize = val ;
        this.search();
      },
      onPageNoChange(val) {
        this.form.pageNo = val ;
        this.search();
      }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
.pannel{
  .el-form-item{
    margin:15px 0;
  }
  .width_input{
    width:210px!important;
  }
  .el-button{
    padding:10px 20px;
    margin-right:5px;
    margin-top:10px;
  }
  .panel .block{
    text-align:left;
    margin-left:0;
    label{
      display:inline-block;
      height:36px;
      font-size: 14px;
      color: #48576a;
    }
  }
  .el-pagination{
    padding:20px 10px;
    text-align:center;
  }
}
</style>
