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

router.get('/configuracion-imagenologias', configuracionController.obtenerImagenologiasPorCategoria);

router.delete('/configuracion-imagenologias/:id_imagenologia', configuracionController.eliminarImagenologia);

router.put('/configuracion-imagenologias/:id_imagenologia', configuracionController.actualizarImagenologia);

router.post('/configuracion-imagenologias', configuracionController.agregarImagenologia);

router.post('/configuracion-imagenologias-con-categoria', configuracionController.agregarCategoriaConImagenologias);

router.get('/configuracion-procedimientos', configuracionController.obtenerProcedimientosPorCategoria);

router.delete('/configuracion-procedimientos/:id_procedimiento', configuracionController.eliminarProcedimiento);

router.put('/configuracion-procedimientos/:id_procedimiento', configuracionController.actualizarProcedimiento);

router.post('/configuracion-procedimientos', configuracionController.agregarProcedimiento);

router.post('/configuracion-procedimientos-con-categoria', configuracionController.agregarCategoriaConProcedimientos);

router.get('/configuracion-analisis', configuracionController.obtenerCategoriasConSubcategorias);

router.delete('/configuracion-analisis/:id_subcategoria_analisis', configuracionController.eliminarSubcategoria);

router.put('/configuracion-analisis/:id_subcategoria_analisis', configuracionController.actualizarSubcategoria);

router.post('/configuracion-analisis', configuracionController.agregarSubcategoria);

router.post('/configuracion-analisis-con-categoria', configuracionController.agregarCategoriaConSubcategorias);
    

module.exports = router;