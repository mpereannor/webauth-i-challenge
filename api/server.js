const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');

const AuthRouter = require('../auth/auth-router');
const UserRouter = require('../users/users-router')


const server = express();

const sessionConfig = { 
    name: 'firsttoken',
    secret: 'an enigma',
    cookie: { 
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));


server.use('/api', UserRouter);
server.use('/api/auth', AuthRouter);

module.exports = server;