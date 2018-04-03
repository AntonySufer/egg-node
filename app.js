
/**
 * Created by sufer on 2018/3/30.
 */


module.exports = app => {
    app.beforeStart(async function () {

        await app.model.sync({ force: false }); // false 为不覆盖 true会删除再创建表
    });

    app.on('request', ctx => {
        //请求都会经过
    });
};