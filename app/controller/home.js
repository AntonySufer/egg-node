'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
      //获取 session ;
        const ctx = this.ctx;
        // 获取 Session 上的内容
        if (!ctx.session.userId){
            await this.ctx.render('./login.ejs', {userError:''});
        }else{
            await this.ctx.render('./index.ejs', {"userName":ctx.session.nick_name});
        }



    }

    async login() {
        await this.ctx.render('./login.ejs', {userError:''});
    }

    async user() {
        await this.ctx.render('./user.ejs', {data:'yidain'});
    }

}

module.exports = HomeController;
