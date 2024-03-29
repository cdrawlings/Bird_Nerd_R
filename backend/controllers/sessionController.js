const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')
const Bird = require('../model/birdModel')
const Count = require('../model/countModel')
const Session = require('../model/sessionModel')
const mongoose = require("mongoose");
const {all} = require("express/lib/application");



// Adds a spotted bird to DB
// Route    api/bird/
// Page     Dashboard
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
        _id: req.body.id,
        user,
    });

    res.status(200).json({message: "Started a new bird watching session"})
});

// get Last bird entered for user
// Route    GET api/bird/last
// Page     add-bird
const getSession = asyncHandler(async (req, res) => {
    //Get user with ID  in JWT

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const session = await Session.find({user: req.user.id}).sort({createdAt: -1}).limit(1)

    res.status(200).json(session[0])
});


// get Last bird entered for user Cleaned up for use with D3
// Get Last Session >> Make JSON one level >> strip and format for D3
// Route    GET api/bird/last
const lastSeen = asyncHandler(async (req, res) => {
    //Get user with ID  in JWT
    const lastSession = await Session.find({user: req.user.id}).sort({createdAt: -1}).limit(1)
    const last = lastSession[0]._id

    console.log("Get Last Running")

    const sessionlast = await Count.aggregate([
        {$match: {session: last}},
        {
            $lookup: {
                from: "birds",
                localField: "birdId",
                foreignField: "_id",
                as: "birds",
            },
        },
        {
            $lookup: {
                from: "sessions",
                localField: "session",
                foreignField: "_id",
                as: "session",
            },
        },
        {
            $unwind: '$birds'

        },
        {
            $unwind: '$session'

        },
        {
            $project: {
                _id: 0, count: 1, birds: {comName: 1, created: 1}, session: {createdAt: 1}
            }
        },

    ]);


    console.log("Session:", sessionlast)

    // Merge into one all into one Level
    let flat = sessionlast.map((x) =>
        ({
            count: x.count,
            created: x.birds.created,
            date: x.session.createdAt,
            name: x.birds.comName,
        })
    )

    console.log("Flat:", flat)

    // Filter flat for use with D3 stacked Bar
    let arr = flat;
    let farr = [Object.fromEntries(arr.map(o => [o.name, o.count]))];

    let obj = farr[0]
    let fdate = {date: flat[0].date}

    let allfiltered = [{...obj, ...fdate}]


    res.status(200).json(allfiltered)
});


/******* NOT USED ************/
// Adds a spotted bird to the count db
// Route    api/session/seen??
// Page     add-bird
const sessionSeen = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const createCount = await Count.create({
        count: req.body.count,
        session: req.params.id,
        birdid: req.body.birdid
    });

    res.status(200).json(createCount)

});

/******* NOT USED ************/
// update the session count to a previoiusly spotted bitd
// Route    api/session/seen??
const putSeen = asyncHandler(async (req, res) => {
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

    // Update existing session
    const updateSeen = await Count.findOneAndUpdate(
        {session: req.params.id, birdid: req.body.birdid},
        {
            count: req.body.count,
        }
    );

    res.status(200).json({message: "Updated bird"})

    res.status(200).json(updateSeen)
});

/******* NOT USED ************/
// get users list of spotted birds
// Route    api/bird/
// Page     Dashboard
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

/******* NOT USED ************/


/******* NOT USED ************/
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

    res.status(200).json(updateWatch)
});

/******* NOT USED ************/
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


/******* NOT USED ************/
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

/******* NOT USED ************/
// Adds a spotted bird to DB
// Route    api/bird/
const postOneBird = asyncHandler(async (req, res) => {
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

module.exports = {
    createSession,
    createSingle,
    getSession,
    putSeen,
    sessionSeen,
    lastSeen,
}