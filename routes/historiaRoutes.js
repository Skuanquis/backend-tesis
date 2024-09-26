const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historiaController');
const authenticateToken = require('../middlewares/authMiddlewares');

router.get('/historias', historiaController.getListaHistoriasClinicas);

router.get('/info-historia/:id', historiaController.getInfoHistoria);

router.get('/examen-fisico/:id', historiaController.getExamenFisicoGeneral);

router.get('/examen-fisico-segmentario/:id', historiaController.getExamenFisicoSegmentario);

router.get('/examen-fisico-segmentario-cabeza/:id', historiaController.getExamenFisicoSegmentarioCabeza);

router.get('/examen-fisico-segmentario-cuello/:id', historiaController.getExamenFisicoSegmentarioCuello);

router.get('/examen-fisico-segmentario-torax/:id', historiaController.getExamenFisicoSegmentarioTorax);

router.get('/examen-fisico-segmentario-corazon/:id', historiaController.getExamenFisicoSegmentarioCorazon);

router.get('/examen-fisico-segmentario-mamas/:id', historiaController.getExamenFisicoSegmentarioMamas);

router.get('/examen-fisico-segmentario-abdomen/:id', historiaController.getExamenFisicoSegmentarioAbdomen);

router.get('/examen-fisico-segmentario-genitourinario/:id', historiaController.getExamenFisicoSegmentarioGenitourinario);

router.get('/examen-fisico-segmentario-extremidades/:id', historiaController.getExamenFisicoSegmentarioExtremidades);

router.get('/examen-fisico-segmentario-neurologico/:id', historiaController.getExamenFisicoSegmentarioNeurologico);

router.get('/examen-obstetrico/:id', historiaController.getExamenObstetrico);

router.get('/laboratorio-fisico-orina/:id', historiaController.getExamenFisicoOrina);

router.get('/laboratorio-sedimento-urinario/:id', historiaController.getExamenSedimentoUrinario);

router.get('/laboratorio-quimico-urinario/:id', historiaController.getExamenQuimicoUrinario);

router.get('/laboratorio-especial-urinario/:id', historiaController.getExamenesEspecialesOrina);

router.get('/laboratorio-biometria-hematica/:id', historiaController.getExamenBiometriaHematica);

router.get('/laboratorio-recuento-diferencial-hematico/:id', historiaController.getExamenRecuentoDiferencialHematico);

router.get('/laboratorio-indice-eritrocitario/:id', historiaController.getExamenIndiceEritrocitario);

router.get('/laboratorio-quimico-sanguineo/:id', historiaController.getExamenQuimicoSanguineo);

router.get('/laboratorio-hemostasea-sanguinea/:id', historiaController.getExamenHemostaseaSanguinea);

router.get('/laboratorio-serologia-sanguinea/:id', historiaController.getExamenSerologiaSanguinea);

router.get('/laboratorio-electrolitos-sanguineos/:id', historiaController.getExamenElectrolitosSanquineos);

router.get('/imagen', historiaController.getExamenImagenPrueba);

router.get('/anamnesis-tegumentario/:id', historiaController.getAnamnesisTegumentario);

router.get('/anamnesis-cardiovascular/:id', historiaController.getAnamnesisCardiovascular);

router.get('/anamnesis-endocrino/:id', historiaController.getAnamnesisEndocrino);

router.get('/anamnesis-gastrointestinal/:id', historiaController.getAnamnesisGastrointestinal);

router.get('/anamnesis-genitourinario/:id', historiaController.getAnamnesisGenitourinario);

router.get('/anamnesis-hematico/:id', historiaController.getAnamnesisHematico);

router.get('/anamnesis-locomotor/:id', historiaController.getAnamnesisLocomotor);

router.get('/anamnesis-neurologico/:id', historiaController.getAnamnesisNeurologico);

router.get('/anamnesis-psquiatrico/:id', historiaController.getAnamnesisPsiquiatrico);

router.get('/anamnesis-respiratorio/:id', historiaController.getAnamnesisRespiratorio);

router.get('/diferencial/diagnosticos/:id', authenticateToken, historiaController.getDiagnosticosDiferencialesPorHistoriaClinica);

module.exports = router;