const express = require('express')
const router = express.Router()

const {
    createSession,
    getSessions,
    createSingle,
    getLastSession,
    updateWatch,
    getWatch,

} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSessions)

router.post('/', protect, createSession)

router.post('/single', protect, createSingle)

router.get('/last', protect, getLastSession)

router.put('/session/:id', protect, updateWatch)

//router.get('/session/:id', protect, getWatcht)


module.exports = router