const express = require('express')
const router = express.Router()
const userControllers = require('../controller/userControllers')



router.get('/', userControllers.showHome)



module.exports = router