const router = require('express').Router();

const userRouter = require('./routers/user')

router.use('/user', userRouter)
module.exports = router;