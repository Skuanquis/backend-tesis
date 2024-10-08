const express = require('express');
const router = express.Router();
const simulacionController = require('../controllers/simulacionController');
const authenticateToken = require('../middlewares/authMiddlewares');

router.post('/comezar-simulacion', authenticateToken, simulacionController.comenzarSimulacion); 

router.put('/simulacion/incompleta/:id', authenticateToken, simulacionController.marcarSimulacionIncompleta);

router.put('/simulacion/finalizar/:id', authenticateToken, simulacionController.finalizarSimulacion);

router.get('/simulacion/:id', authenticateToken, simulacionController.obtenerTiempoSimulacion);
    
router.post('/simulacion/registrar-accion', authenticateToken, simulacionController.registrarAccion);

router.get('/simulacion/:id/acciones', authenticateToken, simulacionController.obtenerAcciones);

router.delete('/accion/eliminar', simulacionController.eliminarAccion);

router.get('/mensajes/:id', simulacionController.obtenerMensajes);

router.put('/enviar-diagnostico/:id_realiza_simulacion', simulacionController.enviarDiagnosticoFinal);

router.put('/realiza-simulacion/:id_simulacion', simulacionController.actualizarPuntajePorcentaje);

router.get('/simulaciones/:id_usuario', simulacionController.obtenerSimulaciones);

router.get('/info-simulaciones/:id_realiza_simulacion', simulacionController.obtenerDetallesSimulacionController);

module.exports = router;