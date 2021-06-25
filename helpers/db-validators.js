const { Categoria, Role, User, Producto } = require('../models');

const esRolValido = async(rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async(correo = "") => {
    // Verificar si el correo existe
    const existEmail = await User.findOne({ correo });
    if( existEmail ){
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
}

const existeUsuarioPorId = async(id = "") => {
    try{
        const existe = await User.findById(id);
        if(!existe)
        throw new Error(`EL id no existe ${id}`);
    }catch{
        throw new Error('El id no es valido');
    }
}

const existeCategoriaPorId = async(id = "") => {
    try{
        const existe = await Categoria.findById(id);
        if(!existe)
        throw new Error(`EL id no existe ${id}`);
    }catch{
        throw new Error('El id no es valido');
    }
}

const existeProductoPorId = async(id = "") => {
    try{
        const existe = await Producto.findById(id);
        if(!existe)
        throw new Error(`EL id no existe ${id}`);
    }catch{
        throw new Error('El id no es valido');
    }
}
module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeProductoPorId,
    existeCategoriaPorId
}