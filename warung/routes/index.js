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

router.use(function(req, res, next){

    if (!req.session.userId) {
        const err = `Login First!`
        res.redirect(`/login?error=${err}`)
        
    } else {
        next()
    }

})

router.get('/logout', userControllers.logout)




router.get('/list', userControllers.listItem)

//ke user
router.use('/users', users)



router.use('/items', items)




module.exports = router