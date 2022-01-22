const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    title: String,
    video: {

    },
    description: String
})