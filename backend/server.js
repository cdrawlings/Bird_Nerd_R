const express = require('express')
const Process = require("process");
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000

//Connect to database
connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    res.send('hello')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/bird', require('./routes/birdRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))