let express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./models/db')
const addUser = require('./controllers/addUser')
const getUser = require('./controllers/getUser')
const delUser = require('./controllers/delUser')
const getUsers = require('./controllers/getUsers')
const updateUser = require('./controllers/updateUser')
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

app.get('/api/getUser', getUsers)
// http://localhost:8000/api/getUser

app.delete('/api/delUser/:id', delUser)
// http://localhost:8000/api/delUser/:id

app.get('/api/getUser/:id', getUser)

app.put('/api/updateUser/:id', updateUser)

app.listen(PORT, ()=>{
    console.log('app listening at: ' + PORT)
})