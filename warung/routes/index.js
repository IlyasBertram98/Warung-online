const express = require('express')
const router = express.Router()
const userControllers = require('../controller/userControllers')



router.get('/', userControllers.showHome)
router.get('/register', userControllers.registerForm)
router.post('/register', userControllers.postRegister)

router.get('/login', userControllers.loginForm)

router.get('/list', userControllers.listItem)


module.exports = router