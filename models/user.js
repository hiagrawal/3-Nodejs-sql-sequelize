const Sequelize = require('sequelize');

const sequelize = require('../util/database');

//this is to create a model. (which in a way is a table in db with the name users (will add 's' to the name given)) 
const User = sequelize.define('user', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING
    });
    
    module.exports = User;