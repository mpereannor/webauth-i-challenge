const express = require('express');
const Users = require('./users-model');
const router = express.Router();
const restricted = require('../auth/restricted-middleware');

router.get('/users', restricted, (req, res) => { 
    Users.find()
    .then(users => { 
        res.json(users);
    })
    .catch(error => res.send(error.message))
});

module.exports = router;
