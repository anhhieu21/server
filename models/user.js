const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');

const User = db.define('User', {
  // Model attributes are defined here

  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  },
  status: {
   type: Sequelize.ENUM("pending", "active"),
   defaultValue: "pending"
  },

});

db.sync()

module.exports = User;