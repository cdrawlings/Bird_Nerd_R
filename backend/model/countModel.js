const mongoose = require('mongoose');

const CountSchema = new mongoose.Schema({
        count: {
            type: Number,
        },
        session: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Session'
        },
        birdId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bird'
        },
    }
)

module.exports = mongoose.model('Count', CountSchema)