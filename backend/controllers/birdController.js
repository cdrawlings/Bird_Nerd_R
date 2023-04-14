const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')
const Bird = require('../model/birdModel')

// get users list of spotted birds
// Route    api/bird/
// Page     Session
const  getBirds = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)


    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const birds = await Bird.find({user: req.user.id})

    res.status(200).json(birds)
});


// Adds a spotted bird to DB
// Route    api/bird/
// Page add-bird
const createBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    console.log("Create working")

    // Check if the new bird has already been added to DB
    const seen = await Bird.exists({
        user: req.user.id,
        speciesCode: req.body.speciesCode,
    })

    console.log("Create working")

    if (seen) {
        res.status(401)
        throw new Error("You have already spotted that bird!")
    }

    // Insert new product
    const createBird = await Bird.create({
        speciesCode: req.body.speciesCode,
        comName: req.body.comName,
        user: req.user.id,
        _id: req.body._id,
    });

    res.status(201).json(createBird)
});


// get Last bird entered for user
// Route    GET api/bird/last
const getLast = asyncHandler(async (req, res) => {
    //Get user with ID  in JWT

    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const bird = await Bird.find({user: req.user.id}).sort({created: -1}).limit(1)

    res.status(200).json(bird)
});


/**********   NOT USED   ***********/
// update a created at time
// Route    api/bird/time
const updateTime = asyncHandler(async (req, res) => {
    const bird = await Bird.findById(req.body.birdid)

    if (!bird) {
        res.status(401)
        throw new Error('Bird not found.')
    }

    console.log('New Time', req.body.updated)

    const filter = {_id: req.body.birdid}
    const update = {updated: req.body.updated}

    const updatedTime = await Bird.findOneAndUpdate(
        filter, update
    )

    console.log('Time', updatedTime)

    res.status(200).json(updatedTime)
});


/**********   NOT USED   ***********/
// Delete a single bird
// Route    api/bird/:id
const deleteBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const bird = await Bird.findById( req.params.id )

    if(!bird){
        res.status(401)
        throw new Error('That bird has not been spotted yet.')
    }

    if(bird.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('That bird has not been spotted yet.')
    }

    await bird.remove()

    res.status(200).json({success: true})
});




/**********   NOT USED   ***********/
// get users a single bird
// Route    api/bird/:id
const getBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const bird = await Bird.findById(req.params.id)

    if (!bird) {
        res.status(401)
        throw new Error('That bird has not been spotted yet.')
    }

    if (bird.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('That bird has not been spotted yet.')
    }

    res.status(200).json(bird)
});


module.exports = {
    getBirds,
    getBird,
    createBird,
    deleteBird,
    updateTime,
    getLast
}