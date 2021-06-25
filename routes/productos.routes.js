const { Router } = require('express') ;
const { check } = require('express-validator');

const { getProductos, getProducto, postProducto, putProducto, deleteProducto } = require('../controllers/productos.controller');

const { existeProductoPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRol } = require('../middlewares');

const router = Router();

router.get('/', getProductos);

router.get('/:id',[
    check('id', "El id es obligatorio").not().isEmpty(),
    check('id', "El id no es valido -isMongoID").isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], getProducto);

router.post('/',[
    validarJWT,
    check('nombre', "EL nombre es obligatorio").not().isEmpty(),
    check('categoria', "La categoria es obligatoria").not().isEmpty(),
    validarCampos
], postProducto);

router.put('/:id',[
    validarJWT,
    check('id', "El id es obligatorio").not().isEmpty(),
    check('id', "El id no es valido -isMongoID").isMongoId(),
    check('id').custom( existeProductoPorId ),

    validarCampos

], putProducto);

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', "El id es obligatorio").not().isEmpty(),
    check('id', "El id no es valido -isMongoID").isMongoId(),
    check('id').custom( existeProductoPorId ),

    validarCampos
], deleteProducto);


module.exports = router;