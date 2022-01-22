const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    title: String,
    video: {
        videoname: String,
        videoId: String
    },
    description: String
})
module.exports = mongoose.model('Content', contentSchema)