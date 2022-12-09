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
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Name is Required"
        },
        notEmpty:{
          msg: "Name is Required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Password is Required"
        },
        notEmpty:{
          msg: "Password is Required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        notNull:{
          msg: "Email is Required"
        },
        notEmpty:{
          msg: "Email is Required"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Role is Required"
        },
        notEmpty:{
          msg: "Role is Required"
        }
      }
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