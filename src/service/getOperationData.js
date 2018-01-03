/**
 * Created by huyongyong1992 on 2017/12/18.
 */
import { getInfo } from '../api/axios';

const apiBaseUrl = process.env.NODE_ENV === 'development' ? 'http://10.160.10.50:6600/api/management' : 'https://o2o-management.vcredit.com/admin/management' ;

/****************************************运营相关************************************* */
/**
 * 获取贷贷看首页banner列表
 */
export const getDdkHomeBannerList = (params) => getInfo(apiBaseUrl +'/operation/banner/list',{},'get');
/**
 * 上传banner 图片
 * @param {*} params
 */
export const uploadBannerImage = (params) => getInfo(apiBaseUrl +'/common/image/upload',params,'post');
/**
 * 更改banner 信息
 * @param {*} params
 */
export const changeBannerData = (params) => getInfo(apiBaseUrl +'/operation/banner/'+params.id,params,'post');

/**
 * 新增banner
 */
export const addBannerData = (params) => getInfo(apiBaseUrl +'/operation/banner',params,'post');
/**
 * 删除banner
 */
export const deleteBannerData = (params) => getInfo(apiBaseUrl +'/operation/banner/'+params.id+'/delete',params,'post');

/**
 * 获取公告列表
 */
export const getNoticeDataList = (params) => getInfo(apiBaseUrl +'/operation/notice/list',{},'get');
/**
 * 修改公告
 */
export const changeNoticeData = (params) => getInfo(apiBaseUrl +'/operation/notice/'+params.id,params,'post');

/**
 * 新增公告
 */
export const addNoticeData = (params) => getInfo(apiBaseUrl +'/operation/notice',params,'post');
/**
 * 删除消息
 */
export const deleteNoticeData = (params) => getInfo(apiBaseUrl +'/operation/notice/'+params.id+'/delete',params,'post');

/**
 * 获取广告位列表
 */
export const getAdvertisementDataList = (params) => getInfo(apiBaseUrl +'/operation/advertisement/list',{},'get');

/**
 * 修改广告位
 */
export const changeAdvertisementData = (params) => getInfo(apiBaseUrl +'/operation/advertisement/'+params.id,params,'post');

/**
 * 新增广告位
 */
export const addAdvertisementData = (params) => getInfo(apiBaseUrl +'/operation/advertisement',params,'post');
