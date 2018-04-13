/**
 * Created by sufer on 2018/3/30.
 * 订单服务
 */
const Service = require('egg').Service; //固定语法  sevice 层
const PgSql = require('../func/PgSql'); //pg 工具
class orderService extends Service {
    constructor(ctx){
        super(ctx); // 调用父类的constructor()
        const { query,params,request } = ctx; //获取入参和模型实例
        this.query =query;  //  a=xxxx参数模式 获取
        this.params = params ; // /user/:id 模式
        this.request = request.body ; // /form表单来的参数
        this.pgdb= new PgSql(ctx);



    }

    /**
     * 查询 产品详情
     * @returns {Promise.<{}>}
     * @constructor
     */
    async GoodsByCode(code){
        let data={};
        code = code || this.query.good_code ;
       var  sql = ` SELECT GOODS_NUM,GOODS_NAME, cast(GOODS_PRICE as decimal(1000,2))  FROM M_Goods where goods_num ='${this.query.good_code}' `;
        let result =  await  this.pgdb.query(sql);
        if (result.state !==200 ||  result.rowsList.length ==0 ){
            data.state =400;
            data.sucMsg='查询失败';
            return data ;
        }
        data.goodInfo = result.rowsList[0];
        data.state =200;
        data.sucMsg='成功';
        return data ;
    }

    /**
     * 查询 产品详情
     * @returns {Promise.<{}>}
     * @constructor
     */
    async orderPayMent(){
        let data={};
        //判断是否商品存在
        let checkGood = await  this.GoodsByCode();
        if(checkGood.状态 != '200'){
            data.state =400;
            data.sucMsg='查询商品失败';
            return data ;
        }

        let goodsInfo = checkGood.goodInfo; //商品信息

        let account = this.ctx.session.account ;
        let nick_name =this.ctx.session.nick_name;
        if(!account){ //开始下单  获取session中的账户
            data.state =400;
            data.sucMsg='账号缺失';
            return data ;
        }

        let out_trade_no =account +'0000' +(new Date()).valueOf();

        let ins_sql =`  INSERT INTO m_order ( account, nick_name, goods_name, goods_price, out_trade_no, trade_no, "entry_people", "entry_time")
                  VALUES ( '${account}', '${nick_name}', '${goodsInfo.goods_name}', '${goodsInfo.goods_price}', '${goodsInfo.out_trade_no}', '${goodsInfo.out_trade_no}', '系统', '2017-02-15');`;






        var  sql = ` SELECT GOODS_NUM,GOODS_NAME, cast(GOODS_PRICE as decimal(1000,2))  FROM M_Goods where goods_num ='${this.query.good_code}' `;
        let result =  await  this.pgdb.query(sql);
        if (result.state !==200 ||  result.rowsList.length ==0 ){
            data.state =400;
            data.sucMsg='查询失败';
            return data ;
        }
        data.goodInfo = result.rowsList[0];
        data.state =200;
        data.sucMsg='成功';
        return data ;
    }

    // async update() {
    //     let data={};
    //     let  sql = `UPDATE m_user set name ='我的天' where id='${this.params.id}'`;
    //     let  result = await  this.pgdb.query(sql);
    //     if (result.state !==200 ||  result.rowCount !==1){
    //         data.state =400;
    //         data.sucMsg='修改失败';
    //         return data ;
    //     }
    //     data.state =200;
    //     data.sucMsg='成功';
    //     return data ;
    // }


}

module.exports = orderService;
