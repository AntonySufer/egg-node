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

    const { INTEGER, STRING,NUMERIC } = app.Sequelize;
    const User = app.model.define('m_user', {
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
            allowNull: false,
        },
        pwd: {
            type: STRING(100),
            allowNull: false,
        },
        golds: {
            type: NUMERIC(25, 4),
            allowNull: false,
            defaultValue:0
        },
        entry_people: {
            type: STRING(50),
            allowNull: false,
        },
        entry_time: {
            type: STRING(50),
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'm_user',
        timestamps: false,
    });


    return User;
};