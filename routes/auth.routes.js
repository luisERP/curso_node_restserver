const { Router } = require('express') ;
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// ROUTES
router.post('/login',[
    check("correo", "EL correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),

    validarCampos
], login);




module.exports = router;
