import { Schema, model } from 'mongoose'

const imageShema = new Schema({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true }, 
  contentType: { type: String, required: true },
})

export default model('Image', imageShema)