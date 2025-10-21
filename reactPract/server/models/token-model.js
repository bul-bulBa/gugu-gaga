import { Schema, model} from 'mongoose'

const tokenSchema = new Schema({
    user:{type: Schema.Types.ObjectId, required: true},
    refreshToken: {type: String, required: true},
    expiresAt: {type: Date, required: true}
})

tokenSchema.index({expiresAt: 1}, {expireAfterSeconds: 0})
export default model('Token', tokenSchema)