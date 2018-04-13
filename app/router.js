'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

    //所有get获取 模板资源 等   不采用 restful 规范
    router.get('/', controller.home.index);
    router.get('/login', controller.home.login);
    router.get('/user', controller.home.user);

    router.get('/order', controller.home.orderSeach);
    router.get('/order/pay', controller.home.orderPay);
    //所有post获取接口数据

    // router.post('/user', controller.users.index);
    // router.post('/user/update/:id', controller.users.upateUser);
    // router.post('/user/insert', controller.users.insertUser);
    router.post('/user/loginSumit', controller.users.loginSumit);
    //router.post('/order/prePay', controller.order.prePay);


};


