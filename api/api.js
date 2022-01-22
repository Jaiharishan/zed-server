const router = require('express').Router();
const jwt = require('jsonwebtoken')

const editUserRouter = require('./routers/editUser')
const viewUserRouter = require('./routers/viewUser')
const addCourseRouter = require('./routers/addCourse')
const addContentRouter = require('./routers/addContent')
const myCourseListRouter = require('./routers/myCourseList')
const userIntRouter = require('./routers/usercourseInt')
const trendingRouter = require('./routers/trendingCourses')
const { verifyJWT } = require('../jwt')

router.use('/user/edit', verifyJWT, editUserRouter)
router.use('/course/add', verifyJWT, addCourseRouter)
router.use('/course/mylist', verifyJWT, myCourseListRouter)
router.use('/content/add', verifyJWT, addContentRouter)
router.use('/course/interest', verifyJWT, userIntRouter)
router.use('/course/trending', verifyJWT, trendingRouter)
router.use('/user/view', verifyJWT, viewUserRouter)
module.exports = router;