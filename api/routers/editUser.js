const router = require('express').Router();
const User = require('../../DB/models/users')
const { upload } = require('../../multer')
const fs = require('fs');
const path = require('path')
router.put('/', upload.single('profilePic'), async(req, res) => {
    try {
        const userId = req.jwt_payload._id;
        const { occupation } = req.body;
        await User.findByIdAndUpdate(userId, {
            occupation,
            profilePic: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        })
        fs.unlink(path.join(__dirname + '/uploads/' + req.file.filename), (err) => {
            console.log(err);
            return
        })
        return res.status(201).json({
            msg: "User details updated successfullly"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "Server error"
        })
    }

})
module.exports = router;