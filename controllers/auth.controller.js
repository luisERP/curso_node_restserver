const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const userModel = require("../models/user.model");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req = request, res = response) => {
    const { correo, password } = req.body;
    
    try{
        // Verificar si el email existe
        const user = await userModel.findOne({correo});
        if(!user){
            res.status(400).json({
                msg: "El correo no esta registrado en la base de datos"
            });
        }
        // Si el usuario esta activo
        if( !user.estado ){
            res.status(400).json({
                msg: "El usuario esta inabilitado"
            });
        }
        // Verificar la contraseña 
        const validPasword = bcryptjs.compareSync(password, user.password);
        if(!validPasword){
            res.status(400).json({
                msg: "Contraseña incorrecta"
            });
        }
        // Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: "Error del servidor"
        })
    }
}


module.exports = {
    login
}