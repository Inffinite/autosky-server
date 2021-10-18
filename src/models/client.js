const mongoose = require('mongoose')
const clientSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    areaName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    // mbps amount wanted
    package: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Client = mongoose.model('Client', clientSchema)
module.exports = Client