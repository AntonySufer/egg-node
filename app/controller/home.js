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
            const results = await ctx.model.Goods.findAll({sel});
            await this.ctx.render('./index.ejs', {"data": results});
        }

    }

    async login() {
        await this.ctx.render('./login.ejs', {userError:''});
    }

    async user() {
        await this.ctx.render('./user.ejs', {data:'yidain'});
    }

    /**
     * 订单详情页
     * @returns {Promise.<void>}
     */
    async orderDetail() {
         const {ctx,service} = this;
        const createRule = {
            order_id: { type: 'string' }
        };
        let error = Check.validate(createRule, ctx.query);
        if(error) {
            ctx.body = error;
            ctx.status = 422;
            return ;
        }

        const results = await service.orderService.orderDeatil();
        if(results.state !==200) {
            ctx.body = error;
            ctx.status = 422;
            return ;
        }
        await ctx.render('./order_detail.ejs', {"data":results.orderInfo});
    }

}

module.exports = HomeController;
