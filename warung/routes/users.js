const express = require('express')
const router = express.Router()
const userControllers = require('../controller/userControllers')


router.get('/', userControllers.showLogin)

router.post('/', userControllers.postLogin)

router.get('/register', userControllers.showRegister)



module.exports = router