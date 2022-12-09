const express = require('express')
const userController = require('../controller/userControllers')
const router = express.Router()



router.get('/', userController.showUserProfile)

router.get('/add', userController.showAddUserProfile)

router.post('/add', userController.postAddUserProfile)

module.exports = router