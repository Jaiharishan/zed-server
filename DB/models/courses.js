const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    thumbnail: {
        data: Buffer,
        contentType: String
    },
    content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],
    tags: [{ type: String }],
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })
module.exports = mongoose.model('Course', courseSchema)