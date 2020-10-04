const config = require('config')
const nodemailer = require('nodemailer')
const Admin = require('../models/Admin')
const Goods = require('../models/Goods')
const messageHandler = require('../utils/messageHandler')

module.exports.getPage = async (req, res) => {
  const skills = await Admin.findOne().select('age concerts cities years')
  const products = await Goods.find()

  const {
    age = {
      "number": 0,
      "text": "Возраст начала занятий на скрипке"
    },
    concerts = {
      "number": 0,
      "text": "Концертов отыграл"
    },
    cities = {
      "number": 0,
      "text": "Максимальное число городов в туре"
    },
    years = {
      "number": 0,
      "text": "Лет на сцене в качестве скрипача"
    }
  } = skills

  res.render('index', {
    skills: [ age, concerts, cities, years ],
    messages: req.flash('info'),
    products
  })
}

module.exports.createMessage = (req, res) => {
  const mail = config.get('mail')
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return messageHandler('/', req, res, config.get('infoMessages').emptyFields)
  }

  const transporter = nodemailer.createTransport(mail.smtp)
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: mail.smtp.auth.user,
    subject: mail.subject,
    text: `
      ${message.trim()}
      Отправлено с: <${email}>
    `
  }

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      const infoMessage = {
        message: `${ config.get('infoMessages').sendMailError.message } ${err}`
      }
      return messageHandler('/', req, res, infoMessage)
    }
    return messageHandler('/', req, res, config.get('infoMessages').sendMailSucsses)
  })
}
