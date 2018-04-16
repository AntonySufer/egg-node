'use strict';
/**
 * Created by sufer on 2018/3/30.
 * 用户 model
 *
 type字段数据类型（sequlize。...{ DECIMAL: [Object],
        BLOB: [Object],
        STRING: [Object],
        CHAR: [Object],
        TEXT: [Object],
        SMALLINT: [Object],
        INTEGER: [Object],
        BIGINT: [Object],
        BOOLEAN: [Object],
        DATE: [Object],
        DATEONLY: [Object],
        REAL: [Object],
        'DOUBLE PRECISION': [Object],
        FLOAT: [Object],
        GEOMETRY: [Object],
        GEOGRAPHY: [Object],
        HSTORE: [Object],
        RANGE: [Object],
        ENUM: [Object] },）
 allowNull（是否允许为空true，false）
 autoIncrement（自增，true，false）
 unique（唯一性，true，false，string）
 comment（解释说明）
 primaryKey（对主键的设置，true，false）
 defaultValue（默认值的设置）
 字段
 */


module.exports = app => {

    const { INTEGER, STRING,NUMERIC,TEXT } = app.Sequelize;
    const M_Order = app.model.define('m_order', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        account: {
            type: STRING(23),
            allowNull: false,
        },
        nick_name: {
            type: STRING(23),
            allowNull: true,
        },
        goods_name: {
            type: STRING(100),
            allowNull: true,
        },
        bill_phone: {
            type: STRING(50),
            allowNull: true
        },
        goods_price: {
            type:NUMERIC(23,4),
            allowNull: false,
            defaultValue:0,
            comment:'商品价格'
        },
        out_trade_no: {
            type:STRING(50),
            allowNull: false,
            unique:true,
            comment:'商户订单号'
        },
        trade_no: {
            type:STRING(50),
            allowNull: false,
            unique:true,
            comment:'支付订单号'
        },
        pay_type: {
            type: STRING(50),
            allowNull: true,
            comment:'支付类型'
        },
        pay_state: {
            type: STRING(50),
            allowNull: true,
            comment:'支付状态'
        },
        pay_time: {
            type: STRING(50),
            allowNull: true,
            comment:'支付时间'
        },
        readme_text: {
            type:TEXT,
            allowNull: true,
            comment:'说明'
        },
        explain_text: {
            type:TEXT,
            allowNull: true,
            comment:'备注'
        },
        entry_people: {
            type: STRING(50),
            allowNull: false,
        },
        entry_time: {
            type: STRING(50),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: 'm_order',
        timestamps: false
    });


    return M_Order;
};