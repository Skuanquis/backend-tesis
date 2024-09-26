const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');

router.get('/casos', casoController.listarCasosClinicos);

router.put('/casos/:id/estado', casoController.cambiarEstadoCaso);

router.get('/categorias', casoController.listarCategoriasSimulacion);

router.get('/casos/:id', casoController.obtenerCasoClinico);

router.get('/casos/:id_historia_clinica/puntajes', casoController.obtenerPuntajes);

router.get('/casos/:id_caso_clinico/mensajes', casoController.obtenerMensajes);

router.put('/puntajes/:id', casoController.actualizarPuntaje);

router.put('/mensajes/:id', casoController.actualizarMensaje);

router.put('/casos/:id', casoController.actualizarCasoClinico);

router.post('/puntajes', casoController.agregarPuntaje);

router.delete('/puntajes/:id', casoController.eliminarPuntaje);

router.post('/mensajes', casoController.agregarMensaje);

router.delete('/mensajes/:id', casoController.eliminarMensaje);

router.get('/paciente/:id_historia_clinica', casoController.obtenerPaciente);

router.put('/paciente/:id_paciente', casoController.actualizarPaciente);

router.get('/antecedentes_patologicos/:id_historia_clinica', casoController.obtenerAntecedentesPatologicos);

router.put('/antecedentes_patologicos/:id', casoController.actualizarAntecedentesPatologicos);

router.get('/antecedentes_no_patologicos/:id_historia_clinica', casoController.obtenerAntecedentesNoPatologicos);

router.put('/antecedentes_no_patologicos/:id', casoController.actualizarAntecedentesNoPatologicos);

router.get('/antecedentes_familiares/:id_historia_clinica', casoController.obtenerAntecedentesFamiliares);

router.put('/antecedentes_familiares/:id', casoController.actualizarAntecedentesFamiliares);

router.get('/anamnesis_sistemas/:id_historia_clinica', casoController.obtenerAnamnesisSistemas);

router.put('/anamnesis_sistemas/:id', casoController.actualizarAnamnesisSistemas);

router.get('/motivos_consulta/:id_historia_clinica', casoController.obtenerMotivosConsulta);

router.post('/motivos_consulta', casoController.agregarMotivoConsulta);

router.delete('/motivos_consulta/:id', casoController.eliminarMotivoConsulta);

router.get('/puntaje/:id_historia_clinica', casoController.obtenerPuntaje);

router.put('/motivos_consulta/:id', casoController.actualizarMotivoConsulta);

module.exports = router;
