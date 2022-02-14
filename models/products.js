const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');

const Product = db.define('Product', {
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name_product:{
        type: DataTypes.STRING,

    },
    price_product:{
        type: DataTypes.STRING
    },
    detail_product:{
        type: DataTypes.STRING,
    },
    type1_product:{
        type: DataTypes.STRING,
    },
    type2_product:{
        type: DataTypes.STRING,
    },
    image_product:{
        type: DataTypes.STRING,
    },
    status_product:{
        type: DataTypes.STRING,
    },
    id_user:{
        type: DataTypes.INTEGER,
    },
});
db.sync()

module.exports = Product;