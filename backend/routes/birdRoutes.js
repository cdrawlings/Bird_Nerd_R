const express = require('express')
const router = express.Router()

const {getBirds, getBird, createBird, deleteBird, updateTime, getLast} = require('../controllers/birdController')

const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getBirds) // Session

router.post('/find-bird', protect, createBird) //Find Bird

/*
router.get('/:id', protect, getBird)

router.delete('/:id', protect, deleteBird)

router.put('/:id', protect, updateBird)

// router.get('/get-last', protect, getLast) //Find Bird

// router.put('/time', protect, updateTime)


*/

module.exports = router