const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
//const authenticateToken = require('../middlewares/authMiddlewares');

router.get('/paciente', pacienteController.getListaPacientes);
router.get('/pacientes', pacienteController.getPacienteHistoria);

module.exports = router;