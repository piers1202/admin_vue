<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
    </panel-title>
    <!--<el-tabs v-model="form.productType" type="card">
      <el-tab-pane label="维立贷" name="wld"></el-tab-pane>
      <el-tab-pane label="贷贷看" name="ddk"></el-tab-pane>

    </el-tabs>-->
    <el-form  label-width="100px">
      <el-form-item label="身份证号码" prop="idcard" style="display:inline-block!important;" >
        <el-input
          class="width_input"
          v-model="form.idcard"
          placeholder="请输入有效的身份证号码"
          icon="search"
          :on-icon-click="submitForm">
        </el-input>
      </el-form-item>
      <el-form-item label="订单号" prop="orderId" style="display:inline-block!important;">
        <el-input
          class="width_input"
          v-model="form.orderId"
          icon="search"
          :on-icon-click="submitForm"
          placeholder="请输入订单号">
        </el-input>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="form" label-width="100px">
      <div :inline="true" class="demo-form-inline">

        <el-form-item label="产品类型" style="display:inline-block!important;">
          <el-select
            v-model="form.productType"
            @change="submitForm"
            class="width_input"
            filterable
            clearable
            placeholder="请选择产品类型">
            <el-option
              v-for="item in product"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态" style="display:inline-block!important;">
          <el-select
            v-model="form.auditStatus"
            @change="submitForm"
            class="width_input"
            filterable
            clearable
            placeholder="请选择审核状态">
            <el-option
              v-for="item in auditStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间范围" label-width="100px" style="display:inline-block!important;">
            <el-date-picker
              v-model="dateRange"
              @change="submitForm"
              type="daterange"
              placeholder="选择日期范围">
            </el-date-picker>
        </el-form-item>

      </div>
      <el-form-item>
        <el-button type="primary" icon="search" @click="submitForm">查询</el-button>
        <el-button icon="edit" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="singleTable"
      :data="signList"
      v-loading="loading"
      highlight-current-row
      style="width: 30"
      border>
      <el-table-column
        type="index"
        width="55">
      </el-table-column>
      <el-table-column
        property="signTime"
        label="提交时间"
        width="180">
      </el-table-column>
      <el-table-column
        property="orderId"
        label="订单号"
        width="150">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        property="idcard"
        label="身份证号码"
        width="200">
      </el-table-column>
      <el-table-column
        property="productType"
        label="产品类型"
        width="100"
      >
      </el-table-column>

      <el-table-column
        property="applyStep"
        label="当前步骤"
        width="150">
      </el-table-column>

      <el-table-column
        property="signFrom"
        label="签名来源"
        width="150">
      </el-table-column>
      <el-table-column
        property="customerServer"
        label="分配的客服"
        width="130">
      </el-table-column>
      <el-table-column
        property="auditTime"
        label="客服审核时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="审核状态"
        width="120"
      >
        <template scope="scope">
          <span>{{getCNStatus(scope.row.auditStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        property="handle"
        label="操作"
      >
         <template scope="props">
           <el-button
             style="margin:5px!important;"
             @click="getInfoDetail(props.row.orderId,props.row.idcard,props.row.productTypeEN,props.row.versionNo,props.row.auditStatus)"
             type="info" size="small"
             icon="edit">审核
           </el-button>
           <el-dialog title="审核签名信息" :visible.sync="isAuditInfoShow" :modal-append-to-body=false>
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
                <p>签名图片</p>
                <img style="text-align:center;max-width:300px;" :src="signImg" />
              </el-col>
             </el-row>
             <div style="text-align:center">
               <el-button type="success" :plain="true" icon="check" @click="submit(1)" :disabled = "auditStatusControlBtn !==0">通过</el-button>
               <el-button type="danger" :plain="true" icon="close" @click="submit(-1)" :disabled = "auditStatusControlBtn !==0">签名不通过</el-button>
               <el-button type="danger" :plain="true" icon="close" @click="submit(-2)" :disabled = "auditStatusControlBtn !==0">身份证不通过</el-button>
             </div>
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
  import { getSignInfoList,sumitAuditSign } from '../../service/getData';
  import { getIdcardImage, getIdcardImageWld } from '../../service/getOrderInfo';
  export default {
    data() {
      return {
        loading:false,
        dateRange:[],
        handImg:'',
        faceImg: '',
        backImg:'',
        signImg:'',
        auditStatusControlBtn:'',
        form: {
          idcard:'',
          startTime:'',
          pageNo:1,
          pageSize:10,
          endTime:'',
          orderId:'',
          auditStatus:0,      //默认全部
          productType:'wld'   //默认选中维立贷
        },
        auditStatusList: [{
          value: 0,
          label: '待审核'
        }, {
          value: 1,
          label: '审核通过'
        }, {
          value: -1,
          label: '审核未通过'
        }],
        product:[{
          value:'wld',
          label:'维立贷'
        },{
          value:'xed',
          label:'小额贷'
        },{
          value:'ded',
          label:'大额贷'
        }],
        total:0,
        signList: [],
        isAuditInfoShow:false,
        auditInfo:{
          orderId:'',
          productType:'',
          passAudit:'',
          agentName:''
        }
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created() {
      const date = new Date();
      this.form.startTime = this.form.endTime = date.getFullYear().toString() + '-'+ (date.getMonth()+1).toString()+ '-' + date.getDate().toString();
      this.dateRange[0] = this.form.startTime;
      this.dateRange[1] = this.form.endTime ;
      this.getInfoList();
    },
    methods: {
      getInfoList() {
        this.loading = true ;
        getSignInfoList(this.form).then( data => {
          this.loading = false ;
          if(data.error) return ;
          this.signList = data.data.rows ;
          this.total = data.data.total;
        })
      },
      getCNStatus(e) {  //审核状态，根据数字匹配中文
        let label = ''
        this.auditStatusList.map(data => {
          if(data.value === e) {
            label = data.label ;
          }
        })
        return label ;
      },
      getInfoDetail(orderId,idcard,productType,versionNo,auditStatusControlBtn) { //获取签名图片，并保存改用户的orderId,productType(审核签名要用到)
        this.auditStatusControlBtn = auditStatusControlBtn;
        this.auditInfo.orderId = orderId;
        this.auditInfo.productType = productType;
        this.faceImg = '';
        this.backImg = '';
        this.handImg = '';
        this.signImg = '';
        this.isAuditInfoShow = true ;

        if(this.form.productType === 'wld') {
          getIdcardImageWld({
            orderId:orderId,
            idcard:idcard,
            productType:productType,
            versionNo:versionNo
          }).then(data => {
            this.faceImg = 'data:image/png;base64,'+ data.data.faceImg;
            this.backImg = 'data:image/png;base64,'+ data.data.backImg;
            this.handImg = 'data:image/png;base64,'+ data.data.handImg;
            this.signImg = 'data:image/png;base64,'+ data.data.personAlizedSignatureBase64;
          })
        }else {
          getIdcardImage({
            orderId:orderId,
            idcard:idcard,
            productType:productType,
            versionNo:versionNo
          }).then(data => {
            this.faceImg = 'data:image/png;base64,'+ data.data.faceImg;
            this.backImg = 'data:image/png;base64,'+ data.data.backImg;
            this.handImg = 'data:image/png;base64,'+ data.data.handImg;
            this.signImg = 'data:image/png;base64,'+ data.data.personAlizedSignatureBase64;
          })
        }


      },
      onPageSizeChange(val) {
        this.form.pageSize = val ;
        this.getInfoList();
      },
      onPageNoChange(val) {
        this.form.pageNo = val;
        this.getInfoList();
      },
      submitForm(){        //提交查询
        if(this.dateRange[0]) {
          this.form.startTime = elementDateFormat(this.dateRange).startTime;
          this.form.endTime = elementDateFormat(this.dateRange).endTime;
        }else{
          this.form.startTime = '';
          this.form.endTime = '';
        }
        this.getInfoList();
      },
      resetForm(formName) {       //重置
        this.$refs[formName].resetFields();
        this.form.startTime='';
        this.form.auditStatus='';
      },

      submit(passAudit){ //签名审核
        this.auditInfo.passAudit = passAudit;
        sumitAuditSign(this.auditInfo).then(data => {
          if(data.error) return ;
          this.isAuditInfoShow = false ;
          this.getInfoList();
        })
      },

    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
.panel{
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
    height: 50px;
  }
}

</style>
