/**
 * Created by yidian on 2018/3/30.
 *
 * 工具类
 */

class PgSql {
    constructor(ctx,){
       this.ctx =ctx;
       this.db = this.ctx.model;
    }

    /***
     * 查询数据方法
     * @returns {Promise.<void>}
     */
    async query(sql) {
        let  _this = this ;
        let resultVo ={}; //放回结果
        try {
            let result = await   _this.db.query(sql);
            resultVo.state ='200';
            resultVo.sucMsg ='成功';
            if (resultVo.length != 1){

                let command =result[1].command;
                 if (command ==='SELECT'){
                     resultVo.rowCount =result[1].rowCount;
                     resultVo.rowsList =result[1].rows;
                 }else if (command ==='UPDATE'){
                     result.rowCount = result[1].rowCount;
                 }else if(command ==='INSERT'){
                     result.rowCount = result[1].rowCount;
                 }
                 //commit  begin close 等

            }else{
                resultVo.dataList = [];
            }

        }catch (e){
            resultVo.state = '400';
            resultVo.errMsg = e.SequelizeDatabaseError;
            resultVo.sql = sql ;

        }
        console.log( result[1]);
        return result;

    }

}

module.exports = PgSql;
