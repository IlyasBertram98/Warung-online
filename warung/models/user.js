'use strict';
const {
  Model
} = require('sequelize');

const bcryptjs = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
      User.hasMany(models.Order)
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    hooks:{
      
      beforeCreate(user, options){

        const salt = bcryptjs.genSaltSync(8);
        const hash = bcryptjs.hashSync(user.password, salt)
        
        user.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};