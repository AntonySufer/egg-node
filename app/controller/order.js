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
            good_code: { type: 'string' },
            tel_phone: { type: 'string' },
        };

        let error = Check.validate(createRule,ctx.request.body);
        if(error){
            ctx.body = error;
        }else{
            const results = await service.orderService.orderPayMent();
            if (results.state != 200){
                ctx.body = results;
                return ;
            }
             ctx.status  = 200;
             ctx.body = results;
        }

    }

    /**
     * 订单支付
     * @returns {Promise.<void>}
     */
    async orderPay() {
        //默认user录入进来 /user
        const {ctx,service} = this;
        const createRule = {
            pay_type: { type: 'string' },
            order_id: { type: 'string' }
        };

        let error = Check.validate(createRule,ctx.request.body);
        if(error){
            ctx.body = error;
        }else{
            const results = await service.orderService.updateOrder();
            if (results.state !== 200){
                ctx.body = results;
                return ;
            }

            ctx.status  = 200;
            ctx.body = results;
        }

    }



}

module.exports = OrderController;
