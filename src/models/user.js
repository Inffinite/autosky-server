const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        // select: false
    },
    tokens: [{
        token: {
            type: String,
            required: true,
            timestamps: true
        }
    }],
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('Unable to login.')
    }

    console.log('passed')
    
    const isMatch = await bcrypt.compare(password, user.password)

    console.log(isMatch)

    if (!isMatch) {
        throw new Error('Unable to login.')
    }

    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User