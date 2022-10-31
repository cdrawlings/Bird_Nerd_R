const mongoose = require('mongoose');

const CountSchema = new mongoose.Schema({
    count: {
        type: Number,
    },
    speciesCode: {
        type: String,
    },
    comName: {
        type: String,
    },
    birdid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bird'
    },
    lastSeen: Date,
})


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
        count: [CountSchema]
    }, {
        timestamps: true,
    }
)

module.exports = mongoose.model('Session', SessionSchema)