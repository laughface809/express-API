const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//Middleware
app.use(bodyParser())
app.use(cors())

//import routes
const bukuRoutes = require('./routes/buku')

//contoh routes
app.use('/buku', bukuRoutes)

//connect db
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection

db.on('error', console.error.bind(console, 'Database connect error'))
db.once('open', ()=>{
    console.log('Database connect success ')
})

//listen
app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`)
})