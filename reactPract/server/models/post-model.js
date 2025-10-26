import { Schema, model} from 'mongoose'

const postSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    text: {type: String, required: true}
})

export default model('Post', postSchema)