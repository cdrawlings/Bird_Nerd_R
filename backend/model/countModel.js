const mongoose = require('mongoose');

const CountSchema = new mongoose.Schema({
        count: {
            type: Number,
        },
        birdid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bird'
        },
        session: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Session'
        },
    },
    {timestamps: true,}
)

module.exports = mongoose.model('Count', CountSchema)