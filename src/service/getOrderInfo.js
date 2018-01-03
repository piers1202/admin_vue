/**
 * Created by huyongyong1992 on 2017/12/18.
 * 订单信息查询
 */

import { getInfo } from '../api/axios';
const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://10.160.10.50:6600/api/management' : 'https://o2o-management.vcredit.com/admin/management' ;

/**
 * 查询贷贷看所有用户的订单信息
 */
export const  searchOrderInfo = (params)=>getInfo(apiBaseUrl+'/orders/query',params,'post');

/**
 * 查询维立贷所有用户的订单信息
 */
export const  searchOrderInfoWld = (params)=>getInfo(apiBaseUrl+'/orders/query/wld',params,'post');

/**
 * 贷贷看获取身份证信息
 * @param {idcard versionNo productType} params
 */
export const  getIdcardImage = (params)=>getInfo(apiBaseUrl+'/orders/creditAuthInfo',params,'post');

/**
 *  维立贷获取身份证信息
 * @param {idcard versionNo productType} params
 */
export const  getIdcardImageWld = (params)=>getInfo(apiBaseUrl+'/orders/creditAuthInfo/wld',params,'post');
/**
 * 获取维立贷借据
 * @param {*} params
 */
export const wldDebtImg = (params) => getInfo(apiBaseUrl + '/orders/checklondWechatIou/'+params.orderId,{},'get');

/**
 * 贷贷看关单操作
 * @param {*} params
 */
export const closeOrder = (params) => getInfo(apiBaseUrl + '/orders/closeOrder',params,'post');
/**
 * 维粒贷关单操作
 * @param {*} params
 */
export const closeOrderWld = (params) => getInfo(apiBaseUrl + '/orders/closeOrder/wld',params,'post');

/**
 * 订单详情
 * @param { 订单号 } orderId
 */
export const getOrderDetail = (params) => getInfo(apiBaseUrl + '/orders/orderDetails',params,'post')

/**
 * 维立贷订单详情
 * @param { 订单号 } orderId
 */
export const getOrderDetailWld = (params) => getInfo(apiBaseUrl + '/orders/orderDetails/wld',params,'post')

/**
 * 维立贷客户信息查询
 * @param{}customerAccount,dateStart,dateEnd
 */
// export const  customerQueryWld = (params) => getInfo(apiBaseUrl+'/customers/query/wld','post');

/**
 * 贷贷看修改订单信息
 */
export const  editCustomerInfo = (params) => getInfo(apiBaseUrl+'/orders/editOrder',params,'post');

/**
 * 维立贷修改订单信息
 */
export const  editCustomerInfoWld = (params) => getInfo(apiBaseUrl+'/orders/editOrder/wld',params,'post');
