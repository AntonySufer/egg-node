'use strict';
const sequelizeConfig = require('./config.sequelize');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_yugb-123456';
  // add your config here
  config.middleware = [];
  config.sequelize = sequelizeConfig; //数据连接

  config.view = {  //采用官方模板
        defaultViewEngine: 'ejs',
        mapping: {
            '.ejs': 'ejs',
        }
   };

  // config.logger = {  //关闭所有打印到终端的日志：
  //       consoleLevel: 'NONE',
  //   };
    config.onerror ={
        // 线上页面发生异常时，重定向到这个页面上
        errorPageUrl: '/error.html'
    };
    config.notfound ={
        // 线上页面发生异常时，重定向到这个页面上
        pageUrl: '/404.html'
    };

    config.middleware = [ 'errorHandler' ],
            // 只对 /api 前缀的 url 路径生效
    config.errorHandler= {
             match: '/user',
    };

  return config;
};
