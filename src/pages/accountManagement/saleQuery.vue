<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
    </panel-title>
    <el-form ref="form" :model="form" label-width="150px"  style="margin-bottom:20px;">
      <el-form-item label="员工工号" prop="saleNumber" style="display:inline-block;" label-width="150px">
        <el-input
          class="width_input"
          v-model="form.saleNumber"
          icon="search"
          :on-icon-click="search"
          placeholder="请输入员工工号">
        </el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="saleName" style="display:inline-block;" label-width="150px">
        <el-input
          class="width_input"
          v-model="form.saleName"
          icon="search"
          :on-icon-click="search"
          placeholder="请输入姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="inviteCode" style="display:inline-block;" label-width="150px">
        <el-input
          class="width_input"
          v-model="form.inviteCode"
          icon="search"
          :on-icon-click="search"
          placeholder="请输入邀请码">
        </el-input>
      </el-form-item>
      <div :inline="true" class="demo-form-inline" >
        <div class="leftlabel" style="width:130px;">分部-销售部-城市</div>
        <el-cascader
          placeholder="试试搜索城市"
          :options="cities"
          v-model="city"
          filterable
          change-on-select
          clearable>
        </el-cascader>

        <div class="leftlabel" style="width:130px;">门店-团队-销售</div>
        <el-cascader
          placeholder="试试搜索门店"
          :options="saleList"
          v-model="saleMan"
          change-on-select
          filterable
          clearable>
        </el-cascader>
      </div>
      <!--<el-form-item>
        <el-button type="primary" icon="search" @click="search()">查询</el-button>
        <el-button icon="edit" @click="resetForm()">重置</el-button>
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
        property="saleNumber"
        label="员工工号"
        width="130">
      </el-table-column>
      <el-table-column
        property="saleMobile"
        label="员工电话"
        width="130">
      </el-table-column>
      <el-table-column
        label="账号状态"
        width="100">
        <template scope="scope">
          <span>{{ scope.row.enable ? '账号正常' : '离职'  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="employeeId"
        label="员工ID"
        width="100">
      </el-table-column>

      <el-table-column
        property="saleName"
        label="员工姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="level"
        label="职级"
        width="90">
      </el-table-column>
      <el-table-column
        property="baseLine"
        label="基准分数"
        width="120">
      </el-table-column>

      <el-table-column
        property="modifyTime"
        label="修改时间"
        width="180">
      </el-table-column>

      <el-table-column
        property="createTime"
        label="创建时间"
        width="180">
      </el-table-column>

      <el-table-column
        property="position"
        label="角色"
        width="120">
      </el-table-column>
      <el-table-column
        property="financialAdviser"
        label="是否可接单"
        width="120">
        <template scope="scope">
          <span>{{ scope.row.financialAdviser ? '是' : '否'  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="teamName"
        label="团队"
        width="120">
      </el-table-column>
      <el-table-column
        property="storeName"
        label="门店"
        width="100">
      </el-table-column>
      <el-table-column
        property="city"
        label="城市"
        width="120">
      </el-table-column>

      <el-table-column
        property="invitationCode"
        label="邀请码"
        width="120">
      </el-table-column>

      <el-table-column
        property="saleDepartment"
        label="所属销售部"
        width="120">
      </el-table-column>
      <el-table-column
        property="branch"
        label="所属分部"
        width="100">
      </el-table-column>
      <!--<el-table-column
        property="storeId"
        label="部门ID"
        width="200">
      </el-table-column>-->
      <!--<el-table-column
        property="isbindinWechat"
        label="是否绑定微信账号"
        width="250">
      </el-table-column>-->
      <!--<el-table-column
        label="操作"
        width="600px;">-->
        <!--<template scope="props">
          <el-button
            style="margin:5px!important;"
            @click="dialogVisible=true"
            :plain="true"
            type="info" size="small"
            icon="search" >查看关联用户
          </el-button>
          <el-dialog title="关联客户信息" :visible.sync="dialogVisible" :modal-append-to-body=false>
            <el-table :data="bindCustomerData">
              <el-table-column property="loginAccount" label="登录账号" width="150"></el-table-column>
              <el-table-column property="accountStatus" label="账号状态" width="150"></el-table-column>
              <el-table-column property="registerTime" label="注册时间" width="180"></el-table-column>
              <el-table-column property="customersource" label="客户来源" width="150"></el-table-column>
              <el-table-column property="isAgent" label="是否是代理人" width="150"></el-table-column>
              <el-table-column property="firstBindTime" label="首次绑定时间" width="180"></el-table-column>
              <el-table-column property="ZJSlockedTime" label="转介绍关系锁定时间" width="180"></el-table-column>
              <el-table-column property="isBindinWX" label="是否绑定微信账号" width="150"></el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
          </el-dialog>
          <router-link :to="{name: 'saleInfoChange',
          params: {saleName: props.row.saleName,loginAccount:props.row.loginAccount,position:props.row.position,store:props.row.store,team:props.row.team}}" tag="span">
            <el-button
              style="margin:5px!important;"
              @click="edit"
              :plain="true"
              type="warning" size="small"
              icon="edit">修改
            </el-button>
          </router-link>
        </template>-->
      <!--</el-table-column>-->
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
  import {panelTitle,bottomToolBar,mainContentfold} from 'components'
  import { searchBranchDepartment, searchBySaleMan ,getSalesInfo } from '../../service/getData';
  export default {
    data() {
      return {
        form: {
          saleNumber:'',
          inviteCode:'',
          saleName:'',
          branchName:'',  //分部信息
          saleDepartmentName:'',  //销售部信息
          city:'',
          storeName:'',   //门店名称
          saleTeamName:'',  //团队名称
          pageNo:1,
          pageSize:10
        },
        cities:[],
        saleMan:[],
        saleList:[],
        city:[],
        dialogVisible:false,
        total:0,
        loading:false,
        tableData: [],
        currentRow: null,
        bindCustomerData:[{loginAccount:'15958027886',accountStatus:'正常',registerTime:'2017-06-20 08：20',customersource:'自然流入',isAgent:'否',firstBindTime:'2017-06-20 08：20',ZJSlockedTime:'2017-06-20 08：20',isBindinWX:'是'}]
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      mainContentfold
    },
    created(){
      this.getSalesList();
      searchBranchDepartment().then(data =>{  //初始化查询三级城市列表
        this.cities = data.data
      });
    },
    watch: {    //监听选中的城市和销售信息
      city(curVal,oldVal) {   //城市信息
        console.log(curVal)
        this.form.branchName = curVal[0];
        this.form.saleDepartmentName = curVal[1];
        this.form.city = curVal[2];
        this.getSalesList();
        if(curVal.length === 3) {       //如果选中了第三级，则根据城市去查询门店-团队-销售信息
          this.onGetSaleMan();
        }
      },
      saleMan(curVal,oldVal) {
        this.form.storeName = curVal[0];
        this.form.saleTeamName = curVal[1];
        this.form.saleName = curVal[2];
        this.getSalesList();
      }
    },
    methods: {
      onGetSaleMan() {
        searchBySaleMan({
          city:this.form.city
        }).then(data => {
          this.saleList = data.data ;
        })
      },
      getSalesList() {
        this.loading = true;
        getSalesInfo(this.form).then(data => {
          this.loading = false;
          if(data.error) return ;
          this.tableData = data.data.data ;
          this.total = data.data.total ;
        })
      },
      search(){
        this.getSalesList();
      },
//       resetForm(formName) {
//         this.$refs[formName].resetFields();
//         this.form.selectSaledepartment='';
//         this.form.  ='';
// //        this.form.selectTeam='';
// //        this.form.selectSale='';
//       },
      onPageSizeChange(val) {
        this.form.pageSize = val;
        this.search();
      },
      onPageNoChange(val) {
        this.form.pageNo = val;
        this.search();
      },
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
.pannel{
  .el-form-item{
    margin:15px 0;
  }
  .width_input{
    width:30%;
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
}

</style>
