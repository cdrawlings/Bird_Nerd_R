const express = require('express')
const router = express.Router()

const {createSession, getSessions} = require('../controllers/sessionController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getSessions)

router.post('/', protect, createSession)


module.exports = router