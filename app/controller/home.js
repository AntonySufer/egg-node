'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
      let _ctx = this.ctx;
     // const result = await this.ctx.model.User.findAll();
      let dataList =  await _ctx.service.index.list();
      this.ctx.body = dataList;
  }
  async list() {
      let _ctx = this.ctx;
      let  page = _ctx.query.page ||1;
      let dataList =  await _ctx.service.index.list(page);
      await _ctx.render('./list.ejs',{data:dataList} );
  }
}

module.exports = HomeController;
