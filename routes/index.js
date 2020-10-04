const express = require('express')
const controller = require('../controllers/index')
const router = express.Router()

router.get('/', controller.getPage)
router.post('/', controller.createMessage)


module.exports = router
