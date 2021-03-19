require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.authenticateToken = async function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.body.user = user;
        if (req.files != null) {
            req.body.media = req.files.map((element) => element.filename)
            console.log(req.body.media)
        }
        if (req.file != null)
            req.body.imageName = req.file.filename

        next();
    })

}