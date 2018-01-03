/**
 * Created by huyongyong1992 on 2017/6/27.
 */
import { getInfo } from '../api/axios';

const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://10.160.10.50:6600/api/management' : 'https://o2o-management.vcredit.com/admin/management' ;
const ddkApiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://ddk-dev.vcredit.com/o2o/platform/api' : 'https://ddk-api.vcredit.com' ;
            /****************************************************账号管理模块************************************************************ */
/**
 * 登录接口
 * @param { } username,password
 */
export const  login = (params) => getInfo(apiBaseUrl+'/security/login/management', params,'post');
export const  logout = (params) => getInfo(apiBaseUrl+'/security/logout/management', params,'get');
export const  changePassword = (params) => getInfo(apiBaseUrl+'/users/password', params,'post');
export const  getPermissions = (params) => getInfo(apiBaseUrl+'/users/permissions', {},'get');

          /****************************************************公共模块************************************************************ */
/**
 *初始化分部信息列表
 * @param{}
 */
export const loadBranchData = () =>getInfo(apiBaseUrl+'/sales/query/saleOrganizations',{},'get');

/**
 * 维立贷数据字典：职业类别&订单状态
 */
export const getWldDictionaries = () => getInfo(apiBaseUrl + '/common/query/wldDictionary',{},'get');
/**
 * 查询分部-销售部-城市信息
 */
export const searchBranchDepartment = () => getInfo(apiBaseUrl+'/common/query/dictionary/store',{},'get');

/**
 * 查询订单状态列表
 */
export const getOrderStepList = () => getInfo(apiBaseUrl+'/common/query/dictionary/orderstep',{},'get');

/**
 * 门店-团队-销售查询
 */
export const searchBySaleMan = (params) => getInfo(apiBaseUrl+'/common/query/sale',params,'post');



/*****************************************************签名审核********************************************************** */
/**
 * 获取签名列表
 * @param { } idcard:'',startTime:'',pageNo:1,pageSize:10,endTime:'',orderId:'',auditStatus:2,productType:'wld'
 */
export const getSignInfoList = (params) => getInfo(apiBaseUrl + '/orders/query/signature/list',params,'post');

/**
 * 审核签名
 * @param { }
 */
export const sumitAuditSign = (params) => getInfo(apiBaseUrl + '/orders/signature/ManualAudit',params,'post');

/*****************************************************基础数据维护********************************************************** */

/**
 * 上传文件
 * @param {*} params
 */
export const uploadFile = (params) => getInfo(ddkApiBaseUrl +'/sales/import?password='+params.password+'&saleType=aaa',params,'post');
/**
 * 获取权限标签列表
 */
export const getAuthTagList = (params) => getInfo(apiBaseUrl +'/common/query/permissions',params,'get');
/**
 * 获取管理员列表
 */
export const getAdministratorList = (params) => getInfo(apiBaseUrl +'/users/query/list',params,'get');
/**
 * 管理 管理员的标签
 * @param { Number } tagId 标签Id
 * @param { String } userId 用户Id
 */
export const ManageAdministratorTags = (params) => getInfo(apiBaseUrl +'/users/permission',params,'post');
/**
 * 新增管理员用户
 * @param { String } loginName
 * @param { String } password
 */
export const onAddUser = (params) => getInfo(apiBaseUrl +'/users/user',params,'post');
/**
 * 禁用用户管理员权限
 * @param { String } uesrId
 */
export const disableUser = (params) => getInfo(apiBaseUrl +'/users/'+params.userId+'/status',{},'post');


/*****************************************************账户管理********************************************************** */
/**
 * 销售信息查询
 * @param {} params
 */

export const getSalesInfo = (params) => getInfo(ddkApiBaseUrl + '/sales/query/list',params,'post');

/**
 * 客户信息查询
 * @param {} params
 */
export const getCustomerInfo = (params) => getInfo(apiBaseUrl + '/customers/query',params,'post');

/*****************************************************门店管理********************************************************** */
/**
 * 获取门店信息
 */
export const getStoreList = (params) => getInfo(ddkApiBaseUrl + '/sales/store/query/list',params,'post');
/**
 * 添加扩展门店
 * @param sourceId,targetCity
 */
export const extendStore = (params) => getInfo(ddkApiBaseUrl + '/sales/store/extendStore',params,'post');

/**
 * 关闭门店
 * @param sourceId,targetCity
 */
export const closeStore = (params) => getInfo(ddkApiBaseUrl + '/sales/store/'+ params.id+'/closing',{},'post');





