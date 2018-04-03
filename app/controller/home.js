'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
      await this.ctx.render('./index.ejs', {"userName":'yidain'});
    }

    async login() {
        await this.ctx.render('./login.ejs', {});
    }

    async user() {
        await this.ctx.render('./user.ejs', {data:'yidain'});
    }

}

module.exports = HomeController;
