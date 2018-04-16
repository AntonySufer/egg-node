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
       var  sql = ` SELECT GOODS_NUM,GOODS_NAME, cast(GOODS_PRICE as decimal(1000,2))  FROM M_Goods where goods_num ='${code}' `;
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
        let checkGood = await  this.GoodsByCode( this.request.good_code);
        if(checkGood.state != '200'){
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

        let ins_sql =`  INSERT INTO m_order ( account, nick_name, goods_name,bill_phone, goods_price, out_trade_no, trade_no,pay_state, entry_people, entry_time)
                  VALUES ( '${account}', '${nick_name}', '${goodsInfo.goods_name}','${this.request.tel_phone}', '${goodsInfo.goods_price}', '${out_trade_no}', '${out_trade_no}','未支付', '系统', '${this.ctx.date}') returning id as order_id  `;


        let resultVo =  await  this.pgdb.query(ins_sql);
        if (resultVo.state !==200 ||  resultVo.rowsList.length ==0 ){
            data.state =400;
            data.sucMsg='查询失败';
            return data ;
        }
        data.order_id = resultVo.rowsList[0].order_id;
        data.state =200;
        data.sucMsg='成功';
        return data ;

    }

    /**
     * 订单详情
     * @returns {Promise.<void>}
     */
    async orderDeatil(order_id){
        let data={};
        order_id = order_id || this.query.order_id ;
        let  sql = ` select A.id,A.account,A,goods_name,A.pay_state,A.bill_phone,cast(A.goods_price as decimal(1000,2)) as goods_price,A.out_trade_no,b.golds from m_order as A  left join m_user as B on A.account =B.account where A.id='${order_id}' `;
        let result =  await  this.pgdb.query(sql);
        if (result.state !==200 ||  result.rowsList.length ==0 ){
            data.state =400;
            data.sucMsg='查询失败';
            return data ;
        }
        data.orderInfo = result.rowsList[0];
        data.state =200;
        data.sucMsg='成功';
        return data ;

    }

    /**
     * 订单支付
     * @returns {Promise.<{}>}
     */
    async updateOrder() {
        let data={};

        //查询这笔订单
        let resu = await this.orderDeatil(this.request.order_id);
        console.log(resu)
        if (resu.state!=200){
            data.state =resu.state;
            data.errMsg ='无此订单';
            return data ;
        }
        let orderInfo = resu.orderInfo ;

        if (orderInfo.pay_state =='已支付'){
            data.state =401;
            data.errMsg ='此订单已支付';
            return data ;
        }


        //查询个人账户时候足够
        let sels = {
            "where": {"account":orderInfo.account}
        };
        let userInfo = await this.ctx.model.User.findOne(sels);
        if (userInfo.length === 0){
            data.state =422;
            data.errMsg ='无会员';
            return data ;
        }


        //判断支付方式
        let pay_type =this.request.pay_type ;
        if(pay_type === 'gold'){
            //判断余额
            if(Number(orderInfo.goods_price) > Number(userInfo.golds)){
                data.state =422;
                data.errMsg ='余额不足';
                return data ;
            }

            //修改余额
            let upSql =` update m_user set golds=golds-${Number(orderInfo.goods_price)} where golds-${Number(orderInfo.goods_price)}>=0 and account='${orderInfo.account}' `;
            let  upResu = await  this.pgdb.query(upSql);
            if (upResu.state !==200 ||  upResu.rowCount !==1){
                data.state =422;
                data.errMsg='修改失败';
                return data ;
            }

        }else if (pay_type === 'alipay'){
            data.state =422;
            data.errMsg ='待开发';
            return data ;
        }else if (pay_type === 'weipay'){
            data.state =422;
            data.errMsg ='待开发';
            return data ;
        }else{
            data.state =422;
            data.errMsg ='支付方式错误';
            return data ;
        }

        let trade_no =userInfo.account +'6666' +(new Date()).valueOf();

        //修改订单
        let  sql = `UPDATE m_order set pay_state ='已支付' , pay_type ='${pay_type}' ,trade_no ='${trade_no}',pay_time ='${this.ctx.date}' where  id='${this.request.order_id}'`;
        let  result = await  this.pgdb.query(sql);
        if (result.state !==200 ||  result.rowCount !==1){
            data.state =422;
            data.errMsg='修改失败';
            return data ;
        }
        data.state =200;
        data.sucMsg='成功';
        return data ;
    }


}

module.exports = orderService;
