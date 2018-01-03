<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
    </panel-title>
    <el-form ref="form" :model="form" label-width="90px">
      <div :inline="true" class="demo-form-inline">
        <el-form-item label="客户姓名" prop="name" style="display:inline-block!important;">
          <el-input
            class="width_input"
            v-model="form.name"
            placeholder="按客户姓名查询"
            icon="search"
            :on-icon-click="submitForm">
          </el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard" style="display:inline-block!important;">
          <el-input
            class="width_input"
            v-model="form.idcard"
            placeholder="按身份证号码查询"
            icon="search"
            :on-icon-click="submitForm"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="loginName" style="display:inline-block!important;">
          <el-input
            class="width_input"
            v-model="form.loginName"
            icon="search"
            :on-icon-click="submitForm"
            placeholder="按登录账号查询">
          </el-input>
        </el-form-item>

      </div>
      <div :inline="true" class="demo-form-inline">
        <!--<el-form-item label="客户类型" style="display:inline-block!important;">
          <el-select
            v-model="form.customerType"
            class="width_input"
            prop="auditStatus"
            @change="onSelectChange"
            filterable
            clearable
            placeholder="请选择客户类型">
            <el-option
              v-for="item in occupationalClass"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
        </el-form-item>-->

        <!--<el-form-item label="当前步骤" style="display:inline-block!important;">
          <el-select
            v-model="form.currentStep"
            @change="onSelectChange"
            class="width_input"
            prop="applyStep"
            filterable
            clearable
            placeholder="请选择订单申请步骤">
            <el-option
              v-for="item in orderStatus"
              :key="item.dictCode"
              :label="item.dictName"
              :value="item.dictCode">
            </el-option>
          </el-select>
        </el-form-item>-->

        <div class="block" style="margin-top:15px;margin-bottom:15px;display:inline-block!important;">
          <label class="el-form-item__label" style="width:90px;text-align:right">申请时间 </label>
          <el-date-picker
            v-model="dateRange"
            @change="onSelectChange"
            type="daterange"
            placeholder="选择时间范围">
          </el-date-picker>
        </div>
      </div>

      <el-form-item>
        <el-button type="primary" icon="search" @click="submitForm">查询</el-button>
        <el-button icon="edit" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      v-loading="loading"
      element-loading-text="拼命加载中"
      style="width: 100%"
      border>
      <el-table-column
        type="index"
        width="35">
      </el-table-column>
      <!--<el-table-column
        property="orderId"
        label="订单号"
        width="130">
      </el-table-column>-->

      </el-table-column>
      <el-table-column
        property="loginName"
        label="登录账号"
        width="130">
      </el-table-column>
      <el-table-column
        property="customerName"
        label="客户姓名"
        width="100">
      </el-table-column>
      <el-table-column
        property="idcard"
        label="身份证号码"
        width="180">
      </el-table-column>

      <el-table-column
        property="refuseReason"
        label="拒绝原因"
        width="200">
      </el-table-column>
      <el-table-column
        property="address"
        label="户籍地址"
        width="250">
      </el-table-column>
      <el-table-column
        property="currentStep"
        label="订单步骤"
        width="150">
      </el-table-column>
      <!--<el-table-column
        property="orderStatus"
        label="订单状态"
        width="100">
      </el-table-column>-->
      <el-table-column
        label="是否关单"
        property="isClose"
        width="100">
        <!--<template scope="scope">
          <span>{{ scope.isClose }}</span>
        </template>-->
      </el-table-column>
      <el-table-column
        property="mobile"
        label="申请手机"
        width="125">
      </el-table-column>
      <!--<el-table-column
        property="saleName"
        label="接单销售"
        width="100">
      </el-table-column>
      <el-table-column
        property="teamName"
        label="所属团队"
        width="110">
      </el-table-column>
      <el-table-column
        property="storeName"
        label="所属门店"
        width="100">
      </el-table-column>-->

      <!--<el-table-column
        property="signChannel"
        label="签名来源"
        width="150">
      </el-table-column>-->
      <el-table-column
        property="applyTime"
        label="申请时间"
        width="170">
      </el-table-column>
      <!--<el-table-column
        label="营销人"
        width="80">
        <template scope="scope">
          <span>{{ scope.isRecommend === 1 ? scope.isRecommend : '无' }}</span>
        </template>
      </el-table-column>-->

      <el-table-column
        label="操作"
        fixed="right"
        min-width="400px">
        <template scope="props">
          <el-button
            style="margin:5px !important;"
            :disabled="!props.row.idcard"
            @click="onShowImgInfo(props.row.orderId,props.row.idcard)"
            :plain="true"
            type="info" size="small"
            icon="picture">证件信息</el-button>
          <el-dialog title="证件快照" :visible.sync="isIdcardImgShow" :modal-append-to-body=false>
            <el-row :gutter="20">
              <el-col :span="12">
                <p >身份证正反面</p>
                <img style="text-align:center;max-width:300px;" :src="faceImg" />
              </el-col>
              <el-col :span="12">
                <p >身份证正反面</p>
                <img style="text-align:center;max-width:300px;" :src="backImg" />
              </el-col>
              <el-col :span="12">
                <p >手持身份证</p>
                <img style="text-align:center;max-width:300px;" :src="handImg" />
              </el-col>
              <el-col :span="12">
                <p >签名图片</p>
                <img style="text-align:center;max-width:300px;" :src="signImg" />
              </el-col>
             </el-row>
          </el-dialog>
          <el-button
            v-if="permissions.indexOf(3) > -1"
            style="margin:5px!important;"
            @click="toDetail(props.row.orderId)"
            :plain="true"
            type="info" size="small"
            icon="search">订单详情
          </el-button>
          <el-button
            style="margin:5px!important;"
            @click="getDebtImg(props.row.orderId)"
            :plain="true"
            type="danger" size="small"
            icon="picture">
            维立贷借据
          </el-button>
          <el-dialog title="证件快照" :visible.sync="isDebtShow" :modal-append-to-body=false>
            <img style="text-align:center;max-width:500px;" :src="debtImg" />
          </el-dialog>
          <el-button
            v-if="permissions.indexOf(6) > -1"
            style="margin:5px!important;"
            @click="toCloseOrder(props.row.orderId)"
            :disabled="props.row.isClose !=='否'"
            :plain="true"
            type="danger" size="small"
            icon="delete">
            关单
          </el-button>
          <el-button
            style="margin:5px!important;"
            :plain="true"
            type="info" size="small"
            :disabled="!props.row.idcard"
            @click="editInfo(props.row.orderId,props.row.idcard,props.row.customerName,props.row.address,props.row.productType)"
            icon="edit">修改信息
          </el-button>
          <el-dialog title="修改信息" :visible.sync="editInfoShow" :modal-append-to-body=false >
            <el-form ref="form" :model="form" label-width="90px" >
              <div :inline="true" class="demo-form-inline">
                <el-form-item label="客户姓名"  style="display:inline-block!important;">
                  <el-input v-model="editContent.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证"  style="display:inline-block!important;">
                  <el-input v-model="editContent.idcard" placeholder="身份证" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="户籍地址" style="display:inline-block!important;">
                  <el-input v-model="editContent.address" placeholder="户籍地址" type="textarea" autosize></el-input>
                </el-form-item>
                <el-button @click="editConfirm">确定</el-button>
              </div>
            </el-form>
          </el-dialog>
        </template>
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
  import {panelTitle,bottomToolBar} from 'components';
  import { elementDateFormat } from '../../common/config/myUtils';
  import {
    getWldDictionaries,
    getPermissions
  } from '../../service/getData';
  import {
    closeOrderWld,
    wldDebtImg,
    getIdcardImageWld,
    editCustomerInfoWld,
    searchOrderInfoWld
  } from '../../service/getOrderInfo';
  export default {
    data() {
      return {
        role:'guest',
        loading:false,
        permissions:[],
        isDebtShow:false,
        editInfoShow:false,
        debtImg:'',
        signImg: '',
        backImg: '',
        handImg: '',
        faceImg: '',
        editContent:{
          idcard:'',
          name:'',
          address:'',
          orderId:'',
          productType:''
        },
        form: {
          name:'',
          idcard:'',
          productType:'wld',
          customerType:'',
          loginName:'',
          currentStep:'',
          startTime:'',
          endTime:'',
          pageNo:1,
          pageSize:10
        },
        occupationalClass: [],
        orderStatus: [],
        total:0,
        dateRange:[],
        tableData: [],
        isIdcardImgShow: false
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created() {
      this.role = JSON.parse(window.localStorage.getItem('userInfo')).role || 'guest';
      let form = JSON.parse(window.localStorage.getItem('wldForm'))
      this.form = form ? form : this.form;
      if(!this.form.startTime) {
        const date = new Date();
        this.form.startTime = this.form.endTime = date.getFullYear().toString() + '-'+ (date.getMonth()+1).toString()+ '-' + date.getDate().toString();
      }
      this.dateRange[0] = this.form.startTime;
      this.dateRange[1] = this.form.endTime ;

      getPermissions().then(data => {
        if(data.error) return;
        this.permissions = data.data.permissions;
        console.log(this.permissions)
      })
      if(this.form.name || this.form.loginName || this.form.idcard) {
        this.submitForm();
      }
      getWldDictionaries().then(data =>{
        this.occupationalClass = data.data.occupationalClass ;
        this.orderStatus = data.data.applyStep ;
      })
    },
    methods: {
      getDataList() {
        if(!this.form.loginName && !this.form.name && !this.form.idcard) {
          alert('必须输入姓名，身份证，登录账号中至少一项');
          return;
        }
        this.loading = true;
        searchOrderInfoWld(this.form).then(data =>{
          this.loading = false;
          if(data.error) return ;
          window.localStorage.removeItem('wldForm')
          this.total = data.total;
          this.tableData = data.data;
        }).catch(e =>{
          this.loading = false;
        })
      },
      toDetail(orderId) {
        this.$router.push('/orderQuery/orderInfo?id='+orderId+'&productType=wld');
        window.localStorage.setItem('wldForm',JSON.stringify(this.form))
      },
      onShowImgInfo(orderId,idcard) {
        this.faceImg = '';
        this.backImg = '';
        this.handImg = '';
        this.signImg = '';
        this.isIdcardImgShow = true ;
        getIdcardImageWld({
          orderId:orderId,
          idcard:idcard,
          versionNo:'',
          productType:this.form.productType
        }).then(data => {
          this.faceImg = 'data:image/png;base64,'+ data.data.faceImg;
          this.backImg = 'data:image/png;base64,'+ data.data.backImg;
          this.handImg = 'data:image/png;base64,'+ data.data.handImg;
          this.signImg = 'data:image/png;base64,'+ data.data.personAlizedSignatureBase64;
        })
      },
      getDebtImg(orderId) {
        wldDebtImg({
          orderId:orderId
        }).then(data =>{
          if(data.error) return ;
          this.isDebtShow = true ;
          this.debtImg = 'data:image/png;base64,' + data.data.wechatIou ;
        })
      },
      editInfo(orderId,idcard,name,address,productType) {
        this.editContent.address = address ;
        this.editContent.idcard = idcard ;
        this.editContent.name = name ;
        this.editContent.orderId = orderId ;
        this.editContent.productType = productType ;
        this.editInfoShow = true ;
      },
      editConfirm() { //确定修改信息
        editCustomerInfoWld(this.editContent).then(data => {
          if(data.error) return ;
          this.editInfoShow = false ;
          this.submitForm();
        })
      },

      submitForm(){
        if(!this.dateRange) {   //clear按钮，组件会将dateRange设为'',将会导致下一个判断if(this.dateRange[0])报错，故当其为''时手动设为[]
          this.dateRange = [];
        }
        if(this.dateRange[0]) {
          this.form.startTime = elementDateFormat(this.dateRange).startTime;
          this.form.endTime = elementDateFormat(this.dateRange).endTime;
        }else{
          this.form.startTime = '';
          this.form.endTime = '';
        }
        this.getDataList();
      },
      resetForm(formName) {     //重置
        this.$refs[formName].resetFields();
        this.form.selectSale='';
        this.form.currentStep='';
        this.dateRange=[];
      },
      onPageSizeChange(val) {
        this.form.pageSize = val ;
        this.getDataList();
      },
      onPageNoChange(val) {
        this.form.pageNo = val;
        this.getDataList();
      },
      toCloseOrder(orderId){
        this.$confirm('此操作无法撤销, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          closeOrderWld({
            orderId:orderId,
            productType:this.form.productType
          }).then((data) => {
            if(data.error) return ;
            this.$message.success('关单成功');
            this.getDataList();
          })
        })
      },
      onSelectChange(){
        this.submitForm()
      }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .imgArea{
    display: flex;
  }
  .el-form-item{
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
  }
  .leftlabel{
    display:inline-block;
    width:80px;
    color:#ccc;
    font-size:15px;
    margin-left:20px;
  }

</style>
