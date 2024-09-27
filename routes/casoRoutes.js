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

router.get('/examen_fisico_general/:id_historia_clinica', casoController.obtenerExamenFisicoGeneral);

router.put('/examen_fisico_general/:id_examen_fisico_general', casoController.actualizarExamenFisicoGeneral);

router.get('/examen_fisico_segmentario/:id_historia_clinica', casoController.obtenerExamenFisicoSegmentario);

router.put('/examen_fisico_segmentario/:id_historia_clinica', casoController.actualizarExamenFisicoSegmentario);

router.get('/examen_piel/:id_historia_clinica', casoController.obtenerExamenPiel);

router.put('/examen_piel/:id_examen_piel', casoController.actualizarExamenPiel);

router.get('/examen_circulatorio/:id_historia_clinica', casoController.obtenerExamenCirculatorio);

router.put('/examen_circulatorio/:id_examen_circulatorio', casoController.actualizarExamenCirculatorio);

router.get('/examen_respiratorio/:id_historia_clinica', casoController.obtenerExamenRespiratorio);

router.put('/examen_respiratorio/:id_examen_respiratorio', casoController.actualizarExamenRespiratorio);

router.get('/examen_via_aerea/:id_historia_clinica', casoController.obtenerExamenViaAerea);

router.put('/examen_via_aerea/:id_examen_via_aerea', casoController.actualizarExamenViaAerea);

router.get('/examen_psicologico/:id_historia_clinica', casoController.obtenerExamenPsicologico);

router.put('/examen_psicologico/:id_examen_psicologico', casoController.actualizarExamenPsicologico);

router.get('/examen_obstetrico/:id_historia_clinica', casoController.obtenerExamenObstetrico);

router.put('/examen_obstetrico/:id_historia_clinica', casoController.actualizarExamenObstetrico);

router.get('/signos_vitales/:id_historia_clinica', casoController.obtenerSignosVitales);

router.put('/signos_vitales/:id_historia_clinica', casoController.actualizarSignosVitales);

router.get('/categoria_diferencial', casoController.obtenerCategoriasDiferenciales);

router.get('/diagnostico/:id_categoria_diferencial', casoController.obtenerDiagnosticosPorCategoria);

router.get('/diagnosticos_diferenciales/:id_historia_clinica', casoController.obtenerDiagnosticosDiferencialesPorHistoriaClinica);

router.put('/diagnosticos_diferenciales/:id_historia_clinica', casoController.actualizarDiagnosticosDiferenciales);



module.exports = router;
