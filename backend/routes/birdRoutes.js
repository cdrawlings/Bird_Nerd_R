const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

const {getBirds, getBird, createBird, deleteBird, updateBird, getLast} = require('../controllers/birdController')

router.route('/').get(protect, getBirds)

router.route('/:id').get(protect, getBird).delete(protect, deleteBird).put(protect, updateBird)

router.route('/find-bird').post(protect, createBird)




module.exports = router