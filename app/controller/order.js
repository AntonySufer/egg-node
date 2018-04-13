'use strict';
/**
 * 订单控制
 */
const Controller = require('egg').Controller;
const Parameter = require('parameter');
const Check = new Parameter(); //自定义的验证插件 https://www.cnblogs.com/adobe-lin/p/7298766.html
class OrderController extends Controller {

    /**
     * 订单 下单了  哦
     * @returns {Promise.<void>}
     */
    async prePay() {
        //默认user录入进来 /user
        const {ctx,service} = this;
        const createRule = {
            code: { type: 'string' },
        };


        let error = Check.validate(createRule,ctx.query);
        if(error){
            ctx.body = error;
        }else{

            let  result = await service.orderService.orderPayMent();//开始 登陆判断
            if (result.state !=200){
                ctx.body = result;
            }

             ctx.status  = 200;
             ctx.body = result;
        }

    }


}

module.exports = OrderController;
