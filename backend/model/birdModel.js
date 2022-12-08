const mongoose = require('mongoose');

const BirdSchema = new mongoose.Schema({
        comName: {
            type: String,
        },
        speciesCode: {
            type: String,
        },
        isSeen: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true,
    }
)



module.exports = mongoose.model('Bird', BirdSchema)