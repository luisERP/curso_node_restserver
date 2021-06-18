const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: "Debe loguiarse primero"
        })
    }
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userAuthenticated = await userModel.findById( uid );
        // Verificar si el usuario esta en la BD
        if(!userAuthenticated) {
            return res.status(401).json({
                msg: "Token no valido -usuario borrado le la BD"
            })
        }
        // Verificar si el usuario esta habilitado ( estado == true)
        if(!userAuthenticated.estado){
            return res.status(401).json({
                msg: "Token no valido -usuario desabilitado"
            })
        }

        req.userAuthenticated = userAuthenticated 
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({
            msg: "Token no valido"
        })
    }
}


module.exports = {
    validarJWT
}