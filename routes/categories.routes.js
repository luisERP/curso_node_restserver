const { Router } = require('express') ;
const { check } = require('express-validator');

const { getcategories, getcategory, postCategory, putCategory, deleteCategory } = require('../controllers/categories.controller');

const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarCampos, validarJWT, esAdminRol } = require('../middlewares');

const router = Router();

router.get('/', getcategories);

router.get('/:id',[
    check('id', "El id es obligatorio").not().isEmpty(),
    check('id', "El id no es valido -isMongoID").isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], getcategory);

router.post('/',[
    validarJWT,
    check('nombre', "EL nombre es obligatorio").not().isEmpty(),
    validarCampos
], postCategory);

router.put('/:id',[
    validarJWT,
    check('id', "El id es obligatorio").not().isEmpty(),
    check('id', "El id no es valido -isMongoID").isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', "El nombre es obligatorio").not().isEmpty(),

    validarCampos

], putCategory);

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', "El id es obligatorio").not().isEmpty(),
    check('id', "El id no es valido -isMongoID").isMongoId(),
    check('id').custom( existeCategoriaPorId ),

    validarCampos
], deleteCategory);


module.exports = router;