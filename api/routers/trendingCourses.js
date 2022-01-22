const router = require('express').Router();
const Course = require('../../DB/models/courses')
router.get('/', async(req, res) => {
    try {
        const courses = await Course.find({}).sort({ likes: -1 })
        res.status(200).json({
            data: courses
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server error"
        })
    }

})
module.exports = router;