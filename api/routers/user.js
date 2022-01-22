const router = require('express').Router();
const User = require('../../DB/models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body;
        if (!userName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                msg: "Fill all fields"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                msg: "Confirm password doesn't match the original password"
            })
        }
        if (await User.findOne({ userName })) {
            return res.status(400).json({
                msg: "userName already in use"
            })
        }
        if (await User.findOne({ email })) {
            return res.status(400).json({
                msg: "email already in use"
            })
        }
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync());
        const newUser = new User({
            userName,
            email,
            password: hash
        })
        await newUser.save()
        return res.status(200).json({
            msg: "New user added successfully"
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Server error"
        })
    }

})
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: "Fill all fields"
            })
        }
        const userDetails = await User.findOne({ email });
        if (!userDetails) {
            return res.status(400).json({
                msg: "Invalid input"
            })
        }
        if (await bcrypt.compare(password, userDetails.password)) {
            const token = jwt.sign({ _id: userDetails._id, userName: userDetails.userName, email: userDetails.email },
                process.env.TOKEN_SECRET, { expiresIn: '168h' }
            )
            return res.header('auth_token', token).json({
                msg: "User logged in successfully",
                token
            })
        }
        return res.status(400).json({
            msg: "Incorrect input"
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Server error"
        })
    }
})
module.exports = router;