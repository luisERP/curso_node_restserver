const { Router } = require('express') ;
const { check } = require('express-validator');
const { buscar } = require('../controllers/buscar.controller');
const { validarCampos } = require('../middlewares');

const router = Router();

// ROUTES
router.get('/:coleccion/:termino', buscar);




module.exports = router;
