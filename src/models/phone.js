const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Phone = mongoose.model('phone', phoneSchema )

module.exports = Phone