/**
 * Created by sufer on 2018/3/30.
 * 首页信息
 */
const Service = require('egg').Service; //固定语法  sevice 层
const PgSql = require('../func/PgSql');
class NewsService extends Service {
    constructor(ctx){
        super(ctx); // 调用父类的constructor()
        const { query, model } = ctx; //获取入参和模型实例
        this.query =query;
        this.db =model;
        this.data={};


    }
    async list() {
        var  pgdb= new PgSql(this.ctx);
       // var  sql = `select * from m_user`;
       // var  sql = `UPDATE m_user set name ='我的天' `;
        var  sql = `COMMIT`;
        var  result = await  pgdb.query(sql);

         return result;

    }
}

module.exports = NewsService;
