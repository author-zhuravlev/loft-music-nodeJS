const express = require('express')
const controller = require('../controllers/login')
const { isAuthorized } = require('../middleware/setCookie')
const router = express.Router()

router.get('/login', isAuthorized, controller.getPage)
router.post('/login', controller.login)

module.exports = router
