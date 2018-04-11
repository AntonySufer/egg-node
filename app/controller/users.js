'use strict';

const Controller = require('egg').Controller;
const Parameter = require('parameter');
const Check = new Parameter(); //自定义的验证插件 https://www.cnblogs.com/adobe-lin/p/7298766.html
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
  async loginSumit() {
        //默认user录入进来 /user

        const {ctx,service} = this;
        const createRule = {
          account: { type: 'string' },
          pwd: { type: 'string' },
        };
       var error = Check.validate(createRule, ctx.request.body);

      if(error){
           await ctx.redirect('/login', {userError:'请填写正确的账号信息'});
       }else{
          const result = await service.userService.loginCheck();//开始 登陆判断
          if (result.state !=200){
              await ctx.redirect('/login');
          }else{
              //存session
              ctx.session.userId =result.id;
              ctx.session.account =result.account;
              ctx.session.nick_name =result.nick_name;
              await ctx.redirect('/');
          }
         // ctx.body = result;
      }

    }

}

module.exports = UserController;
