const router = require('express').Router()
const Course = require('../../DB/models/courses')
router.post('/title/', async(req, res) => {
    let { input } = req.body;
    input = input.trim();
    const result = await Course.find({
        title: { $regex: new RegExp(input, 'i') }
    })
    if (!result) {
        return res.status(404).json({
            msg: "No course found"
        })
    }
    return res.status(200).json({
        data: result
    })
})
router.post('/author/', async(req, res) => {
    let { input } = req.body;
    input = input.trim();
    const result = await Course.find({
        author: { $regex: new RegExp(input, 'i') }
    })
    if (!result) {
        return res.status(404).json({
            msg: "No course found"
        })
    }
    return res.status(200).json({
        data: result
    })
})
router.get('/tag/:tag/', async(req, res) => {
    const tag = req.params.tag;
    const result = await Course.find({
        tags: tag
    })
    if (!result) {
        return res.status(404).json({
            msg: "No course found"
        })
    }
    return res.status(200).json({
        data: result
    })
})
module.exports = router;