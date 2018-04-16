
/**
 * Created by sufer on 2018/3/30.
 */

const moment = require('moment');
module.exports = app => {
    app.beforeStart(async function () {
        await app.model.sync({ force: false }); // false 为不覆盖 true会删除再创建表
    });

    app.on('request', ctx => {
      ctx.date = moment().format('YYYY-MM-DD HH:mm:ss') ; //时间插件
        //请求都会经过
    });
};