'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks ={  //官方模板
    enable: false,
    package: 'egg-view-nunjucks'
};
exports.ejs = {  //ejs 模板
    enable: true,
    package: 'egg-view-ejs'
};

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}
exports.security = {
    enable: false
};