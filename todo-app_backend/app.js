const express = require('express');
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const taskRouter = require('./routers/Tasks')

require('dotenv/config')

// Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const api = process.env.API_URL
const dbConnection = process.env.CONNECTION_URL


app.options('*', cors)

app.use(`${api}/tasks`, taskRouter)


mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'task-list'
}).then(()=>{
    console.log('database connection successful')
}).catch(err=>{
    console.log(err)
})

app.listen(3001, ()=>{
    console.log('Server running at http://localhost:3001')
})