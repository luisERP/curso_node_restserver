const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');

const esRolValido = async(rol = "") => {
    const existeRol = await roleModel.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo = "") => {
    // Verificar si el correo existe
    const existEmail = await userModel.findOne({ correo });
    if( existEmail ){
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
}

const existeUsuarioPorId = async(id = "") => {
    try{

        const existe = await userModel.findById(id);
        if(!existe)
        throw new Error(`EL id no existe ${id}`);
    }catch{
        throw new Error('El id no es valido');
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}