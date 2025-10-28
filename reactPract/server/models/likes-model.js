import { Schema, model} from 'mongoose'

const likesSchema = new Schema({
    userId: {type: String, required: true},
    postId: {type: String, required: true}
})

export default model("Likes", likesSchema)