const User = require('../models/user')
const bcrypt = require('bcryptjs')

const hashPassword = async (req, res, next) => {
    try {
        const passHash = await bcrypt.hashSync(req.body.password, 8)
        req.body.password = passHash
        next()
    } catch (e) {
        console.log(e)
    }
}

module.exports = hashPassword