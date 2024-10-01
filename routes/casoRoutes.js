const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');
const multer = require('multer');
const path = require('path');

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

router.get('/categoria_medicamento', casoController.obtenerCategoriasMedicamentos);

router.get('/medicamento/:id_categoria_medicamento', casoController.obtenerMedicamentosPorCategoria);

router.get('/medicamentos_suministrados/:id_historia_clinica', casoController.obtenerMedicamentosSuministradosPorHistoriaClinica);

router.put('/medicamentos_suministrados/:id_historia_clinica', casoController.actualizarMedicamentosSuministrados);

router.get('/subespecialidades', casoController.obtenerSubespecialidades);

router.get('/consulta_externa/historia_clinica/:id_historia_clinica', casoController.obtenerSubespecialidadesPorHistoriaClinica);

router.post('/consulta_externa/historia_clinica/:id_historia_clinica', casoController.actualizarSubespecialidades);

router.get('/examen_fisico_orina/:id_historia_clinica', casoController.obtenerExamenFisicoOrina);

router.put('/examen_fisico_orina/:id_historia_clinica', casoController.actualizarExamenFisicoOrina);

router.get('/examen_fisico_orina/:id_historia_clinica', casoController.obtenerExamenFisicoOrina);

router.put('/examen_fisico_orina/:id_historia_clinica', casoController.actualizarExamenFisicoOrina);

router.get('/sedimento_urinario/:id_historia_clinica', casoController.obtenerSedimentoUrinario);

router.put('/sedimento_urinario/:id_historia_clinica', casoController.actualizarSedimentoUrinario);

router.get('/examen_quimico_urinario/:id_historia_clinica', casoController.obtenerExamenQuimicoUrinario);

router.put('/examen_quimico_urinario/:id_historia_clinica', casoController.actualizarExamenQuimicoUrinario);

router.get('/examen_especial_orina/:id_historia_clinica', casoController.obtenerExamenEspecialOrina);

router.put('/examen_especial_orina/:id_historia_clinica', casoController.actualizarExamenEspecialOrina);

router.get('/examen_hematologico/:id_historia_clinica', casoController.obtenerExamenHematologico);

router.put('/examen_hematologico/:id_historia_clinica', casoController.actualizarExamenHematologico);

router.get('/biometria_hematica/:id_examen_hematologico', casoController.obtenerBiometriaHematica);

router.put('/biometria_hematica/:id_examen_hematologico', casoController.actualizarBiometriaHematica);

router.get('/indices_eritrocitarios/:id_examen_hematologico', casoController.obtenerIndicesEritrocitarios);

router.put('/indices_eritrocitarios/:id_examen_hematologico', casoController.actualizarIndicesEritrocitarios);

router.get('/recuento_diferencial_hematico/:id_examen_hematologico', casoController.obtenerRecuentoDiferencialHematico);

router.put('/recuento_diferencial_hematico/:id_examen_hematologico', casoController.actualizarRecuentoDiferencialHematico);

router.get('/hemostasia_sanguinea/:id_examen_sanguineo', casoController.obtenerHemostasiaSanguinea);

router.put('/hemostasia_sanguinea/:id_examen_sanguineo', casoController.actualizarHemostasiaSanguinea);

router.get('/serologia_sanguinea/:id_examen_sanguineo', casoController.obtenerSerologiaSanguinea);

router.put('/serologia_sanguinea/:id_examen_sanguineo', casoController.actualizarSerologiaSanguinea);

router.get('/electrolitos_sanguineos/:id_examen_sanguineo', casoController.obtenerElectrolitosSanguineos);

router.put('/electrolitos_sanguineos/:id_examen_sanguineo', casoController.actualizarElectrolitosSanguineos);

router.get('/quimica_sanguinea/:id_examen_sanguineo', casoController.obtenerQuimicaSanguinea);

router.put('/quimica_sanguinea/:id_examen_sanguineo', casoController.actualizarQuimicaSanguinea);

router.get('/categorias_imagenologia', casoController.obtenerCategoriasImagenologia);

router.get('/imagenes/:id_historia_clinica', casoController.obtenerImagenesPorHistoriaClinica);

router.post('/imagenes/:id_historia_clinica', casoController.actualizarImagenes);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage });


router.post('/upload_imagen', upload.single('imagen'), casoController.cargarImagen);

router.get('/traspaso/:id_historia_clinica', casoController.obtenerTraspaso);

router.put('/traspaso/:id_historia_clinica', casoController.actualizarTraspaso);

router.put('/diagnostico-final/:id_historia_clinica', casoController.actualizarDiagnosticoFinal);

router.get('/traspaso-rubrica/:id_historia_clinica', casoController.obtenerTraspasoRubrica);
module.exports = router;
