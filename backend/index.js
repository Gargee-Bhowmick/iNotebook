const express=require('express')
const app = express()
const connectToMongo = require('./db')
const port=5000
connectToMongo()
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.listen(port)
