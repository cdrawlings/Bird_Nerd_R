const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose');


const User = require('../model/userModel')
const Bird = require('../model/birdModel')
const Count = require('../model/countModel')
const Session = require('../model/sessionModel')


// Toggled seen?? not seened bird on the session page
// Route    api/count/post-seen
// Page     find-bird
const postSeen = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    console.log("Save started")

    const createCount = await Count.findOneAndUpdate({
        birdId: req.body.birdid,
        session: req.body.sessionid
    }, {
        count: req.body.count,
        session: req.body.sessionid,
        birdId: req.body.birdid
    }, {
        upsert: true,
        new: true,
    });


    const now = Date.now()
    const string = new Date(now)
    const update = string.toISOString()

    const filter = {_id: req.body.birdid}
    const updateUpdated = {updated: update}


    const updatedTime = await Bird.findOneAndUpdate(
        filter, updateUpdated
    )


    console.log("session")
    const sessionCreate = await Session.create({
        //temperature: req.body.temperature,
        //condition: req.body.condition,
        //visibility: req.body.visibility,
        //icon: req.body.icon,
        city: req.body.city,
        lon: req.body.lon,
        lat: req.body.lat,
        _id: req.body.sessionid,
        user,
    });

    console.log("session 2")

    res.status(200).json(createCount)
});


// Add a new Bird from the bird watching page
// Route    api/count/new-bird
// Page     add-bird
const newBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    console.log("New Bird Save started", req.user.id)

    const newBird = await Bird.create({
        speciesCode: req.body.speciesCode,
        comName: req.body.comName,
        _id: req.body.birdid,
        user: req.user.id
    });

    console.log("new Bird", newBird)

    const createCount = await Count.findOneAndUpdate({
        birdId: req.body.birdid,
        session: req.body.sessionid
    }, {
        count: req.body.count,
        session: req.body.sessionid,
        birdId: req.body.birdid,
    }, {
        upsert: true,
        new: true,
    });


    res.status(200).json(createCount)
});


// get users a single session by ID
// Route    api/session/session/:id
const getSeen = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT\
    console.log("Getting bird counts")

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const tosearch = req.params.id

    const seen = await Count.find({session: tosearch})
        .populate("birdId")
        .populate("session")

    if (!seen) {
        res.status(401)
        throw new Error('Sorry, there is nothing spotted.')
    }

    res.status(200).json(seen)
});


module.exports = {
    postSeen,
    getSeen,
    newBird
}