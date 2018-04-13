/**
 * Created by sufer on 2018/3/30.
 * 首页信息 话费充值列表
 */
const Service = require('egg').Service; //固定语法  sevice 层
const PgSql = require('../func/PgSql'); //pg 工具
class homeService extends Service {
    constructor(ctx){
        super(ctx); // 调用父类的constructor()
        const { query,params,request } = ctx; //获取入参和模型实例
        this.query =query;  //  a=xxxx参数模式 获取
        this.params = params ; // /user/:id 模式
        this.request = request.body ; // /form表单来的参数
        this.pgdb= new PgSql(ctx);


    }


}

module.exports = homeService;
