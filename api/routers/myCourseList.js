const router = require('express').Router();
const User = require('../../DB/models/users')
router.get('/', async(req, res) => {
    try {
        const userId = req.jwt_payload._id;
        const userDetails = await User.findById(userId)
            .populate('myCourses')
            .select('myCourses')
        res.status(200).json({
            data: userDetails
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server error"
        })
    }

})
module.exports = router;