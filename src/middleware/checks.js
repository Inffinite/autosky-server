const bcrypt = require('bcryptjs')

const checkPassword = async (req, res, next) => {

    // const passHash = await bcrypt.hashSync(req.body.password, 8)
    // req.body.password = passHash
    if (req.body.password == 'autoskk649') {
        next()
    } else {
        res.status(401).send({ error: 'Authenticate' })
    }

}

module.exports = { checkPassword }