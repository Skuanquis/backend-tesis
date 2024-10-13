const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');
//const authenticateToken = require('../middlewares/authMiddlewares');

router.get('/grupos/:id_usuario_medico/:rol', grupoController.obtenerGrupos);

router.post('/grupo', grupoController.crearGrupo);

router.put('/grupo/:id_grupo', grupoController.actualizarGrupo);

router.delete('/grupo/:id_grupo', grupoController.eliminarGrupo);

router.post('/matricular', grupoController.matricularEstudiante);

router.post('/desvincular', grupoController.desvincularEstudiante);

router.get('/matriculados/:id_usuario_estudiante', grupoController.obtenerGruposMatriculados);

router.get('/no-matriculados/:id_usuario_estudiante', grupoController.obtenerGruposNoMatriculados);

router.post('/validar-codigo', grupoController.validarCodigoAcceso);

router.get('/estudiantes/:id_grupo', grupoController.obtenerEstudiantesPorGrupo);

module.exports = router;