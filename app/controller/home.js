'use strict';

const Controller = require('egg').Controller;
const Parameter = require('parameter');
const Check = new Parameter(); //自定义的验证插件 https://www.cnblogs.com/adobe-lin/p/7298766.html
class HomeController extends Controller {
    async index() {
      //获取 session ;
        const ctx = this.ctx;
        // 获取 Session 上的内容
        if (!ctx.session.userId){
            await this.ctx.render('./login.ejs', {userError:''});
        }else{
            //获取实例参考  https://itbilu.com/nodejs/npm/VJIR1CjMb.html
            let sel = {
                "attributes": ["id", "goods_num", "goods_name", "goods_price", "goods_denom", "goods_type"],
                "where": {"goods_type": "话费"},
                "order": "entry_time ASC"
            };

            let result = await ctx.model.Goods.findAll({sel});
            await this.ctx.render('./index.ejs', {"data": result});
        }



    }

    async login() {
        await this.ctx.render('./login.ejs', {userError:''});
    }

    async user() {
        await this.ctx.render('./user.ejs', {data:'yidain'});
    }

    //订单详情
    async orderSeach() {



        //默认user录入进来 /user
        const {ctx,service} = this;
        console.log(ctx.moment);
        const createRule = {
            good_code: { type: 'string' },
            tel_phone: { type: 'string' },
        };


        let error = Check.validate(createRule, ctx.query);
        if(error){
            ctx.body = error;
        }else{
            let result ={};
            result = await service.orderService.GoodsByCode();//开始 登陆判断
            if (result.state !=200){
                ctx.body = result;
            }else{
                result.goodInfo.tel_phone =ctx.query.tel_phone ;

                await ctx.render('./order_detail.ejs', {data:result.goodInfo});
            }
            // ctx.body = result;
        }

    }

    async orderPay() {
        const {ctx,service} = this;
        const createRule = {
            good_code: { type: 'string' },
            tel_phone: { type: 'string' },
        };



        await ctx.render('./orderPay.ejs', {data:'yidain'});
    }

}

module.exports = HomeController;
