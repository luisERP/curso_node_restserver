const { request, response } = require('express'); 


const getUsers = (req = request, res = response) => {    
    res.json({
        name: 'getUsers',
        msg: 'Users List'
    });
}

const postUser = (req = request, res = response) => {
    const body = req.body;
    res.json({
        name: 'getUsers',
        msg: 'User posted',
        body
    });
}

const putUser = (req = request, res = response) => {
    const {id} = req.params;
    const {q} = req.query;
    res.json({
        name: 'getUsers',
        msg: 'User updated',
        id,
        q
    });
}

const deleteUser = (req = request, res = response) => {
    res.json({
        name: 'deleteUser',
        msg: 'User deleted'
    });
}



module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}