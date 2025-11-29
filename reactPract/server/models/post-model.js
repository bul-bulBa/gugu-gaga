import { Schema, model} from 'mongoose'

const replySchema = new Schema({
    userId: {type: Schema.Types.ObjectId},
    postId: {type: Schema.Types.ObjectId}
}, {_id: false})

const imgSchema = new Schema({
    type: {type: String, required: true},
    url: {type: String, required: true}
}, {_id: false})

const postSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    text: {type: String, required: true},
    likes: {type: Number, required: true, default: 0},
    repliedPost: replySchema,
    img: [imgSchema]
})

export default model('Post', postSchema)