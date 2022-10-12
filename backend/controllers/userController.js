const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/userModel')

// Register new users
// Route    api/users
const registerUser = asyncHandler(async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    //validation
    if( !firstname || !firstname || !email ||!password){
        res.status(400)
        throw new Error('Please enter all fields')
    }

    // Find if user exists
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(13);
    const hashedPW = await bcrypt.hash(password, salt);

    const user = await User.create({
        firstname,
        lastname,
        password: hashedPW,
        email
    })

    if (user) {
        res.status(201).json({
            _id: (await user)._id,
            firstname: (await user).firstname,
            lastname: (await user).lastname,
            email: (await user).email,
            token: generateToken((await user)._id)
        })
    } else {
        res.status(400)
        throw new Error('User not created');
    }
});

// Login users
// Route    api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    // Check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: (await user)._id,
            firstname: (await user).firstname,
            lastname: (await user).lastname,
            email: (await user).email,
            token: generateToken((await user)._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials');
    }
});


// get current user
// Route    api/users/profile
const  getUser = asyncHandler(async (req, res) => {

    /*
    const user = {
        id: req.user._id,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
    }
    */

    res.status(200).json(req.user)
    // res.status(200).json(user)

});


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}


module.exports = {
    registerUser, loginUser, getUser
}