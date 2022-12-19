const express = require('express')
const router = express.Router()

const {
    createSession,
    getSessions,
    createSingle,
    getLastSession,
    updateWatch,
    putSeen,
    postSeen

} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')
const {getLast} = require("../controllers/birdController");

router.get('/', protect, getSessions)

router.post('/', protect, createSession)

router.get('/add-bird', protect, getLastSession)

router.post('/find-bird', protect, createSingle)

router.get('/last', protect, getLastSession)

router.put('/session/:id', protect, updateWatch)

router.put('/seen', protect, putSeen)

router.post('/seen', protect, postSeen)

//router.get('/session/:id', protect, getWatcht)


module.exports = router