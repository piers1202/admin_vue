<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <!--<el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>-->
    </panel-title>
    <el-form ref="form" :model="form" label-width="90px"  v-show="!isFold">
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
        <!--<el-form-item label="营销人工号" prop="recommend" style="display:inline-block!important;">
          <el-input
            class="width_input"
            v-model="form.recommend"
            icon="search"
            :on-icon-click="submitForm"
            placeholder="按营销人工号查询">
          </el-input>
        </el-form-item>-->

      </div>
      <div :inline="true" class="demo-form-inline">
        <el-form-item label="产品类型" style="display:inline-block!important;">
          <el-select
            v-model="form.productType"
            class="width_input"
            prop="productType"
            @change="onProductChange"
            filterable
            clearable
            placeholder="请选择产品类型">
            <el-option label="大额贷" value="ded"></el-option>
            <el-option label="小额贷" value="xed"></el-option>
          </el-select>
        </el-form-item>

        <!--<el-form-item label="当前步骤" style="display:inline-block!important;">
          <el-select
            v-model="form.currentStep"
            class="width_input"
            prop="currentStep"
            @change="onCurrentStepChange"
            filterable
            clearable
            placeholder="请选择订单申请步骤">
            <el-option
              v-for="item in orderStep"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>-->


        <div class="block" style="margin-top:15px;margin-bottom:15px;display:inline-block!important;">
          <label class="el-form-item__label" style="width:90px;text-align:right">申请时间 </label>
          <el-date-picker
            v-model="dateRange"
            @change="submitForm"
            type="daterange"
            placeholder="选择时间范围">
          </el-date-picker>
        </div>
      </div>

      <!--<div :inline="true" class="demo-form-inline" >
        <div class="leftlabel" style="width:130px;">分部-销售部-城市</div>
        <el-cascader
          expand-trigger="hover"
          placeholder="试试搜索城市"
          @change="onGetSaleMan"
          :options="cities"
          v-model="city"
          filterable
          clearable>
        </el-cascader>
        <div class="leftlabel" style="width:130px;">门店-团队-销售</div>
        <el-cascader
          expand-trigger="hover"
          placeholder="试试搜索门店"
          :options="saleList"
          v-model="saleMan"
          filterable
          clearable>
        </el-cascader>
      </div>-->

      <el-form-item>
        <el-button type="primary" icon="search" @click="submitForm">查询</el-button>
        <el-button icon="edit" @click="resetForm('form')">重置</el-button>
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
      <!--<el-table-column
        type="index"
        width="55">
      </el-table-column>-->
      <!--<el-table-column
        property="orderId"
        label="订单号"
        width="110">
      </el-table-column>-->
      <el-table-column
        property="loginName"
        label="登录账号"
        width="130">
      </el-table-column>
      <el-table-column
        property="name"
        label="客户姓名"
        width="100">
      </el-table-column>
      <el-table-column
        label="身份证号码"
        width="180">
        <template scope="scope">
          <span>{{scope.row.idcard.replace(/(\d{6})\d{8}(\d{4})/, '$1****$2')}}</span>
        </template>
      </el-table-column>

      <el-table-column
        property="currentStep"
        label="订单步骤"
        width="150">
      </el-table-column>
      <el-table-column
        property="address"
        label="户籍地址"
        width="280">
      </el-table-column>
      <el-table-column
        property="orderStatus"
        label="订单状态"
        width="150">
      </el-table-column>
      <el-table-column

        label="是否关单"
        width="100">
        <template scope="scope">
          <span>{{ scope.row.isClose === 1 ? '是' : '否'  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="mobile"
        label="申请手机"
        width="125">
      </el-table-column>
      <!--1、小额贷的显示列表，取消接单销售，原接单销售的数据放在营销人这列。因为小额贷只有营销人，没有接单人。-->
      <el-table-column
        v-if="form.productType==='ded'"
        property="receiverName"
        label="接单人"
        width="100">
      </el-table-column>
      <el-table-column
        v-if="form.productType==='ded'"
        property="receiverStore"
        label="接单门店"
        width="100">
      </el-table-column>
      <el-table-column
        property="marketerName"
        label="营销人"
        width="110">
      </el-table-column>
      <el-table-column
        property="marketerStore"
        label="营销门店"
        width="100">
      </el-table-column>
      <el-table-column
        property="agent"
        label="代理人"
        width="150">
      </el-table-column>
      <el-table-column
        property="applyTime"
        label="申请时间"
        width="190">
      </el-table-column>
      <!--<el-table-column
        label="营销人"
        v-if="form.productType==='ded'"
        width="100">
        <template scope="scope">
          <span>{{ scope.isRecommend === 1 ? scope.isRecommend : '无' }}</span>
        </template>
      </el-table-column>-->

      <el-table-column
        label="操作"
        fixed="right"
        min-width="280px">
        <template scope="props">
          <el-button
            style="margin:5px!important;"
            :disabled="!props.row.idcard"
            @click="getIdcardInfo(props.row.orderId,props.row.idcard,props.row.versionNo)"
            :plain="true"
            type="info" size="small"
            icon="picture">证件信息</el-button>
          <el-dialog title="证件快照" :visible.sync="isIdcardImgShow" :modal-append-to-body=false >
            <p style="text-align:center;margin:20px;">身份证正反面</p>
            <img style="text-align:center;max-width:500px;margin-bottom:5px;" :src="faceImg" />
            <img style="text-align:center;max-width:500px;margin-bottom:5px;" :src="backImg" />
            <p style="text-align:center;margin:20px;">手持身份证照片/人脸照片</p>
            <img style="text-align:center;max-width:500px;" :src="handImg" />

          </el-dialog>
          <!--判断用户是否有查看订单详情权限-->
          <el-button
            v-if="permissions.indexOf(3) > -1"
            style="margin:5px!important;"
            @click="toDetail(props.row.orderId,props.row.productType)"
            :plain="true"
            type="info" size="small"
            icon="search">订单详情
          </el-button>
          <el-button
            v-if="permissions.indexOf(6) > -1"
            style="margin:5px!important;"
            @click="toCloseOrder(props.row.orderId)"
            :plain="true"
            type="danger" size="small"
            :disabled="props.row.isClose !==0"
            icon="delete">关单
          </el-button>
          <el-button
            style="margin:5px!important;"
            :plain="true"
            :disabled="!props.row.idcard"
            type="info" size="small"
            @click="editInfo(props.row.orderId,props.row.idcard,props.row.name,props.row.address,props.row.productType)"
            icon="edit">修改信息
          </el-button>
          <el-dialog title="修改信息" :visible.sync="editInfoShow" :modal-append-to-body=false >
            <el-form ref="form" :model="form" label-width="90px"  v-show="!isFold">
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
  import '../../assets/scss/main.scss';

  import { panelTitle,bottomToolBar } from 'components';
  import { elementDateFormat } from '../../common/config/myUtils';
  import {
    searchBranchDepartment,
    searchBySaleMan,
    getOrderStepList,
    getPermissions
  } from '../../service/getData';
  import {
    getIdcardImage,
    searchOrderInfo,
    closeOrder,
    editCustomerInfo
  } from '../../service/getOrderInfo';
  export default {
    data() {
      return {
        isFold:false,
        role:'guest',
        permissions:[],
        editInfoShow:false,
        loading:false,
        faceImg: '',
        backImg: '',
        handImg: '',
        city:[],
        saleMan:[],
        form: {
          name:'',
          idcard:'',
          productType:'xed',
          loginName:'',
          recommend:'',
          orderStatus:'',
          auditStatus:'',
          currentStep:'',
          startTime:'',
          endTime:'',
          pageNo:1,
          pageSize:10
        },
        options: [],
        orderStep: [],
        productOrderStep:{},  //
        cities:[],
        saleList:[],
        total:0,
        dateRange:[],
        tableData: [],
        isIdcardImgShow: false,   //控制证件照片显示与否
        editContent:{
          idcard:'',
          name:'',
          address:'',
          orderId:'',
          productType:''
        }
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
    },
    created() {
      this.role = JSON.parse(window.localStorage.getItem('userInfo')).role || 'guest';
      //从详情页回来，读取上次的筛选参数，获取列表后删除localstorage
      let form = JSON.parse(window.localStorage.getItem('ddkForm'))
      this.form = form ? form : this.form;
      if(!this.form.startTime) {
        const date = new Date();
        this.form.startTime = this.form.endTime = date.getFullYear().toString() + '-'+ (date.getMonth()+1).toString()+ '-' + date.getDate().toString();
      }
      this.dateRange[0] = this.form.startTime;
      this.dateRange[1] = this.form.endTime ;
      if(this.form.name || this.form.loginName || this.form.idcard) {
        this.submitForm();
      }

      getPermissions().then(data => {
        this.permissions = data.data.permissions
      })
      // searchBranchDepartment().then(data =>{
      //   this.cities = data.data
      // });
      // this.getStepList();

    },
    methods: {
      onPageSizeChange(val) {
        this.form.pageSize = val ;
        this.getDataList();
      },
      onPageNoChange(val) {
        this.form.pageNo = val ;
        searchOrderInfo(this.form).then(data =>{
          this.tableData = data.data.list
        })
      },
      toDetail(orderId,productType) {
        this.$router.push('/orderQuery/orderInfo?id='+orderId+'&productType='+productType);
        window.localStorage.setItem('ddkForm',JSON.stringify(this.form))
      },
      getIdcardInfo(orderId,idcard,versionNo) {
        this.faceImg = '';
        this.backImg = '';
        this.handImg = '';
        this.isIdcardImgShow = true;
        getIdcardImage({
          idcard:idcard,
          orderId:orderId,
          versionNo:versionNo,
          productType:this.form.productType,
        }).then(data => {
          this.faceImg = 'data:image/png;base64,' + data.data.faceImg ;
          this.backImg = 'data:image/png;base64,' + data.data.backImg ;
          this.handImg = 'data:image/png;base64,' + data.data.handImg ;
        })
      },
      onCurrentStepChange() {
        this.getDataList();
      },
      onProductChange() {
        this.form.currentStep = '';
        this.orderStep = this.form.productType === 'ded' ? this.productOrderStep.dedOrderStatus : this.productOrderStep.xedOrderStatus;
        this.getDataList();
      },
      getStepList() {
        getOrderStepList().then(data => {
          this.productOrderStep = data.data;
          this.orderStep = this.form.productType === 'ded' ? this.productOrderStep.dedOrderStatus : this.productOrderStep.xedOrderStatus;
        })
      },
      getDataList() {
        if(!this.form.loginName && !this.form.name && !this.form.idcard) {
          alert('必须输入姓名，身份证，登录账号中至少一项');
          return ;
        }
        this.loading = true;
        searchOrderInfo(this.form).then(data =>{
          this.loading = false;
          if(data.error) return ;
          window.localStorage.removeItem('ddkForm')
          this.total = data.data.total;
          this.tableData = data.data.list;
        }).catch(e => {
          this.loading = false;
        })
      },
      onGetSaleMan() {
        searchBySaleMan({
          city:this.city[2]
        }).then(data => {
          this.saleList = data.data ;
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.form.selectSaledepartment='';
        this.form.selectCity='';
        this.form.selectTeam='';
        this.form.selectSale='';
        this.form.orderStatus='';
        this.form.currentStep='';
        this.form.selectChannel='';
        this.form.selectMarketPeople='';
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
        editCustomerInfo(this.editContent).then(data => {
          if(data.error) return ;
          this.editInfoShow = false ;
          this.submitForm();
        })
      },
      toCloseOrder(orderId){
        this.$confirm('此操作无法撤销, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.load_data = true
          closeOrder({
            orderId:orderId,
            productType:this.form.productType
          }).then((data) => {
            if(data.error) return ;
            this.$message.success('修改成功');
            this.getDataList();
          })
        })
      }
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
    .el-form-item{
      margin:10px 0;
    }
    .width_input{
      width:210px!important;
    }
    .el-dialog__body{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .el-button{
      padding:10px 15px !important;
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
      color:#48576a !important;
      font-size:15px;
      margin-left:20px;
    }
  /*滚动条样式*/
  ::-webkit-scrollbar, ::-webkit-scrollbar-track-piece{
    height: 10px !important;
    border-radius: 5px !important;
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 5px !important;
  }
</style>
