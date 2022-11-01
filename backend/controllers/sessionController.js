const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')
const Bird = require('../model/birdModel')
const Session = require('../model/sessionModel')

// get users list of spotted birds
// Route    api/bird/
const getSessions = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const sessions = await Session.find({user: req.user.id})

    res.status(200).json(sessions)
});


// Adds a spotted bird to DB
// Route    api/bird/
const createSession = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const create = await Session.create({
        //temperature: req.body.temperature,
        //condition: req.body.condition,
        //visibility: req.body.visibility,
        //icon: req.body.icon,
        city: req.body.city,
        lon: req.body.lon,
        lat: req.body.lat,
        user,
        count: {
            count: req.body.count,
            comName: req.body.comName,
            speciesCode: req.body.speciesCode,
            birdid: req.body.birdid,
        }
    });

    res.status(200).json({message: "Posted A new bird watching session"})
});


module.exports = {
    createSession,
    getSessions
}
