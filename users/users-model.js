
const db = require('../database/dbConfig');
module.exports = { 
    findById,
    find,
    add
};


function find() { 
    return db('users')
}

function findById(id){
    return db('users')
    .where({'id' : id})
    .first();
}
    
function add(user){ 
    return db('users')
    .insert(user)
}