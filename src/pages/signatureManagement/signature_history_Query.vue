<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
    <el-form ref="form" :model="form" label-width="150px"  v-show="!isFold">
      <el-form-item label="身份证号码" prop="idCard">
        <el-input class="width_input" v-model="form.idCard" placeholder="请输入有效的18位身份证号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="search" @click="submitForm('form')">查询</el-button>
        <el-button icon="edit" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="divide"></div>
    <!--<main-Contentfold @mainfold="fold()"></main-Contentfold>-->
    <!--<el-table-->
      <!--ref="singleTable"-->
      <!--:data="tableData"-->
      <!--highlight-current-row-->
      <!--@current-change="handleCurrentChange"-->
      <!--style="width: 100%"-->
      <!--v-loading="load_data"-->
      <!--element-loading-text="拼命加载中"-->
      <!--border>-->
      <!--<el-table-column-->
        <!--type="index"-->
        <!--width="55">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="submitTime"-->
        <!--label="提交时间"-->
        <!--width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="orderNumber"-->
        <!--label="订单号"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="customerName"-->
        <!--label="姓名"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="idCard"-->
        <!--label="身份证号码"-->
        <!--width="200">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="signatureSource"-->
        <!--label="签名来源"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="assignedCustomerServicer"-->
        <!--label="分配的客服"-->
        <!--width="150">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="servicerCheckTime"-->
        <!--label="客服审核时间"-->
        <!--width="180">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="handle"-->
        <!--label="操作">-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<div class="block">-->
      <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="[10, 20, 30, 40]"-->
        <!--:page-size="100"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="400">-->
      <!--</el-pagination>-->
    <!--</div>-->
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
          idCard:'',
        },
        idcardValide: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
//        checkStatus: '',
//        currentStep:'',
//        currentPage:1,
//        total:20,
        load_data:false,
//        tableData: [{submitTime:'2017-06-22 09:45',orderNumber:'15088754169',customerName:'小可爱裘盈',
//          idCard:'330683199403300042',signatureSource:'你猜你猜你猜呀',assignedCustomerServicer:'天仙宝宝',servicerCheckTime:'2017-06-22 10:56'}],
//        currentRow: null
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      mainContentfold
    },
    methods: {
      fold(){
        this.isFold=!this.isFold;
        console.log('aaaa');
      },
      on_refresh(){
        //this.get_table_data();
        //this.load_data=true;
      },
      submitForm(val){
        if(this.form.idCard==''){
          this.$alert('身份证号码不能为空！','提示');
        }else if(!this.idcardValide.test(this.form.idCard)){
            this.$alert('身份证号码不正确！','提示');
        }else{

        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.dateRange='';
        this.form.checkStatus='';
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
