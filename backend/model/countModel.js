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
        session: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Session'
        },
        lastSeen: Date,
    },
    {timestamps: true,}
)

module.exports = mongoose.model('Count', CountSchema)