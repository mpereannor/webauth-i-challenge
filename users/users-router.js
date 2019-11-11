const express = require('express');
const Users = require('./users-model');
const router = express.Router();
const bcrypt = require('bcryptjs')

router.post('/register', (req, res) => { 
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10)

    const newUser = { 
        username: req.body.username,
        password: hash
    }

    Users.add(newUser)
    .then( saved => {
        res.status(201).json(saved);
    })
    .catch(error => { 
        res.status(500).json(error)
    })
});

router.post('/login', (req, res) => { 
    let { username , password } = req.body;
    
    Users.findById({username})
    .first()

    .then(user => { 
        if (user && bcrypt.compareSync(password, user.password)) { 
            res.status(200).json({
                message: `Logged in ${user.username}!`
            })
        } else {
            res.status(401).json({
                message: 'You shall not pass!'
            })
        }
    })
    .catch(error => { 
        res.status(500).json(error)
    })
})

function restricted (req, res, next) { 
    const { username, password } = req.headers
    Users.findById({ username })
    .first()
    .then( user => { 
        if(user && bcrypt.compareSync(password, user.password)) { 
            next()
        } else { 
            res.status(401).json({ message: `invalid credentials`});
        }
    })
    .catch(error => { 
        res.status(500).json({ 
            message: error.message
        })
    })
}

router.get('/users', restricted, (req, res) => { 
    Users.find()
    .then(users => { 
        res.json(users);
    })
    .catch(error => res.send(error.message))
});

module.exports = router;