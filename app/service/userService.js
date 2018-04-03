/**
 * Created by sufer on 2018/3/30.
 * 首页信息
 */
const Service = require('egg').Service; //固定语法  sevice 层
const PgSql = require('../func/PgSql'); //pg 工具
class NewsService extends Service {
    constructor(ctx){
        super(ctx); // 调用父类的constructor()
        const { query,params } = ctx; //获取入参和模型实例
        this.query =query;  //  a=xxxx参数模式 获取
        this.params = params ; // /user/:id 模式
        this.pgdb= new PgSql(ctx);


    }
    async update() {
        let data={};
        let  sql = `UPDATE m_user set name ='我的天' where id='${this.params.id}'`;
        let  result = await  this.pgdb.query(sql);
        if (result.state !==200 ||  result.rowCount !==1){
            data.state =400;
            data.sucMsg='修改失败';
            return data ;
        }
        data.state =200;
        data.sucMsg='成功';
        return data ;
    }

    async insert() {
        let data={};
        var  sql = `insert into m_user(name) values('我是添加')`;
        var  result = await  this.pgdb.query(sql);
        if (result.state !==200 ||  result.rowCount !==1){
            data.state =400;
            data.sucMsg='修改失败';
            return data ;
        }
        data.state =200;
        data.sucMsg='成功';
        return data ;

    }
}

module.exports = NewsService;
