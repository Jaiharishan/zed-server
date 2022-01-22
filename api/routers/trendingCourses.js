const router = require('express').Router();
const Course = require('../../DB/models/courses')
router.get('/', async(req, res) => {
    const courses = await Course.find({}).sort({ likes: -1 })
    res.status(200).json({
        data: courses
    })
})
module.exports = router;