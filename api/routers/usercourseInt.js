const router = require('express').Router();
const User = require('../../DB/models/users')
const Course = require('../../DB/models/courses')

router.put('/wish/:courseId', async(req, res) => {
    const userId = req.jwt_payload._id;
    const courseId = req.params.courseId;
    const userDetails = await User.findById(userId).select('-password');
    let { likes } = await Course.findById(courseId)
    if (userDetails.wishlist.includes(courseId)) {

        likes = parseInt(likes) - 1
        await User.findByIdAndUpdate(userId, { $pull: { wishlist: courseId } })
    } else {
        likes = parseInt(likes) + 1
        await User.findByIdAndUpdate(userId, { $addToSet: { wishlist: courseId } })
    }
    await Course.findByIdAndUpdate(courseId, { likes })
    res.status(201).json({
        msg: "Interest noted"
    })
})
router.put('/cart/:courseId', async(req, res) => {
    const userId = req.jwt_payload._id;
    const courseId = req.params.courseId;
    const userDetails = await User.findById(userId).select('-password');
    if (userDetails.cart.includes(courseId)) {
        await User.findByIdAndUpdate(userId, { $pull: { cart: courseId } })
    } else {
        await User.findByIdAndUpdate(userId, { $addToSet: { cart: courseId } })
    }
    res.status(201).json({
        msg: "Added to cart"
    })
})
module.exports = router;