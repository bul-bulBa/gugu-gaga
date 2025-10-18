import { Schema, model } from 'mongoose'

const locationSchema = new Schema({
    country:{type: String, required: true},
    city:{type: String, required: true}
}, {_id: false})

const followedSchema = new Schema({
    he: {type: [String], default: []},
    onHim: {type: [String], default: []}
}, {_id: false})

const userSchema = new Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    name:{type: String, required: true},
    about:{type: String, default: ''},
    avatar:{type: String, default: ''},
    profilePhoto:{type: String, default: ''},
    location: locationSchema,
    followed: {type: followedSchema, default:{he: [], onHim: []}},
    status: {type: String, default: ''},
    verificationCode: {type: String, default: ''},
    verificationExpires: {type: Date}
})

userSchema.index({name: 'text'})

export default model('User', userSchema)