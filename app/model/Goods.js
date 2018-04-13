'use strict';
/**
 * Created by sufer on 2018/3/30.
 * 商品表 model
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
    const M_Goods = app.model.define('m_goods', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        goods_num :{
            type: STRING(50),
            allowNull: false,
            comment:'商品编号'
        },
        goods_name: {
            type: STRING(100),
            allowNull: true,
            comment:'商品名'
        },
        goods_price: {
            type:NUMERIC(23,4),
            allowNull: false,
            defaultValue:0,
            comment:'商品价格'
        },
        goods_denom: {
            type:NUMERIC(23,4),
            allowNull: true,
            comment:'商品面额'
        },
        goods_type: {
            type:STRING(20),
            allowNull: true,
            comment:'商品类别'
        },
        readme_text: {
            type:TEXT,
            allowNull: true,
            comment:'说明'
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
        tableName: 'm_goods',
        comment:'商品表',
        timestamps: false
    });


    return M_Goods;
};