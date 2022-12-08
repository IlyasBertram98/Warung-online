'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.hasMany(models.Order)
    }

    // static searchPrice() {

    //   let find = {}

    //   return Item.max('price')

    //   .then(maxPrice => {

    //     find.maxPrice = maxPrice

    //     return Item.min('price')

    //   })

    //   .then(minPrice => {
    //     find.minPrice = minPrice
    //   })
    // }

  }
  Item.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};