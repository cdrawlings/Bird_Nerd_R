const express = require('express')
const router = express.Router()

const {
    createSession,
    getSession,
    createSingle,
    getLastSession,
    toggleSeen,
    putSeen,
    postSeen,
    sessionSeen

} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSession) // Dashboard

router.post('/', protect, createSession) // Dashboard

router.post('/:id', protect, sessionSeen) // Session

router.post('/toggle', protect, toggleSeen) // Session

// router.get('/add-bird', protect, getLastSession)


// router.get('/last', protect, getLastSession)

// router.put('/session/:id', protect, updateWatch)

router.put('/seen', protect, putSeen)

router.post('/seen', protect, postSeen) // Add bird

//router.get('/session/:id', protect, getWatcht)


module.exports = router