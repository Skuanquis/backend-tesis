const express = require('express');
const router = express.Router();
const casoController = require('../controllers/casoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs')

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

router.get('/antecedentes_gineco_obstetricos/:id_historia_clinica', casoController.obtenerAntecedentesGinecoObstetricos);

router.put('/antecedentes_gineco_obstetricos/:id', casoController.actualizarAntecedentesGinecoObstetricos);

router.get('/anamnesis_sistemas/:id_historia_clinica', casoController.obtenerAnamnesisSistemas);

router.put('/anamnesis_sistemas/:id', casoController.actualizarAnamnesisSistemas);

router.get('/motivos_consulta/:id_historia_clinica', casoController.obtenerMotivosConsulta);

router.post('/motivos_consulta', casoController.agregarMotivoConsulta);

router.delete('/motivos_consulta/:id', casoController.eliminarMotivoConsulta);

router.get('/puntaje/:id_historia_clinica', casoController.obtenerPuntaje);

router.put('/motivos_consulta/:id', casoController.actualizarMotivoConsulta);

router.get('/examen_fisico_general/:id_historia_clinica', casoController.obtenerExamenFisicoGeneral);

router.put('/examen_fisico_general/:id_historia_clinica', casoController.actualizarExamenFisicoGeneral);

router.get('/examen_fisico_segmentario/:id_historia_clinica', casoController.obtenerExamenFisicoSegmentario);

router.put('/examen_fisico_segmentario/:id_historia_clinica', casoController.actualizarExamenFisicoSegmentario);

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

router.get('/categoria_procedimiento', casoController.obtenerCategoriasProcedimientos);

router.get('/procedimiento/:id_categoria_procedimiento', casoController.obtenerProcedimientosPorCategoria);

router.get('/procedimientos_asignados/:id_historia_clinica', casoController.obtenerProcedimientosAsignadosPorHistoriaClinica);

router.put('/procedimientos_asignados/:id_historia_clinica', casoController.actualizarProcedimientosAsignados);

router.get('/categoria_analisis', casoController.obtenerCategoriasAnalisis);

router.get('/subcategoria_analisis/:id_categoria_analisis', casoController.obtenerSubcategoriasPorCategoria);

router.get('/solicitudes_analisis/:id_historia_clinica', casoController.obtenerSolicitudesAnalisisPorHistoriaClinica);

router.post('/solicitudes_analisis/:id_historia_clinica', casoController.actualizarSolicitudesAnalisis);

router.get('/subespecialidades', casoController.obtenerSubespecialidades);

router.get('/consulta_externa/historia_clinica/:id_historia_clinica', casoController.obtenerSubespecialidadesPorHistoriaClinica);

router.post('/consulta_externa/historia_clinica/:id_historia_clinica', casoController.actualizarSubespecialidades);

router.get('/categorias_con_imagenologias', casoController.obtenerCategoriasConImagenologias);

router.get('/estudios_imagenologia/:id_historia_clinica', casoController.obtenerEstudiosImagenologiaPorHistoriaClinica);

router.post('/estudios_imagenologia/:id_historia_clinica', casoController.actualizarEstudiosImagenologia);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'public/uploads/tmp'; 
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            } else {
                cb(null, uploadPath);
            }
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/upload_imagen', upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'sistema', maxCount: 1 }
]), casoController.cargarImagen);

router.post('/upload_imagen_categoria', upload.fields([
    { name: 'imagen', maxCount: 1 }
]), casoController.cargarImagenCategoria);

router.get('/traspaso/:id_historia_clinica', casoController.obtenerTraspaso);

router.put('/traspaso/:id_historia_clinica', casoController.actualizarTraspaso);

router.put('/diagnostico-final/:id_historia_clinica', casoController.actualizarDiagnosticoFinal);

router.get('/traspaso-rubrica/:id_historia_clinica', casoController.obtenerTraspasoRubrica);

router.put('/anamnesis-puntaje/:id_historia_clinica', casoController.actualizarPuntajeAnamnesis);

router.put('/examen-puntaje/:id_historia_clinica', casoController.actualizarPuntajeExamen);

router.put('/diferencial-puntaje/:id_historia_clinica', casoController.actualizarPuntajeDiferencial);

router.put('/laboratorio-puntaje/:id_historia_clinica', casoController.actualizarPuntajeLaboratorio);

router.put('/intervenir-puntaje/:id_historia_clinica', casoController.actualizarPuntajeIntervenir);

router.put('/externa-puntaje/:id_historia_clinica', casoController.actualizarPuntajeExterna );

router.put('/traspaso-puntaje/:id_historia_clinica', casoController.actualizarPuntajeTraspaso);

router.get('/anamnesis-puntaje/:id_historia_clinica', casoController.obtenerPuntajeAnamnesis);

router.get('/examen-puntaje/:id_historia_clinica', casoController.obtenerPuntajeExamen);

router.get('/diferencial-puntaje/:id_historia_clinica', casoController.obtenerPuntajeDiferencial);

router.get('/laboratorio-puntaje/:id_historia_clinica', casoController.obtenerPuntajeLaboratorio);

router.get('/intervenir-puntaje/:id_historia_clinica', casoController.obtenerPuntajeIntervenir);

router.get('/externa-puntaje/:id_historia_clinica', casoController.obtenerPuntajeExterna );

router.get('/traspaso-puntaje/:id_historia_clinica', casoController.obtenerPuntajeTraspaso);

router.get('/puntaje-total/:id_historia_clinica', casoController.obtenerPuntajeTotalHistoriaClinica);

router.get('/puntaje-accion/:id_simulacion', casoController.obtenerPuntajeAccionSimulacion);

module.exports = router;
