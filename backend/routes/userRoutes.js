const express = require('express')
const router = express.Router()
const {registerUser, loginUser,} = require('../controllers/userController')

//   getUser

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/profile',)


module.exports = router