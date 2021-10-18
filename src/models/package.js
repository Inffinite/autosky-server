const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    speed: {
        type: String,
        required: true
    },
    bandwidthType: {
        type: String,
        required: true
    },
    price: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})

const Package = mongoose.model('Package', packageSchema )
module.exports = Package
