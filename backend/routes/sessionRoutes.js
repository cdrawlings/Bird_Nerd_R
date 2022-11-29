const express = require('express')
const router = express.Router()

const {
    createSession,
    getSessions,
    createSingle,
    updateCount,
    getLastSession
} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSessions)

router.post('/', protect, createSession)

router.post('/single', protect, createSingle)

router.get('/last', protect, getLastSession)

//router.put('/session', protect, updateCount)


module.exports = router