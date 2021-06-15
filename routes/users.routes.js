const { Router } = require('express') ;
const { getUsers, postUser, putUser, deleteUser } = require('../controllers/users.controller');


const router = Router();

// ROUTES
router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);



module.exports = router;
