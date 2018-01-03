<template>
  <div class="left-side" :class="{'fold':isFold}">
    <div style="height:50px;"></div>
    <div class="left-body" v-show="isSpread">
      <div class="left-side-inner">
        <el-menu
          class="menu-box"
          theme="dark"
          router
          :default-active="$route.path">
          <div
            v-for="(item, index) in nav_menu_data"
            :key="index">
            <el-menu-item
              class="menu-list"
              v-if="typeof item.child === 'undefined'"
              :index="item.path">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </el-menu-item>
            <el-submenu
              :index="item.path"
              v-else>
              <template slot="title">
                <i class="icon fa" :class="item.icon"></i>
                <span v-text="item.title" class="text"></span>
              </template>
              <el-menu-item
                class="menu-list"
                v-for="(sub_item, sub_index) in item.child"
                :index="sub_item.path"
                :key="sub_index">
                <img class="two_03" src="../../components/leftSlide/images/two_03.png" />
                <img class="two_06" src="../../components/leftSlide/images/two_06.png" />
                <span v-text="sub_item.title" class="text"></span>
              </el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </div>
    </div>
    <div
      class="foldbar"
      :class="{'foldWidth':isFold}">
      <img class="imgUnfold"  @click="fold()" :class="{'imgFold':isFold}"
           :src="isFold?img1:img2"
      >
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    data(){
      return {
        isSpread:true,
        isFold:false,
        isLeft:true,
        img1: require('./images/right2.png'),
        img2: require('./images/left2.png'),
        nav_menu_data: [
          {
            title: "主页",
            path: "/home",
            icon: "fa-home"
          },
//          {
//          title: "表格管理",
//          path: "/table",
//          icon: "fa-table",
//          child: [{
//            title: "基本表格",
//            path: "/table/base"
//          }, {
//            title: "排序表格",
//            path: "/table/sort"
//          }]
//        },
          // {
          //   title: "图表管理",
          //   path: "/charts",
          //   icon: "fa-bar-chart-o",
          //   child: [{
          //     title: "柱状图表",
          //     path: "/charts/bar"
          //   }]
          // },
          // {
          //   title: "用户管理",
          //   path: "/customerManagement",
          //   icon: "fa-table",

          // },
          {
          title: "门店管理",
          path: "/storeManagement",
          icon: "fa-home",
          child: [
            {
              title: "门店查询",
              path: "/storeManagement/storeQuery"
            },
            // {
            //   title: "门店添加",
            //   path: "/storeManagement/storeAdd"
            // }
          ]
        },
        {
          title: "账户管理",
          path: "/accountManagement",
          icon: "fa-user",
          child: [{
            title: "员工信息查询",
            path: "/accountManagement/saleQuery"
          },{
            title: "客户信息查询",
            path: "/accountManagement/customerQuery"
          },
          // {
          //   title: "账户管理",
          //   path: "/accountManagement/accountQuery"
          // }
          ]
        },
        {
          title: "订单管理",
          path: "/orderQuery",
          icon: "fa-file-text-o",
          child: [{
            title: "贷贷看订单管理",
            path: "/orderQuery/orderManagement"
          },{
            title: "维立贷订单管理",
            path: "/orderQuery/wldOrderManagement"
          }]
        },{
          title: "签名管理",
          path: "/signatureManagement",
          icon: "fa-pencil-square-o",
          child: [
            {
              title: "签名审核",
              path: "/signatureManagement/signatureCheck"
            },
            // {
            //   title:"历史信息查询",
            //   path:"/signatureManagement/signature_History_Query"
            // }
          ]
        },
        // {
        //   title: "数据分析",
        //   path: "/dataAnalysis",
        //   icon: "fa-bar-chart-o",
        //   child: [{
        //     title: "签约金额",
        //     path: "/dataAnalysis/contractedMoney"
        //   },{
        //     title: "趋势图",
        //     path: "/dataAnalysis/tendencyChart"
        //   },{
        //     title: "客户分布",
        //     path: "/dataAnalysis/customerDistribution"
        //   },{
        //     title: "客户概况",
        //     path: "/dataAnalysis/customerProfiling"
        //   },{
        //     title: "渠道概况",
        //     path: "/dataAnalysis/channelProfiles"
        //   }]
        // },
        // {
        //   title: "投诉管理",
        //   path: "/complaintManagement",
        //   icon: "fa-comments",
        //   child: [{
        //     title: "投诉与建议查询",
        //     path: "/complaintManagement/complaintAndSuggestQuery"
        //   }]
        // },
        {
          title: "运营相关",
          path: "/operationRelated",
          icon: "fa-bar-chart-o",
          child: [
            {
              title: "运营数据",
              path: "/operation/operationData"
            },
            // {
            //   title: "富文本编辑",
            //   path: "/operation/richTextEditor"
            // },
            {
              title: "websocket",
              path: "/operation/websocket"
            }
          ]
        },
        {
          title: "系统管理",
          path: "/systemManagement",
          icon: "fa-cog",
          child: [{
            title: "基础数据维护",
            path: "/systemManagement/basicDataMaintenance"
          },{
            title: "系统权限管理",
            path: "/systemManagement/authManagement"
          }]
        }
        ]
      }
    },
    methods:{
        fold(){
          this.isSpread=!this.isSpread;
          this.isFold=!this.isFold;
          this.isLeft=!this.isLeft;
          this.$emit('change')
        }
    }
  }
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .main-content {
    // margin-left: 20px;
  }
  .left-side{
      .logo{
        height:100px;
        line-height:100px;
        width:70%;
      }
  }
  .el-submenu__icon-arrow{
    right:30px!important;
  }
  .fold{
    width:20px!important;
  }
  .foldWidth{
    left:0px!important;
  }
  .foldbar{z-index:8887!important}
  .imgUnfold{
    display:block;position:fixed;left:187px;top:50%;width:40px;z-index:8888!important;
    &:hover{
      left:187px;
    }
  }
  .imgFold{
    left:-8px!important;
    &:hover{
      left:-8px!important;
      .fold{
        width:10px;
      }
    }
  }
</style>

