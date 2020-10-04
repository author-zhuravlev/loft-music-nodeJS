const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goodsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  src: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('goods', goodsSchema)
