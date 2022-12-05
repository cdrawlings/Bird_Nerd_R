const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')
const Bird = require('../model/birdModel')
const Count = require('../model/countModel')
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
    });

    res.status(200).json({message: "Started a new bird watching session"})
});


// Adds a spotted bird to DB
// Route    api/bird/
const createSingle = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const create = await Count.create({
        count: req.body.count,
        comName: req.body.comName,
        speciesCode: req.body.speciesCode,
        birdid: req.body.birdid,
        session: req.body._id,
    });

    res.status(200).json({message: "Posted A new bird watching session"})
});


// update a session with bird info and count
// Route    api/bird/:id
const updateWatch = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const session = await Session.findById(req.params.id)

    if (!session) {
        res.status(401)
        throw new Error('We can not find the requested bird watching session.')
    }

    let existingSession = await Session.findOne({
        session: req.params.id,
        speciesCods: req.body.speciesCode,

    });

    console.log("EX Sess", existingSession)

    if (existingSession) {
        // Update existing session
        const updateWatch = await Count.findOneAndUpdate(
            {session: req.params.id, speciesCode: req.body.speciesCode},
            {
                // comName: req.body.comName,
                // birdId: req.body.birdId,
                count: req.body.count,
                // speciesCode: req.body.speciesCode,
                // session: req.params.id
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.status(200).json({message: "Updated bird"})
    } else {
        // Insert new product
        const updateWatch = await Count.findByIdAndUpdate(req.params.id,
            {
                comName: req.body.comName,
                birdId: req.body.birdId,
                count: req.body.count,
                speciesCode: req.body.speciesCode,
                session: req.params.id
            },
            {
                new: true,
                upsert: true,
            }
        );
        res.status(200).json({message: "Added a bird to the session"})
    }

    console.log("4")

    res.status(200).json(updateWatch)
});


// get Last bird entered for user
// Route    GET api/bird/last
const getLastSession = asyncHandler(async (req, res) => {
    //Get user with ID  in JWT

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const session = await Session.find({user: req.user.id}).sort({createdAt: -1}).limit(1)

    res.status(200).json(session[0])
});


// get users a single session by ID
// Route    api/session/session/:id
const getWatch = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const session = await Session.findById(req.params.id)

    if (!session) {
        res.status(401)
        throw new Error('Sorry, there is nothing spotted.')
    }

    res.status(200).json(session)
});


module.exports = {
    createSession,
    createSingle,
    getSessions,
    getLastSession,
    updateWatch
}
