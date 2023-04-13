const express = require('express')
const router = express.Router()

const {
    createSession,
    getSession,
    putSeen,
    sessionSeen,
    lastSeen
} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSession) // Dashboard

router.post('/', protect, createSession) // Dashboard

router.post('/:id', protect, sessionSeen) // Session

router.get('/get-last', protect, lastSeen) // Dashboard


router.put('/seen', protect, putSeen)


module.exports = router