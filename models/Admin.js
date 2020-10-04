const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Object
  },
  concerts: {
    type: Object
  },
  cities: {
    type: Object
  },
  years: {
    type: Object
  }
})

module.exports = mongoose.model('admin', adminSchema)
