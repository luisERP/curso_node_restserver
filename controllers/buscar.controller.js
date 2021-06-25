const { request, response } = require(`express`)
const { isValidObjectId } = require("mongoose");
const { User } = require("../models");

const coleccionesPermitidas = [
    'usuario',
    'categorias',
    'productos'
]

const buscarUsuario = async(termino, res = response) =>{
    const IDvalido = isValidObjectId(termino);
    if(IDvalido){
        const user = await User.findById(termino);
        return res.json(user);
    }

    const rexexp = RegExp( termino, 'i');
    const users = await User.find({
        $or: [{nombre: rexexp}, {correo: rexexp}],
        $and: [{estado: true}]
    });
    return res.json(users);
}


const buscar = (req = request, res = response) =>{

    const { coleccion, termino } = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `La coleccion ${coleccion} no esta apta para la busqueda`
        })
    }

    switch (coleccion) {
        case 'usuario':
            buscarUsuario(termino, res);
            break;
        default:
            return res.status(500).json({
                msg: `Funcionalidad no implementada, imposible buscar en ${coleccion}`
            });
            break;
    }
}


module.exports = {
    buscar    
} 