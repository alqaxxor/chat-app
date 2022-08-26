const express = require('express')
const Controller = require('../Controllers/user.js')

const router = express.Router()

router.get('/users', Controller.GET)
router.get('/users/:profileToken', Controller.GET)

router.post('/login', Controller.LOGIN)
router.post('/register', Controller.REGISTER)


module.exports = router