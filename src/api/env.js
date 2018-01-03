/**
 * 配置开发环境和生产环境之间的切换
 * baseUrl: 接口域名地址
 * routerMode: 路由模式
 */
let baseUrl,
    routerMode;

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://10.160.10.50:6600/api/management';
	routerMode = 'hash'
}else{
	baseUrl = 'https://o2o-management.vcredit.com/admin/management';	//生产环境接口baseUrl
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
}
