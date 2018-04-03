'use strict';
/**
 * Created by sufer on 2018/3/30.
 * 用户 model
 */

module.exports = app => {
    const { INTEGER, STRING } = app.Sequelize;
    const User = app.model.define('m_user', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING(100),
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        tableName: 'm_user',
        timestamps: false,
    });


    return User;
};