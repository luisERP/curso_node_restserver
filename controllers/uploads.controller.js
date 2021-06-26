const path = require('path');
const fs = require('fs');

const { response, request } = require("express");

const { subirArchivo } = require('../helpers');
const { User, Producto } = require("../models");



const cargarArchivo = async(req = request, res = response) =>{

    try{
        const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombreArchivo
        })
    }catch(err){
        res.status(400).json({
            msg: err
        })
    }
}

const actualizarImagen = async(req, res = response) => {

    const { coleccion, id } = req.params;
    let model;
    switch (coleccion) {
        case 'usuarios':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe usuario con id: ${id}`
                })
            }
            break;
        case 'producto':
            model = await Producto.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe Producto con id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Funcionalidad no implementada'
            })
            break;
    }

    //Eliminar imagen anterior
    if(model.img){
        const imagenPath = path.join( __dirname, '../uploads', coleccion, model.img);
        if(fs.existsSync(imagenPath)){
            fs.unlinkSync(imagenPath);
        }
    } 

    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion);
    model.img = nombreArchivo;
    await model.save();

    res.json(model);

}

const servirImagenes = async(req, res = response) =>{

    const { coleccion, id } = req.params;
    let model;
    const imagenPLaceholder = path.join(__dirname, '../public', 'imagen-placeholder.png')
    switch (coleccion) {
        case 'usuarios':
            model = await User.findById(id);
            if(!model){
                return res.sendFile(imagenPLaceholder);
            }
            break;
        case 'producto':
            model = await Producto.findById(id);
            if(!model){
                return res.sendFile(imagenPLaceholder);
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Funcionalidad no implementada'
            })
            break;
    }

    if(model.img){
        const imagenPath = path.join( __dirname, '../uploads', coleccion, model.img);
        if(fs.existsSync(imagenPath)){
            return res.sendFile(imagenPath);
        }
    } 

    return res.sendFile(imagenPLaceholder);


}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    servirImagenes
}