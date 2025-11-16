import { Schema, model } from 'mongoose'

const participantsSchema = new Schema({
    userAId: { type: Schema.Types.ObjectId, required: true},
    userBId: { type: Schema.Types.ObjectId, required: true}
}, { _id: false})

const participantsNamesSchema = new Schema({
    userAName: {type: String, required: true},
    userBName: {type: String, required: true}
}, {_id: false})

const dialogSchema = new Schema({
    participants: participantsSchema,
    participantsNames: participantsNamesSchema,
    lastMessage: {type: String},
    unread: { type: Map, of: Number, default: {} }
})

export default model('dialogModel', dialogSchema)