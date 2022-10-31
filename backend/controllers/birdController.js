const asyncHandler = require('express-async-handler')

const User = require('../model/userModel')
const Bird = require('../model/birdModel')

// get users list of spotted birds
// Route    api/bird/
const  getBirds = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    const birds = await Bird.find({user: req.user.id})

    res.status(200).json(birds)
});


// get users a single bird
// Route    api/bird/:id
const  getBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
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

    res.status(200).json(bird)
});


// get Last bird entered for user
// Route    GET api/bird/last
const  getLast = asyncHandler(async (req, res) => {
    //Get user with ID  in JWT

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("User not found")
    }

    const bird = await Bird.find({user: req.user.id}).sort({createdAt: -1}).limit(1)

    res.status(200).json(bird[0])
});


// Delete a single bird
// Route    api/bird/:id
const  deleteBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
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


// update a bird
// Route    api/bird/:id
const  updateBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
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

    const updatedBird = await Bird.findOneAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedBird)
});


// Adds a spotted bird to DB
// Route    api/bird/
const  createBird = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found.')
    }

    // Check if the new bird has already been added to DB
    const seen = await Bird.exists({
        user: req.user.id,
        speciesCode: req.body.speciesCode,
    })

    if (seen) {
        res.status(401)
        throw new Error("You have already spotted that bird!")
    }

    // Insert new product
    const createBird = await Bird.create({
        speciesCode: req.body.speciesCode,
        comName: req.body.comName,
        user: req.user.id,
    });

    res.status(201).json(createBird)
});

module.exports = {
    getBirds,
    getBird,
    createBird,
    deleteBird,
    updateBird,
    getLast
}
