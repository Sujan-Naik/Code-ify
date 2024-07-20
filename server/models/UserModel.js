const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        key: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    },
    showcases: [{
        type: Schema.Types.ObjectId,
        ref: 'showcase',
        required: true
    }]
})

const UserModel = model('user', UserSchema)

module.exports = UserModel
