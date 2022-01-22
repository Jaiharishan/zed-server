require('dotenv').config({ path: './env/.env' })
const jwt = require('jsonwebtoken')
const verifyJWT = (req, res, next) => {
    const { auth_token } = req.headers;
    if (!auth_token) {
        return res.status(401).json({
            msg: "No token"
        })
    }
    jwt.verify(auth_token, process.env.TOKEN_SECRET, async(err, decoded) => {

        if (err) {
            console.log(err);
            return res.status(403).json({
                msg: "Invalid token or token expired"
            })
        }
        req.jwt_payload = decoded;
    })
    return next()
}
module.exports = { verifyJWT }