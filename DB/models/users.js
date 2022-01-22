const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    about: String,
    profilePic: {
        data: Buffer,
        contentType: String
    },
    myCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    regCourses: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        },
        progress: Number
    }],
    occupation: {
        type: String,
        enum: ['student', 'teacher', 'freelancer', 'other']
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    accno: String
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);