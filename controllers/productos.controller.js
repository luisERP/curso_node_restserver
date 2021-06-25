const { request, response } = require("express");
const { Producto } = require('../models')

const getProductos = async (req = request, res = response) => {
    const {desde = 0 , limite = 5} = req.query;

    const [productos, total] = await Promise.all([
        Producto.find({estado: true})
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre'),
        Producto.countDocuments({estado:true})
    ])

    res.send({
        total,
        productos
    })
}
const getProducto = async(req= request, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}

const postProducto = async (req = request, res = response) =>{
    const {estado, usuario, ...resto } = req.body;
    const productoDB = await Producto.findOne({ nombre: resto.nombre });
    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
        })
    }
    const data = {
        ...resto,
        usuario: req.userAuthenticated._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto)
}

const putProducto = async (req = request, res = response) =>{
    const { id } = req.params;
    const { usuario, estado, ...data } = req.body;

    data.usuario = req.userAuthenticated._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new:true } ); //{new:true} Manda el archivo actualizado
    res.json( producto )
}

const deleteProducto = async (req = request, res = response) =>{
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, {estado: false}, {new:true});
    res.json(producto);

}
module.exports = {
    getProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}

