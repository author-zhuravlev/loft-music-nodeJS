const express = require('express')
const upload = require('../middleware/upload')
const controller = require('../controllers/admin')
const { isAdmin } = require('../middleware/setCookie')
const router = express.Router()

router.get('/admin', isAdmin, controller.getPage)
router.post('/admin/upload', upload.single('photo'), controller.uploadGoods)
router.post('/admin/skills', controller.createUserSkills)

module.exports = router


