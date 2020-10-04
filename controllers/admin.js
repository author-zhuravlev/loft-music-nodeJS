const path = require('path')
const config = require('config')
const Goods = require('../models/Goods')
const Admin = require('../models/Admin')
const messageHandler = require('../utils/messageHandler')

module.exports.getPage = (req, res) => {
  res.render('admin', { messages: req.flash('info') });
}

module.exports.uploadGoods = async (req, res) => {
  const pathToFile = path.join('./assets/img/products/', req.file.filename)

  try {
    const goods = new Goods({
      src: req.file ? pathToFile : '',
      name: req.body.name,
      price: req.body.price
    })
    await goods.save()

    messageHandler('/admin', req, res, config.get('infoMessages').addGoods)
  } catch (err) {
    messageHandler('/admin', req, res, err)
  }
}

module.exports.createUserSkills = async (req, res) => {
  try {
    await Admin.findOneAndUpdate(
      {},
      {
        $set: {
          age: { number: req.body.age || 0, text: 'Возраст начала занятий на скрипке' },
          concerts: { number: req.body.concerts || 0, text: 'Концертов отыграл' },
          cities: { number: req.body.cities || 0, text: 'Максимальное число городов в туре' },
          years: { number: req.body.years || 0, text: 'Лет на сцене в качестве скрипача' }
        }
      },
      {new: true}
    )

    messageHandler('/admin', req, res,  config.get('infoMessages').updateDataSkills)
  } catch (err) {
    messageHandler('/admin', req, res, err)
  }
}
