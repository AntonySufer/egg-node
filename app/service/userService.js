/**
 * Created by sufer on 2018/3/30.
 * 首页信息
 */
const Service = require('egg').Service; //固定语法  sevice 层
const PgSql = require('../func/PgSql'); //pg 工具
class NewsService extends Service {
    constructor(ctx){
        super(ctx); // 调用父类的constructor()
        const { query,params,request } = ctx; //获取入参和模型实例
        this.query =query;  //  a=xxxx参数模式 获取
        this.params = params ; // /user/:id 模式
        this.request = request.body ; // /form表单来的参数
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

    async loginCheck() {
        let data={};

        var  sql = `SELECT ID,account,nick_name FROM m_user where account='${this.request.account}' and pwd='${this.request.pwd}'  `;
        var  result = await  this.pgdb.query(sql);
        if (result.state !==200 ||  result.rowsList.length ==0){
            data.state =400;
            data.errMsg='新用户请注册';
            return data ;
        }
        data.id =result.rowsList[0].id;
        data.account =result.rowsList[0].account;
        data.nick_name =result.rowsList[0].nick_name;
        data.state =200;
        data.sucMsg='成功';
        return data ;

    }
}

module.exports = NewsService;
