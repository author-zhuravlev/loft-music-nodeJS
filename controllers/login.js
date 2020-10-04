const bcrypt = require('bcryptjs')
const config = require('config')
const Admin = require('../models/Admin')
const messageHandler = require('../utils/messageHandler')

module.exports.getPage = (req, res) => {
  res.render('login', { messages: req.flash('info') })
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  const isAdmin = await Admin.find()

  if (!isAdmin.length) {
    const salt = bcrypt.genSaltSync(10)
    const admin = new Admin({
      email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await admin.save()
      req.session.isAdmin = true
      res.redirect('admin')
    } catch (err) {
      messageHandler('/login', req, res, err)
    }
  } else {
    const admin = await Admin.findOne({ email })

    if (admin && bcrypt.compareSync(password, admin.password)) {
      req.session.isAdmin = true
      res.redirect('admin')
    } else {
      messageHandler('/login', req, res, config.get('infoMessages').errorAuth)
    }
  }
}
