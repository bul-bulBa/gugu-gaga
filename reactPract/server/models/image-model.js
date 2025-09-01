const {Schema, model} = require('mongoose')

const imageShema = new Schema({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true }, 
  contentType: { type: String, required: true },
})

module.exports = model('Image', imageShema)