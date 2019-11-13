const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const authRouter = require('../auth/auth-router');
const userRouter = require('../users/users-router')


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
    saveUninitialized: false,
    store: new KnexSessionStore({ 
        knex: require('../database/dbConfig'),
        tablename: 'sessons',
        sidefieldname: 'sid',
        createTable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));


server.use('/api', userRouter);
server.use('/api/auth', authRouter);

module.exports = server;