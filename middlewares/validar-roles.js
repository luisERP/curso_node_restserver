const { request, response } = require("express");
const roleModel = require("../models/role.model");


const esAdminRol = (req= request, res = response, next) => {
    if(!req.userAuthenticated){
        return res.status(500).json({
            msg: 'validacion de rol sin validar el token'
        });
    }
    const { rol, nombre } = req.userAuthenticated;
    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }

    next();
}

const tieneRol = ( ...roles  ) =>{
    return (req, res, next) => {
        if(!req.userAuthenticated){
            return res.status(500).json({
            msg: 'validacion de rol sin validar el token'
            });
        }
        if(!roles.includes(req.userAuthenticated.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles} `
            });
        }
        next();
    }
}


module.exports = { 
    esAdminRol,
    tieneRol
}