const { Router } = require('express') ;
const { check } = require('express-validator');

const { getUsers, postUser, putUser, deleteUser } = require('../controllers/users.controller');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// ROUTES
router.get('/', getUsers);
router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener mas de 6 letras').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( esRolValido ),
    check('correo').custom ( emailExiste ),
    validarCampos
    
], postUser);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),    

    validarCampos
], putUser);

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),

    validarCampos
],deleteUser);



module.exports = router;
