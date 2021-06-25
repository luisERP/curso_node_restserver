const { request, response } = require("express");
const { Categoria, User } = require('../models')

const getcategories = async (req = request, res = response) => {
    const {desde = 0 , limite = 5} = req.query;

    const [categorias, total] = await Promise.all([
        Categoria.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre'),
        Categoria.countDocuments({estado:true})
    ])

    res.send({
        total,
        categorias
    })
}
const getcategory = async(req= request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
}

const postCategory = async (req = request, res = response) =>{
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });
    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre } ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.userAuthenticated._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria)
}

const putCategory = async (req = request, res = response) =>{
    const { id } = req.params;
    const { usuario, estado, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.userAuthenticated._id;

    const category = await Categoria.findByIdAndUpdate( id, data, { new:true } ); //{new:true} Manda el archivo actualizado
    res.json( category )
}

const deleteCategory = async (req = request, res = response) =>{
    const { id } = req.params;
    const category = await Categoria.findByIdAndUpdate(id, {estado: false}, {new:true});
    res.json(category);

}
module.exports = {
    getcategories,
    getcategory,
    postCategory,
    putCategory,
    deleteCategory
}

