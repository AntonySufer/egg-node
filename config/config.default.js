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


  return config;
};
