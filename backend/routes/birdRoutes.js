const express = require('express')
const router = express.Router()

const {protect} = require('../middleware/authMiddleware')

const {getBirds, getBird, createBird, deleteBird, updateBird} = require('../controllers/birdController')

router.route('/').get(protect, getBirds).post(protect, createBird)

router.route('/:id').get(protect, getBird).delete(protect, deleteBird).put(protect, updateBird)

//router.post('/', protect, )


module.exports = router