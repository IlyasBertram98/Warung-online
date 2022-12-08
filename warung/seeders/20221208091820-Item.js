'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const dataItem = JSON.parse(fs.readFileSync('./data/items.json', 'utf-8')).map(el => {
      el.createdAt = el.updatedAt = new Date()
      delete el.id
      return el
   })
  //  console.log(dataItem);
   return queryInterface.bulkInsert('Items', dataItem)
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Items', null, {});
  }
};
