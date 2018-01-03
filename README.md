### 项目技术架构

*  vue-cli
*  vue
*  axios
*  vue-router
*  vuex
*  font-awesome
*  element-ui
*  scss
*  webpack
*  echarts
***
### 安装
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))
```
npm install
```
启动服务: (http://localhost:8118)
```
npm run dev //本地开发环境
```
发布代码
```
npm run test //测试环境
npm run build   //铲铲环境
```
***
### 目录结构
<pre>
├── build                     // 项目的 Webpack 配置文件
├── config                    // 项目配置目录
├── server                    // 项目开发的请求数据
├── src                       // 生产目录
│   ├── assets                // 一些资源文件
│   ├── common                // 通用文件、如工具类、状态码
│   ├── components            // 各种组件
│   ├── pages                 // 各种页面
│   ├── plugins               // 各种插件
│   ├── router                // 路由配置及map
│   ├── store                 // Vuex 状态管理器
│   ├── App.vue               // 根组件
│   ├── favicon.ico           // ico小图标
│   ├── index.html            // 项目入口文件
│   ├── main.js               // Webpack 编译入口文件，入口js
├── static                    // 静态资源，一般把不需要处理的文件可以放这里
├── .babelrc                  // babelrc配置文件
├── .editorconfig             // 代码风格文件，前提是要你的编辑器支持
├── .gitignore                // 用于Git配置不需要加入版本管理的文件
├── .postcssrc.js             // autoprefixer的配置文件
├── package.json              // 项目配置文件
</pre>
***
### 页面结构(pages/app.vue)
##### 左边菜单栏 path:components/leftSlide
##### 上部导航栏 path:components/headerSection
##### 主要内容部分 path:components/mainContent(路由跳转)
***

### 前后端数据交互：axios
##### src/api/axios.js(请求统一封装)
##### src/service/getData.js (具体接口存放地址)
***
### 环境变量配置(通过执行不同的脚本命令改变环境变量)
##### src/api/env.js
***
### 路由配置
##### src/router/index.js
***
### 结束


