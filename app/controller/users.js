'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
      //默认user录入进来 /user
      const _ctx = this.ctx;
      const result = await _ctx.model.User.findAll();
      if (result) {
          this.ctx.body = result;
      }else{
          this.ctx.status = 300;
      }
  }

  async upateUser() {
    //默认user录入进来 /user
    const _ctx = this.ctx;
    const result = await _ctx.service.userService.update();
    this.ctx.body = result;
  }

  async insertUser() {
        //默认user录入进来 /user
        const _ctx = this.ctx;
        const result = await _ctx.service.userService.insert();
        this.ctx.body = result;
  }

}

module.exports = UserController;
