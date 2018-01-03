/**
 * Created by qiuying on 2017/6/23.
 */
import { Message } from 'element-ui';
/**
 * 登录失效处理
 * @param {*} e
 */
export const errorHandler = (e) => {
  if(e.code === 401) {
    window.location.href = '/#/login';
  }
  Message.error({
    message:e.message,
    center:true
  })
}

/**
 * 日期范围格式化
 * @param {日期范围} dataRange
 */
import moment from 'moment';
export const elementDateFormat = (dateRange) => {
  let startTime = moment(dateRange[0],'YYYY-MM-DD').format().split('T')[0];
  let endTime = moment(dateRange[1],'YYYY-MM-DD').format().split('T')[0];
  return {
    startTime:startTime,
    endTime:endTime
  }
}

/**
 * 获取url ?后面的传值
 */
export const getQuery = (key) => {
  const location = window.location;
  const query = {};
  const params = location.href.split('?')[1] || ''
  if (params) {
    params.split('&').forEach((item) => {
      const queryPair = item.split('=');
      query[queryPair[0]] = queryPair[1];
    });
  }
   const rst = query[key];
  //解码一个编码的 URI。
  return rst ? window.decodeURIComponent(query[key]) : '';
}
