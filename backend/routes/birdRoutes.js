const express = require('express')
const router = express.Router()

const {getBirds, getBird, createBird, deleteBird, updateTime, getLast} = require('../controllers/birdController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getBirds)

router.post('/find-bird', protect, createBird)

router.get('/add-bird', protect, getLast)

router.put('/time', protect, updateTime)

/*
router.get('/:id', protect, getBird)

router.delete('/:id', protect, deleteBird)

router.put('/:id', protect, updateBird)
*/

module.exports = router