const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracionController');
//const authenticateToken = require('../middlewares/authMiddlewares');
router.get('/configuracion-diagnosticos', configuracionController.obtenerDiagnosticosDiferencialesPorCategoria);

router.delete('/configuracion-diagnosticos/:id_diagnostico', configuracionController.eliminarDiagnostico);

router.put('/configuracion-diagnosticos/:id_diagnostico', configuracionController.actualizarDiagnostico);

router.post('/configuracion-diagnosticos', configuracionController.agregarDiagnostico);

router.post('/configuracion-categorias', configuracionController.agregarCategoriaConDiagnosticos);

router.get('/configuracion-medicamentos', configuracionController.obtenerMedicamentosPorCategoria);

router.delete('/configuracion-medicamentos/:id_medicamento', configuracionController.eliminarMedicamento);

router.put('/configuracion-medicamentos/:id_medicamento', configuracionController.actualizarMedicamento);

router.post('/configuracion-medicamentos', configuracionController.agregarMedicamento);

router.post('/configuracion-categorias-medicamentos', configuracionController.agregarCategoriaConMedicamentos);

router.get('/subespecialidades', configuracionController.obtenerSubespecialidades);

router.post('/subespecialidades', configuracionController.agregarSubespecialidad);

router.put('/subespecialidades/:id_subespecialidad', configuracionController.actualizarSubespecialidad);

router.delete('/subespecialidades/:id_subespecialidad', configuracionController.eliminarSubespecialidad);

router.get('/categorias-imagenologia', configuracionController.obtenerCategoriasImagenologia);

router.post('/categorias-imagenologia', configuracionController.agregarCategoriaImagenologia);

router.put('/categorias-imagenologia/:id_categoria_imagenologia', configuracionController.actualizarCategoriaImagenologia);

router.delete('/categorias-imagenologia/:id_categoria_imagenologia', configuracionController.eliminarCategoriaImagenologia);


module.exports = router;