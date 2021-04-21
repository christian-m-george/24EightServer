require('dotenv').config()
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const { NODE_ENV } = require('./config')
const helmet = require('helmet')

const app = express()

const morganOption = (NODE_ENV === 'production')    
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'SSL', 'key.pem')), 
//     cert: fs.readFileSync(path.join(__dirname, 'SSL', 'cert.pem')),
// }, 
// app
// )

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

// sslServer.listen(3443, () => console.log('Secure server on port 3443'))

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app