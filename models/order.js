
//when using sequelize

const Sequelize = require('sequelize');

const sequelize = require('../util/database');

//this is to create a model. (which in a way is a table in db with the name users (will add 's' to the name given)) 
const Order = sequelize.define('order', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true
      }
    });
    
    module.exports = Order;