require('dotenv/config')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { verify } = require('jsonwebtoken')
const { hash, compare } = require('bcrypt')

const PORT = process.env.PORT | 3300

const server = express()

server.use(cookieParser())

server.use(express.json()) //json support

server.use(express.urlencoded({ extended: true })) // support url

server.use(
        cors({
            origin: 'http//localhost:3300',
            credentials: true
    })
)// cors use



server.use('/register', require('./components/registration'))
server.use('/login', require('./components/authentication'))
server.use('/logout', require('./components/logout'))
server.use('/protected', require('./components/protected'))
server.use('/refresh', require('./components/refreshToken'))

server.listen(PORT, () => {
    console.log('server work!')
})