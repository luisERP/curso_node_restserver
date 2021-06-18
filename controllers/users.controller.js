const { request, response } = require('express'); 
const bcryptjs = require('bcryptjs');

const userModel = require('../models/user.model');

const getUsers = async(req = request, res = response) => {    
    const { limite = 5, desde = 0 } = req.query;

    const [total, users] = await Promise.all([
        userModel.countDocuments({ estado : true }),
        userModel.find({ estado : true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json(
        {
            total,
            users
        });
}

const postUser = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new userModel( { nombre, correo, password, rol } );

    // Encriptar contrasenna
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await user.save();

    res.json( user );
}

const putUser = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if( password ){
        // Encriptar contrasenna
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const user = await userModel.findByIdAndUpdate(id, resto);

    res.json(user);
}

const deleteUser = async(req = request, res = response) => {
    const { id } = req.params;
        const user = await userModel.findByIdAndUpdate(id, {estado : false});
    res.json({
        user
    });
}



module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUser
}