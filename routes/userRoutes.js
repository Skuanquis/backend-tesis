const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddlewares');

router.post('/login', userController.loginUser);

router.get('/info', authenticateToken, userController.getUserInfo);

router.get('/info/:id', authenticateToken, userController.getUserById);

router.put('/perfil', authenticateToken, userController.updateUserProfile); 

router.put('/password', authenticateToken, userController.updateUserPassword); 

router.post('/registrar-usuario', userController.createUser); 

router.get('/usuarios', authenticateToken, userController.getUsuarios);

router.put('/usuario/:id', userController.updateUsuario);

module.exports = router;