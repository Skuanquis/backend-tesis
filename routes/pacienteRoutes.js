const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
//const authenticateToken = require('../middlewares/authMiddlewares');

router.get('/paciente', pacienteController.getListaPacientes);

router.get('/pacientes', pacienteController.getPacienteHistoria);

router.get('/sexo-paciente', pacienteController.getSexoPaciente);

router.get('/categorias-consulta', pacienteController.obtenerCategoriasSimulacionConsultaExterna);

router.get('/pacientes-filtrados', pacienteController.obtenerPacientesFiltrados);

module.exports = router;