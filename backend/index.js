let express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./models/db')
const addUser = require('./controllers/addUser')
const getUser = require('./controllers/getUser')
const delUser = require('./controllers/delUser')
require('dotenv').config()
const PORT = process.env.PORT

//Middleware
app.use(cors())
app.use(express.json())

// Database Connection
connectDB()

// API's Routes
app.post('/api/addUser', addUser)
// http://localhost:8000/api/addUser

app.get('/api/getUser', getUser)
// http://localhost:8000/api/getUser

app.delete('/api/delUser/:id', delUser)

app.listen(PORT, ()=>{
    console.log('app listening at: ' + PORT)
})