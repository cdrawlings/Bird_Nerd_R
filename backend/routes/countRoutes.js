const express = require('express')
const router = express.Router()

const {
    postSeen,
    getSeen,
} = require('../controllers/countController')

const {protect} = require('../middleware/authMiddleware')

router.post('/post-seen', protect, postSeen) // Session // Add bird

router.get('/session-seen/:id', protect, getSeen) // Session


//router.get('/session/:id', protect, getWatcht)


module.exports = router