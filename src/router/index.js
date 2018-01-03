import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress' //进度条插件
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404';

//账号管理
import loginComponent from 'pages/user/login';
import changePasswordComponent from 'pages/user/changePassword';


//base table
import baseTableComponent from 'pages/table/base'
//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'
//accountQuery
import accountQueryComponent from 'pages/accountManagement/accountQuery'
//customerQuery
import customerQueryComponent from 'pages/accountManagement/customerQuery'
//saleQuery
import saleQueryComponent from 'pages/accountManagement/saleQuery'
//saleInfoChange
import saleInfoChangeComponent from 'pages/accountManagement/saleInfoChange'
//recommendedClients
import recommendedClientsComponent from 'pages/accountManagement/recommendedClients'
//storeQuery
import storeQueryComponent from 'pages/storeManagement/storeQuery'
//storeAdd
import storeAddComponent from 'pages/storeManagement/storeAdd'
//storeInfoChange
import storeInfoChangeComponent from 'pages/storeManagement/storeInfoChange'
//complaintAndSuggestQuery
import complaintAndSuggestQueryComponent from 'pages/complaintManagement/complaintAndSuggestQuery'

/**********************************************orderQuery************************************************ */
//orderManagement
import orderManagementComponent from 'pages/orderQuery/orderManagement';
import wldOrderManagementComponent from 'pages/orderQuery/wldOrderManagement';
//orderInfo
import orderInfoComponent from 'pages/orderQuery/orderInfo';
//editZJS
import editZJSComponent from 'pages/orderQuery/editZJS';

//signature_history_Query
import signature_history_QueryComponent from 'pages/signatureManagement/signature_history_Query';
//signatureCheck
import signatureCheckComponent from 'pages/signatureManagement/signatureCheck';

//基础数据维护
import basicDataMaintenanceComponent from 'pages/systemManagement/basicDataMaintenance';
import authManagementComponent from 'pages/systemManagement/authManagement';

//contractedMoney
import contractedMoneyComponent from 'pages/dataAnalysis/contractedMoney'
//tendencyChart
import tendencyChartComponent from 'pages/dataAnalysis/tendencyChart'
//customerDistribution
import customerDistributionComponent from 'pages/dataAnalysis/customerDistribution'
//customerProfiling
import customerProfilingComponent from 'pages/dataAnalysis/customerProfiling'
//channelProfiles
import channelProfilesComponent from 'pages/dataAnalysis/channelProfiles'

import customerManagementComponent from 'pages/customerManagement/customerManagement'

import operationDataComponent from 'pages/operation/operationData';
import richTextEditorComponent from 'pages/operation/richTextEditor';
import websocketComponent from 'pages/operation/websocket';
Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/login',
  name: 'login',
  component: loginComponent
}, {
    path: '*',
    redirect: '/404'
}, {
    path: '/404',
    name: 'notPage',
    component: noPageComponent
},{
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  },{
    path: '/user/changePassword',
    name: 'changePassword',
    component: changePasswordComponent,
    meta: {
      title: "修改密码",
      auth: true
    }
  }, {
    path: '/operation/operationData',
    name: 'operationData',
    component: operationDataComponent,
    meta: {
      title: "运营管理",
      auth: true
    }
  }, {
    path: '/operation/richTextEditor',
    name: 'richTextEditor',
    component: richTextEditorComponent,
    meta: {
      title: "文本编辑",
      auth: true
    }
  },{
    path: '/operation/websocket',
    name: 'websocket',
    component: websocketComponent,
    meta: {
      title: "即时通讯",
      auth: true
    }
  }, {
    path:'/customerManagement',
    name:'customerManagement',
    component:customerManagementComponent,
    meta: {
      title: "用户信息管理",
      auth: true
    }
  },{
    path: '/table/base',
    name: 'tableBase',
    component: baseTableComponent,
    meta: {
      title: "基本表格",
      auth: true
    }
  }, {
    path: '/table/sort',
    name: 'tableSort',
    component: sortTableComponent,
    meta: {
      title: "排序表格",
      auth: true
    }
  }, {
    path: '/table/update/:id',
    name: 'tableUpdate',
    component: saveTableComponent,
    meta: {
      title: "数据修改",
      auth: true
    }
  }, {
    path: '/table/add',
    name: 'tableAdd',
    component: saveTableComponent,
    meta: {
      title: "添加数据",
      auth: true
    }
  }, {
    path: '/charts/bar',
    name: 'chartsBar',
    component: barChartsComponent,
    meta: {
      title: "柱状图表",
      auth: true
    }
  },
    {
      path: '/accountManagement/accountQuery',
      name: 'accountQuery',
      component: accountQueryComponent,
      meta: {
        title: "账户管理",
        auth: true
      }
    },
    {
      path: '/accountManagement/customerQuery',
      name: 'customerQuery',
      component: customerQueryComponent,
      meta: {
        title: "客户信息查询",
        auth: true
      }
    }, {
      path: '/accountManagement/saleQuery',
      name: 'saleQuery',
      component: saleQueryComponent,
      meta: {
        title: "销售信息查询",
        auth: true
      }
    }, {
      path: '/accountManagement/saleInfoChange/:loginAccount',
      name: 'saleInfoChange',
      component: saleInfoChangeComponent,
      meta: {
        title: "销售信息修改",
        auth: true
      }
    }, {
      path: '/accountManagement/recommendedClients/:loginAccount',
      name: 'recommendedClients',
      component: recommendedClientsComponent,
      meta: {
        title: "关联客户信息",
        auth: true
      }
    }, {
      path: '/storeManagement/storeQuery',
      name: 'storeQuery',
      component: storeQueryComponent,
      meta: {
        title: "门店查询",
        auth: true
      }
    }, {
      path: '/storeManagement/storeAdd',
      name: 'storeAdd',
      component: storeAddComponent,
      meta: {
        title: "门店添加",
        auth: true
      }
    }, {
      path: '/storeManagement/storeInfoChange/:storeId',
      name: 'storeInfoChange',
      component: storeInfoChangeComponent,
      meta: {
        title: "门店修改",
        auth: true
      }
    }, {
      path: '/orderQuery/orderManagement',
      name: 'orderManagement',
      component: orderManagementComponent,
      meta: {
        title: "订单查询",
        auth: true
      }
    }, {
      path: '/orderQuery/orderInfo',
      name: 'orderInfo',
      component: orderInfoComponent,
      meta: {
        title: "贷贷看订单详情",
        auth: true
      }
    }, {
      path: '/orderQuery/wldOrderManagement',
      name: 'wldOrderManagement',
      component: wldOrderManagementComponent,
      meta: {
        title: "维粒贷订单管理",
        auth: true
      }
    },{
      path: '/orderQuery/editZJS',
      name: 'editZJS',
      component: editZJSComponent,
      meta: {
        title: "修改转介绍关系",
        auth: true
      }
    }, {
      path: '/signatureManagement/signature_history_Query',
      name: 'signature_history_Query',
      component: signature_history_QueryComponent,
      meta: {
        title: "历史信息查询",
        auth: true
      }
    }, {
      path: '/signatureManagement/signatureCheck',
      name: 'signatureCheck',
      component: signatureCheckComponent,
      meta: {
        title: "签名审核",
        auth: true
      }
    }, {
      path: '/complaintManagement/complaintAndSuggestQuery',
      name: 'complaintAndSuggestQuery',
      component: complaintAndSuggestQueryComponent,
      meta: {
        title: "投诉与建议查询",
        auth: true
      }
    }, {
      path: '/systemManagement/basicDataMaintenance',
      name: 'basicDataMaintenance',
      component: basicDataMaintenanceComponent,
      meta: {
        title: "基础数据维护",
        auth: true
      }
    },{
      path: '/systemManagement/authManagement',
      name: 'authManagementComponent',
      component: authManagementComponent,
      meta: {
        title: "系统权限管理",
        auth: true
      }
    }, {
      path: '/dataAnalysis/contractedMoney',
      name: 'contractedMoney',
      component: contractedMoneyComponent,
      meta: {
        title: "签约金额",
        auth: true
      }
    }, {
      path: '/dataAnalysis/tendencyChart',
      name: 'tendencyChart',
      component: tendencyChartComponent,
      meta: {
        title: "趋势图",
        auth: true
      }
    }, {
      path: '/dataAnalysis/customerDistribution',
      name: 'customerDistribution',
      component: customerDistributionComponent,
      meta: {
        title: "客户分布",
        auth: true
      }
    }, {
      path: '/dataAnalysis/customerProfiling',
      name: 'customerProfiling',
      component: customerProfilingComponent,
      meta: {
        title: "客户概况",
        auth: true
      }
    }, {
      path: '/dataAnalysis/channelProfiles',
      name: 'channelProfiles',
      component: channelProfilesComponent,
      meta: {
        title: "渠道概况",
        auth: true
      }
    }]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
});

//全局路由配置
//路由开始之前的操作
// router.beforeEach((to, from, next) => {
//   NProgress.done().start()
//   let toName = to.name
//   // let fromName = from.name
//   let is_login = store.state.user_info.login
//
//   if (!is_login && toName !== 'login') {
//     next({
//       name: 'login'
//     })
//   } else {
//     if (is_login && toName === 'login') {
//       next({
//         path: '/'
//       })
//     } else {
//       next()
//     }
//   }
// })
//
// //路由完成之后的操作
// router.afterEach(route => {
//   NProgress.done()
// })

export default router
