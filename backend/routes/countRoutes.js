const express = require('express')
const router = express.Router()

const {
    toggle,
    getSeen,
} = require('../controllers/countController')

const {protect} = require('../middleware/authMiddleware')

router.post('/toggle', protect, toggle) // Session

router.get('/session-seen/:id', protect, getSeen) // Session


//router.get('/session/:id', protect, getWatcht)


module.exports = router