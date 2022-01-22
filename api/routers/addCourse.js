const router = require('express').Router();
const { upload } = require('../../multer')
const fs = require('fs')
const User = require('../../DB/models/users')
const Course = require('../../DB/models/courses')
const path = require('path')
router.post('/', upload.single("thumbnail"), async(req, res) => {
    const { title, description, tags, price } = req.body;
    const userId = req.jwt_payload._id
    if (!title || !description || !tags || !price) {
        return res.status(400).json({
            msg: "Fill all fields"
        })
    }
    const newCourse = new Course({
        title,
        description,
        tags,
        price: parseFloat(price),
        thumbnail: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    })
    await newCourse.save()
    fs.unlink(path.join(__dirname + '/uploads/' + req.file.filename), (err) => {
        console.log(err);
        return
    })
    await User.findByIdAndUpdate(userId, { $addToSet: { myCourses: newCourse._id } })
    return res.status(201).json({
        msg: "New course created successfully"
    })
})
module.exports = router;