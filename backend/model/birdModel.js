const mongoose = require('mongoose');

const BirdSchema = new mongoose.Schema({
        comName: {
            type: String,
        },
        speciesCode: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        created: {
            type: Date,
            default: Date.now,
            required: false
        },
        updated: {
            type: Date,
            default: Date.now,
            required: false
        },
    }
)



module.exports = mongoose.model('Bird', BirdSchema)