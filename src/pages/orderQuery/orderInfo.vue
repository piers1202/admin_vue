<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="loading"
         element-loading-text="拼命加载中">
      <el-row>
        <el-button @click="$router.back()" icon="d-arrow-left" type="info" size="large" style="margin-bottom:10px;">
          返回
        </el-button>
        <el-tabs type="border-card">
          <el-tab-pane label="审核详情">
            <p class="title_underline">客户审核详情</p>
            <div style="padding:0 25px;">
              <!--<el-row  v-for="a in items">-->
                <!--<el-col :span="4" v-for="it in a.item">-->
                  <!--<div class="grey">{{it.name}}</div>-->
                <!--</el-col>-->
              <el-row  :gutter="20">
                <el-col :span="6">
                  <div class="bg-purple">签名提交时间:<span class="content">{{auditInfo.signatureTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">人工审核时间:<span class="content">{{auditInfo.manualAuditTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">人工审核结果:<span class="content">{{auditInfo.manualAuditStatus  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">征信报告类型:<span class="content">{{auditInfo.creditReportType  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">征信上传时间:<span class="content">{{auditInfo.creditUploadTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">征信返回时间:<span class="content">{{auditInfo.creditReportReturnTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">征信报告状态：<span class="content">{{auditInfo.creditReportStatus   ||  '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">是否有手机详单:<span class="content">{{auditInfo.hasMobileBill}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">订单拒绝原因: <span class="content">{{auditInfo.orderRefusedReason || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">审核时间: <span class="content">{{auditInfo.offlineAuditTime || '未知'}}</span></div>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="productType === 'ded'">
                <el-col :span="6">
                  <div class="bg-purple">预审产品首选：<span class="content">{{auditInfo.preferredLoanKind || '无' }}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预审金额：<span class="content">{{auditInfo.preferredLoanMoney ||  0}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">贷款周期：<span class="content">{{auditInfo.preferredLoanPeriod || 0}}</span></div>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="productType === 'ded'">
                <el-col :span="6">
                  <div class="bg-purple">预审产品次选：<span class="content">{{auditInfo.secondaryLoanKind  || '无'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预审金额：<span class="content">{{auditInfo.secondaryLoanMoney  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">贷款周期：<span class="content">{{auditInfo.secondaryLoanPeriod  || '未知'}}</span></div>
                </el-col>
              </el-row>
              <el-row :gutter="20" v-if="productType === 'ded'">
                <el-col :span="6">
                  <div class="bg-purple">预审通过时间:<span class="content"> {{auditInfo.previewPassTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">推送至VBS时间: <span class="content">{{auditInfo.submitToVbsTime  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预交单提交时间: <span class="content">{{auditInfo.preOrderSubmitTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预交单通过时间: <span class="content">{{auditInfo.preOrderBackTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预交单退回原因:<span class="content">{{auditInfo.preOrderBackReason || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">线下提交资料时间: <span class="content">{{auditInfo.offlineUploadDataTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">审核状态: <span class="content">{{auditInfo.offlineAuditStatus || '未知'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">是否退单: <span class="content">{{auditInfo.isOfflineAuditRefused || '未知' }}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">退单时间: <span class="content">{{auditInfo.offlineAuditBackOrderTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">退单原因: <span class="content">{{auditInfo.offlineAuditBackOrderReason || '未知'}}</span></div>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="6">
                  <div class="bg-purple">征信预审拒绝:<span class="content">{{auditInfo.creditPreviewReject  || '未知'}}</span></div>
                </el-col>
              </el-row>
            </div>
            <p class="title_underline" style="margin-bottom:30px;">决策结果</p>
            <div style="padding:0 25px;">
              <el-table
                :data="prereviewResults "
                style="width: 100%">
                <el-table-column
                  prop="loanKind"
                  label="产品名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="previewResult"
                  label="预审结果"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="loanMoney"
                  label="预审额度"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="customerScore"
                  label="客户评分"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="previewTime"
                  label="预审时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="previewRefusedReason"
                  label="失败原因">
                </el-table-column>
              </el-table>
            </div>
            <!--<div class="block">
              <el-pagination
                @size-change="onPageSizeChange"
                @current-change="onPageNoChange"
                :current-page="params.pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>-->
          </el-tab-pane>
          <el-tab-pane label="订单详情">
            <p class="title_underline">客户订单详情</p>
            <div style="padding:0 25px;">
              <el-row >
                <el-col :span="6">
                  <div class="bg-purple">订单来源:<span class="content">{{orderDetailInfo.orderFrom || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">VBS状态:<span class="content">{{orderDetailInfo.vbsOrderStatus  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">客户来源:<span class="content">{{orderDetailInfo.customerFrom  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">注册账号:<span class="content">{{orderDetailInfo.accountId  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">注册时间:<span class="content">{{orderDetailInfo.registerTime  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">订单创建时间:<span class="content">{{orderDetailInfo.orderApplyTime  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">订单号:<span class="content">{{orderDetailInfo.orderId  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预审完成时间:<span class="content">{{orderDetailInfo.previewReturnTime  || '未知'}}</span></div>
                </el-col>
              </el-row>
              <el-row v-if="productType ==='ded'">
                <el-col :span="6">
                  <div class="bg-purple">订单分配时间:<span class="content">{{orderDetailInfo.dispatchTime  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">推送VBS时间:<span class="content">{{orderDetailInfo.submitToVbsTime || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预交单提交时间:<span class="content">{{orderDetailInfo.preOrderSubmitTime  || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">预交单退回时间:<span class="content">{{orderDetailInfo.preOrderBackTime || '未知'}}</span></div>
                </el-col>
              </el-row>

            </div>
            <p class="title_underline">客户基本信息</p>
            <div style="padding:0 25px;">
              <el-row >
                <el-col :span="6">
                  <div class="bg-purple">客户姓名:<span class="content">{{customerInfo.customerName  }}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">电话:<span class="content">{{customerInfo.mobile || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">身份证:<span class="content">{{customerInfo.idcard || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">教育程度:<span class="content">{{customerInfo.education  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">职业类别:<span class="content">{{customerInfo.professionType  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">学历是否可验证:<span class="content">{{customerInfo.onlineVerify}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">婚姻状况:<span class="content">{{customerInfo.marriage  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">月收入:<span class="content">{{customerInfo.aftertaxSalary  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">居住城市:<span class="content">{{customerInfo.city || '未知'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">芝麻分:<span class="content">{{customerInfo.zhimaScore || '无'}}</span></div>
                </el-col>
              </el-row>
              <el-row v-if="productType === 'ded'">
                <el-col :span="6">
                  <div class="bg-purple">所属行业:<span class="content">{{customerInfo.industryType  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">公积金缴纳月数:<span class="content">{{customerInfo.accumulationFundMonth  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">公积金缴纳基数:<span class="content">{{customerInfo.accumulationFundBase  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">社保缴纳月数:<span class="content">{{customerInfo.socialMonth  || '无'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">社保缴纳基数:<span class="content">{{customerInfo.socialBase  || '无'}}</span></div>
                </el-col>

                <!--<el-col :span="6">
                  <div class="bg-purple">户籍是否在居住城市:<span class="content">{{customerInfo.houseHold   || '无'}}</span></div>
                </el-col>-->

                <!--<el-col :span="6">
                  <div class="bg-purple">本地是否有按揭住房:<span class="content">{{customerInfo.localMortgage || '无'}}</span></div>
                </el-col>-->

                <!--<el-col :span="6">
                  <div class="bg-purple">预期金额:<span class="content">{{customerInfo.applyMoney  || '无'}}</span></div>
                </el-col>-->
              </el-row>
            </div>
            <p class="title_underline">客户绑定信息</p>
            <div style="padding:0 25px;">
              <el-row >
                <el-col :span="6">
                  <div class="bg-purple">营销人:<span class="content">{{customerBindInfo.marketerName  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">营销人电话:<span class="content">{{customerBindInfo.marketerMobile || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">推荐人:<span class="content">{{customerBindInfo.recommendName  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">推荐人账号:<span class="content">{{customerBindInfo.recommendAccount  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">所属团队:<span class="content">{{customerBindInfo.marketerTeam  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">所属门店:<span class="content">{{customerBindInfo.marketerStore   || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">营销人职级:<span class="content">{{customerBindInfo.marketerLevel  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">首次绑定时间:<span class="content">{{customerBindInfo.firstBindMarketerTime  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">解绑时间:<span class="content">{{customerBindInfo.unBindMarketerTime  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">最近绑定时间:<span class="content">{{customerBindInfo.latestBindMarketerTime  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">绑定推荐人时间:<span class="content">{{customerBindInfo.firstBindAgentTime  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">解绑时间:<span class="content">{{customerBindInfo.unBindAgentTime  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">邀请码:<span class="content">{{customerBindInfo.inviteCode  || '无'}}</span></div>
                </el-col>
              </el-row>
              <el-row v-if="productType === 'ded'">
                <!--<el-col :span="6">
                  <div class="bg-purple">首次扫码时间:<span class="content">{{customerBindInfo.scanQRCodeTime  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">二维码来源:<span class="content">{{customerBindInfo.qrCodeFrom  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">账号:<span class="content">{{customerBindInfo.qrAccount  || '无'}}</span></div>
                </el-col>-->
                <el-col :span="6">
                  <div class="bg-purple">经办人:<span class="content">{{customerBindInfo.saleName  || '无'}}</span></div>
                </el-col>

                <el-col :span="6">
                  <div class="bg-purple">经办人电话:<span class="content">{{customerBindInfo.saleMobile  || '无'}}</span></div>
                </el-col>
                <el-col :span="6">
                  <div class="bg-purple">经办人职级:<span class="content">{{customerBindInfo.Level  || '无'}}</span></div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { panelTitle } from 'components';
  import { getOrderDetail,getOrderDetailWld } from '../../service/getOrderInfo';
  import { getQuery } from '../../common/config/myUtils';
  export default{
    data(){
      return {
        loading: false,
        productType:'',
        params:{
          pageNo:1,
          pageSize:10
        },
        total:0,
        auditInfo:{},
        prereviewResults:[],
        orderDetailInfo:{},
        customerInfo:{},
        customerBindInfo:{}
      }
    },

    created(){
      const orderId = getQuery('id');
      this.productType = getQuery('productType') ;
      this.loading = true;
      if(this.productType === 'wld') {
        getOrderDetailWld({
          orderId : orderId,
          productType:this.productType
        }).then(data => {
          this.loading = false;
          this.auditInfo = data.data.auditInfo;   //审核详情
          this.prereviewResults = data.data.o2oOrderPrerviewResult ;  //决策结果
          this.orderDetailInfo = data.data.orderDetailInfo ;    //订单详情
          this.customerInfo = data.data.customerInfo ;          //客户基本信息
          this.customerBindInfo = data.data.customerBindInfo ;  //客户绑定信息
        })
        return ;
      }
      getOrderDetail({
        orderId : orderId,
        productType:this.productType
      }).then(data => {
        this.loading = false;
        this.auditInfo = data.data.auditInfo;   //审核详情
        this.prereviewResults = data.data.o2oOrderPrerviewResult ;  //决策结果
        this.orderDetailInfo = data.data.orderDetailInfo ;    //订单详情
        this.customerInfo = data.data.customerInfo ;          //客户基本信息
        this.customerBindInfo = data.data.customerBindInfo ;  //客户绑定信息
      })
    },
    methods: {


    },
    components: {
      panelTitle
    }
  }
</script>
<style lang="scss" type="text/css" rel="stylesheet/scss">
  .bg-purple {
    // background: #d3dce6;
    border-radius: 4px;
    height: 36px;
    // text-align: center;
    line-height:36px;
    margin-bottom:15px;
    display: flex;
    justify-content: space-between;
    padding-right:5%;
    .content{
      background:#ccc;
      padding:5px 10px;
      border-radius:4px;
      margin-left:20px;
      width:45%;
      display: block;
      line-height:32px;
      overflow: hidden;
    }
  }
  .row_margin {
    margin: 30px 0;
  }
  .title_underline{
    border-bottom:1px solid #20a0ff;
    font-weight:bold;
    text-align:center;
    width:100px;
  }
</style>
