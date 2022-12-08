const express = require('express')
const router = express.Router()
const userControllers = require('../controller/userControllers')
const users = require('./users')
const items = require('./items')


router.get('/', userControllers.showHome)
router.get('/register', userControllers.registerForm)
router.post('/register', userControllers.postRegister)

router.get('/login', userControllers.loginForm)
router.post('/login', userControllers.postLogin)


//ke user
router.use('/users', users)

//bycriptjs dan middleware di taruh di tengah tengah sini?

router.use('/items', items)

router.get('/list', userControllers.listItem)


module.exports = router