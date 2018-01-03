import axios from 'axios';
import { Message } from 'element-ui';
import { errorHandler } from '../common/config/myUtils'

let fetch = axios.create({
	headers:{'Content-Type': 'application/json'}
})

function json2url(json,accessToken) {
		json.accessToken = accessToken;	//每次请求都带上accessToken
    var arr = [];
    var str = '';
    for (var i in json) {
      str = i + '=' + json[i];
      arr.push(str);
    }
    return arr.join('&');
};
let getInfo = (url='',data={},type='get') =>{
  url = url;
  let accessToken = window.localStorage.getItem('accessToken');

  type=type.toLocaleLowerCase()
  if(type === 'get'){	//对象拼接成字符串
    var params = json2url(data,accessToken);
    return fetch.get(url + '?' + params).then(function (resp) {
      if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
          window.localStorage.setItem('accessToken', resp.data.data.accessToken);
      }
      if(resp.data.error) {
        errorHandler(resp.data)
      }
      return resp.data ;
    }).catch(e => {
      Message.error({
        message:e,
        center:true
      });
    });

  }
  if(type ==='post' ){	//对象拼接成字符串
		var postUrl = url.split("?")[1] ? url.split("?")[0]+"?"+url.split("?")[1]+"&accessToken="+ accessToken : url+"?accessToken="+accessToken;
    return  fetch({
      method:type,
      url:postUrl,
      data:data,
    }).then(function(resp){
        if (resp.data.data && resp.data.data.accessToken) {	//更新accessToken
            window.localStorage.setItem('accessToken', resp.data.data.accessToken);
        }
        if(resp.data.error) {
          errorHandler(resp.data)
        }
        return resp.data ;
    }).catch(e => {
      Message.error({
        message:e,
        center:true
      });
    });
  }

}

export { getInfo }
