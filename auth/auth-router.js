const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');


router.get('/logout', (req, res) => { 
    if(req.session) { 
        req.session.destroy(error => {
            if(error) { 
                res.json('sorry, you cannot leave')
            }
            else { 
                res.json('goodbye, sad to see you go')
            }
        })
    }
    else{
        res.end();
    }
})


router.post('/register', (req, res) => { 

    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user) 
    .then(saved => { 
        res.status(201).json(saved);
    })
    .catch(error => { 
        res.status(500).json(error);
    })
})


router.post('/login', (req, res) => { 
    
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => { 
        if (user && bcrypt.compareSync(password, user.password)){
            req.session.user = user;
            res.status(200).json({
                message: `welcome ${user.username}!`
            });
        }
        else { 
            res.status(401).json({
                message: `invalid credentials`
            })
        }
    })
    .catch(error => { 
        res.status(500).json(error);
    });
});


module.exports = router;