const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message