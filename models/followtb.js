const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');

const Follows = db.define('Followstb', {
    id_follows: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_user_follow:{
        type: DataTypes.INTEGER,
    },
    
});
db.sync()

module.exports = Follows;