const express = require('express')
const router = express.Router()

const {
    postSeen,
    getSeen,
    newBird
} = require('../controllers/countController')

const {protect} = require('../middleware/authMiddleware')

router.post('/post-seen', protect, postSeen)  // Add bird

router.post('/add-bird', protect, newBird) // Find Bird

router.get('/session-seen/:id', protect, getSeen) // Session


//router.get('/session/:id', protect, getWatcht)


module.exports = router