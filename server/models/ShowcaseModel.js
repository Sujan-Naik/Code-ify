const { Schema, model} = require('mongoose')

const ShowcaseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contents: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }]
})

const ShowcaseModel = model('showcase', ShowcaseSchema)

module.exports = ShowcaseModel
