const { uploadVideo } = require('../../multer');
const Content = require('../../DB/models/contents')
const Course = require('../../DB/models/courses')
const User = require('../../DB/models/users')
const router = require('express').Router();

router.post('/:courseID/', uploadVideo.single('video'), async(req, res) => {
    const userId = req.jwt_payload._id;
    const courseId = req.params.courseID;
    const userDetails = await User.findById(userId);
    if (!userDetails.myCourses.includes(courseId)) {
        return res.status(400).json({
            msg: "Course not found in the user profile"
        })
    }
    const { title, description } = req.body;
    console.log(req.body)
    const newContent = new Content({
        title,
        description,
        video: {
            videoname: req.file.filename,
            videoId: req.file.id
        }
    })
    await newContent.save()
    console.log(newContent)
    await Course.findByIdAndUpdate(courseId, { $addToSet: { content: newContent._id } });
    return res.status(201).json({
        msg: "Content added to the course"
    })

})
module.exports = router;