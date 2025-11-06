import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    writerId: {type: Schema.Types.ObjectId, required: true},
    readerId: {type: Schema.Types.ObjectId, required: true},
    text: {type: String, required: true},
}, { timestamps: true } )

export default model('Message', messageSchema)