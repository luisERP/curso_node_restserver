const { Router } = require('express') ;
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRol, validarArchivo } = require('../middlewares');
const { cargarArchivo, actualizarImagen, servirImagenes } = require('../controllers/uploads.controller');

const router = Router();

router.post('/',[validarArchivo], cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', "El ID no es valido").isMongoId(),
    check('coleccion').custom( c => { const coleccionesPermitidas = ['usuarios', 'productos']; if(coleccionesPermitidas.includes(c)) return true; else throw new Error(`La coleccion ${c} no esta permitida; ${coleccionesPermitidas}`) }),
    validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', "El ID no es valido").isMongoId(),
    check('coleccion').custom( c => { const coleccionesPermitidas = ['usuarios', 'productos']; if(coleccionesPermitidas.includes(c)) return true; else throw new Error(`La coleccion ${c} no esta permitida; ${coleccionesPermitidas}`) }),
    validarCampos
], servirImagenes);

module.exports = router;