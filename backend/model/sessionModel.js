const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
        temperature: {
            type: Number
        },
        condition: {
            type: String
        },
        visibility: {
            type: String
        },
        icon: {
            type: String
        },
        lat: {
            type: Number
        },
        lon: {
            type: Number
        },
        city: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }, {
        timestamps: true,
    }
)

module.exports = mongoose.model('Session', SessionSchema)