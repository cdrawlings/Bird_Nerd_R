const express = require('express')
const router = express.Router()

const {
    createSession,
    getSession,
    putSeen,
    postSeen,
    sessionSeen
} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSession) // Dashboard

router.post('/', protect, createSession) // Dashboard

router.post('/:id', protect, sessionSeen) // Session

router.post('/seen', protect, postSeen) // Add bird

router.put('/seen', protect, putSeen)


module.exports = router