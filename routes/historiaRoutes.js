const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historiaController');
//const authenticateToken = require('../middlewares/authMiddlewares');

router.get('/historias', historiaController.getListaHistoriasClinicas);

router.get('/info-historia/:id', historiaController.getInfoHistoria);

router.get('/examen-fisico/:id', historiaController.getExamenFisicoGeneral);

router.get('/examen-fisico-segmentario/:id', historiaController.getExamenFisicoSegmentario);

router.get('/examen-obstetrico/:id', historiaController.getExamenObstetrico);

router.get('/laboratorio-fisico-orina/:id', historiaController.getExamenFisicoOrina);

router.get('/laboratorio-sedimento-urinario/:id', historiaController.getExamenSedimentoUrinario);

router.get('/laboratorio-quimico-urinario/:id', historiaController.getExamenQuimicoUrinario);

router.get('/laboratorio-especial-urinario/:id', historiaController.getExamenesEspecialesOrina);

module.exports = router;