const express = require('express');
const Users = require('./users-model');
const router = express.Router();
const bcrypt = require('bcryptjs')

router.post('/register', (req, res) => { 
    let user = req.body;
    Users.add(user)
    .then( saved => {
        res.status(201).json(saved);
    })
    .catch(error => { 
        res.status(500).json(error)
    })
})

router.post('/login', (req, res) => {
    Users.post
})

router.get('/users', (req, res) => { 
    Users.findById
        
})

module.exports = router;