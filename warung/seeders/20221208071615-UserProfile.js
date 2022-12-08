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
   const dataProfile = JSON.parse(fs.readFileSync('./data/userProfiles.json', 'utf-8')).map(el => {
      el.createdAt = el.updatedAt = new Date()
      delete el.id
      return el
   })
   // console.log(dataProfile + "ini profile") ;
   return queryInterface.bulkInsert('UserProfiles', dataProfile)
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('UserProfiles', null, {});
  }
};
