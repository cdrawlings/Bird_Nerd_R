const express = require('express')
const router = express.Router()

const {createSession, getSessions, createSingle} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSessions)

router.post('/', protect, createSession)

router.post('/single', protect, createSingle)


module.exports = router