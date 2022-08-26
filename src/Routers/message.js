const express = require('express')
const controller = require('../Controllers/message.js')

const router = express.Router()

router.get('/message', controller.GET)




module.exports = router