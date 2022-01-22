const router = require('express').Router();
const jwt = require('jsonwebtoken')

const editUserRouter = require('./routers/editUser')
const addCourseRouter = require('./routers/addCourse')
const addContentRouter = require('./routers/addContent')
const { verifyJWT } = require('../jwt')

router.use('/user/edit', verifyJWT, editUserRouter)
router.use('/course/add', verifyJWT, addCourseRouter)
router.use('/content/add', verifyJWT, addContentRouter)
module.exports = router;