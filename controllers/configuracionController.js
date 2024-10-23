const configuracionModel = require('../models/configuracionModel');

const obtenerDiagnosticosDiferencialesPorCategoria = (req, res) => {
    configuracionModel.obtenerDiagnosticosPorCategoria((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const eliminarDiagnostico = (req, res) => {
    const { id_diagnostico } = req.params;
    configuracionModel.eliminarDiagnostico(id_diagnostico, (err, result) => {
        if (err) {
            console.error(`Error al eliminar diagnóstico con id ${id_diagnostico}:`, err);
            return res.status(400).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Diagnóstico no encontrado" });
        }
        res.status(200).json({ message: "Diagnóstico eliminado correctamente" });
    });
};

const actualizarDiagnostico = (req, res) => {
    const { id_diagnostico } = req.params;
    const { nombre } = req.body; // Solo nombre
    configuracionModel.actualizarDiagnostico(id_diagnostico, nombre, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Diagnóstico actualizado correctamente" });
    });
};

const agregarDiagnostico = (req, res) => {
    const { id_categoria_diferencial, nombre } = req.body;
    configuracionModel.agregarDiagnostico(id_categoria_diferencial, nombre, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Diagnóstico agregado correctamente", id: result.insertId });
    });
};


const agregarCategoriaConDiagnosticos = (req, res) => {
    const { categoria, diagnosticos } = req.body;
    if (!categoria || !Array.isArray(diagnosticos) || diagnosticos.length === 0) {
        return res.status(400).json({ error: "La categoría y al menos un diagnóstico son requeridos" });
    }
    const diagnosticosValidos = diagnosticos.filter(d => d && d.trim() !== '');
    if (diagnosticosValidos.length === 0) {
        return res.status(400).json({ error: "Debe proporcionar al menos un diagnóstico válido" });
    }

    configuracionModel.agregarCategoriaConDiagnosticos(categoria, diagnosticosValidos, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({
            message: "Categoría y diagnósticos agregados correctamente",
            id_categoria_diferencial: result.id_categoria_diferencial,
            ids_diagnosticos: result.ids_diagnosticos
        });
    });
};

const obtenerMedicamentosPorCategoria = (req, res) => {
    configuracionModel.obtenerMedicamentosPorCategoria((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const eliminarMedicamento = (req, res) => {
    const { id_medicamento } = req.params;
    configuracionModel.eliminarMedicamento(id_medicamento, (err, result) => {
        if (err) {
            console.error(`Error al eliminar medicamento con id ${id_medicamento}:`, err);
            return res.status(400).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Medicamento no encontrado" });
        }
        res.status(200).json({ message: "Medicamento eliminado correctamente" });
    });
};

const actualizarMedicamento = (req, res) => {
    const { id_medicamento } = req.params;
    const { nombre } = req.body; // Solo nombre
    configuracionModel.actualizarMedicamento(id_medicamento, nombre, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Medicamento actualizado correctamente" });
    });
};

const agregarMedicamento = (req, res) => {
    const { id_categoria_medicamento, nombre } = req.body; // Solo nombre
    configuracionModel.agregarMedicamento(id_categoria_medicamento, nombre, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Medicamento agregado correctamente", id: result.insertId });
    });
};

const agregarCategoriaConMedicamentos = (req, res) => {
    const { categoria, medicamentos } = req.body;
    if (!categoria || !Array.isArray(medicamentos) || medicamentos.length === 0) {
        return res.status(400).json({ error: "La categoría y al menos un medicamento son requeridos" });
    }
    const medicamentosValidos = medicamentos.filter(m => m && m.trim() !== '');
    if (medicamentosValidos.length === 0) {
        return res.status(400).json({ error: "Debe proporcionar al menos un medicamento válido" });
    }

    configuracionModel.agregarCategoriaConMedicamentos(categoria, medicamentosValidos, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({
            message: "Categoría y medicamentos agregados correctamente",
            id_categoria_medicamento: result.id_categoria_medicamento,
            ids_medicamentos: result.ids_medicamentos
        });
    });
};

const obtenerSubespecialidades = (req, res) => {
    configuracionModel.obtenerSubespecialidades((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

const agregarSubespecialidad = (req, res) => {
    const { nombre } = req.body;
    configuracionModel.agregarSubespecialidad(nombre, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Subespecialidad agregada correctamente", id_subespecialidad: result.insertId });
    });
};

const actualizarSubespecialidad = (req, res) => {
    const { id_subespecialidad } = req.params;
    const { nombre } = req.body;
    configuracionModel.actualizarSubespecialidad(id_subespecialidad, nombre, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Subespecialidad actualizada correctamente" });
    });
};

const eliminarSubespecialidad = (req, res) => {
    const { id_subespecialidad } = req.params;
    configuracionModel.eliminarSubespecialidad(id_subespecialidad, (err, result) => {
        if (err) {
            console.error(`Error al eliminar subespecialidad con id ${id_subespecialidad}:`, err);
            return res.status(400).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Subespecialidad no encontrada" });
        }
        res.status(200).json({ message: "Subespecialidad eliminada correctamente" });
    });
};

const obtenerImagenologiasPorCategoria = (req, res) => {
    configuracionModel.obtenerImagenologiasPorCategoria((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const eliminarImagenologia = (req, res) => {
    const { id_imagenologia } = req.params;
    configuracionModel.eliminarImagenologia(id_imagenologia, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Imagenología eliminada correctamente" });
    });
};

const actualizarImagenologia = (req, res) => {
    const { id_imagenologia } = req.params;
    const { nombre } = req.body;
    configuracionModel.actualizarImagenologia(id_imagenologia, nombre, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Imagenología actualizada correctamente" });
    });
};

const agregarImagenologia = (req, res) => {
    const { id_categoria_imagenologia, nombre } = req.body;
    configuracionModel.agregarImagenologia(id_categoria_imagenologia, nombre, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Imagenología agregada correctamente", id_imagenologia: result.insertId });
    });
};

const agregarCategoriaConImagenologias = (req, res) => {
    const { categoria, imagenologias } = req.body;
    configuracionModel.agregarCategoriaConImagenologias(categoria, imagenologias, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerProcedimientosPorCategoria = (req, res) => {
    configuracionModel.obtenerProcedimientosPorCategoria((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

const eliminarProcedimiento = (req, res) => {
    const { id_procedimiento } = req.params;
    configuracionModel.eliminarProcedimiento(id_procedimiento, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Procedimiento eliminado correctamente' });
    });
};

const actualizarProcedimiento = (req, res) => {
    const { id_procedimiento } = req.params;
    const { nombre } = req.body;
    configuracionModel.actualizarProcedimiento(id_procedimiento, nombre, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Procedimiento actualizado correctamente' });
    });
};

const agregarProcedimiento = (req, res) => {
    const { id_categoria_procedimiento, nombre } = req.body;
    configuracionModel.agregarProcedimiento(id_categoria_procedimiento, nombre, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Procedimiento agregado correctamente', id: result.insertId });
    });
};

const agregarCategoriaConProcedimientos = (req, res) => {
    const { categoria, procedimientos } = req.body;
    configuracionModel.agregarCategoriaConProcedimientos(categoria, procedimientos, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Categoría y procedimientos agregados correctamente', result });
    });
};

const obtenerCategoriasConSubcategorias = (req, res) => {
    configuracionModel.obtenerCategoriasConSubcategorias((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const eliminarSubcategoria = (req, res) => {
    const { id_subcategoria_analisis } = req.params;
    configuracionModel.eliminarSubcategoria(id_subcategoria_analisis, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Subcategoría eliminada correctamente" });
    });
};

const actualizarSubcategoria = (req, res) => {
    const { id_subcategoria_analisis } = req.params;
    const { nombre_subcategoria } = req.body;
    configuracionModel.actualizarSubcategoria(id_subcategoria_analisis, nombre_subcategoria, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Subcategoría actualizada correctamente" });
    });
};

const agregarSubcategoria = (req, res) => {
    const { id_categoria_analisis, nombre_subcategoria } = req.body;
    configuracionModel.agregarSubcategoria(id_categoria_analisis, nombre_subcategoria, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Subcategoría agregada correctamente", id_subcategoria_analisis: result.insertId });
    });
};

const agregarCategoriaConSubcategorias = (req, res) => {
    const { categoria, subcategorias } = req.body;
    configuracionModel.agregarCategoriaConSubcategorias(categoria, subcategorias, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Categoría y subcategorías agregadas correctamente", id_categoria_analisis: result.id_categoria_analisis });
    });
};

module.exports = {
    obtenerDiagnosticosDiferencialesPorCategoria,
    eliminarDiagnostico,
    actualizarDiagnostico,
    agregarDiagnostico,
    agregarCategoriaConDiagnosticos,
    obtenerMedicamentosPorCategoria,
    eliminarMedicamento,
    actualizarMedicamento,
    agregarMedicamento,
    agregarCategoriaConMedicamentos,
    obtenerSubespecialidades,
    agregarSubespecialidad,
    actualizarSubespecialidad,
    eliminarSubespecialidad,
    obtenerImagenologiasPorCategoria,
    eliminarImagenologia,
    actualizarImagenologia,
    agregarImagenologia,
    agregarCategoriaConImagenologias,
    obtenerProcedimientosPorCategoria,
    eliminarProcedimiento,
    actualizarProcedimiento,
    agregarProcedimiento,
    agregarCategoriaConProcedimientos,
    obtenerCategoriasConSubcategorias,
    eliminarSubcategoria,
    actualizarSubcategoria,
    agregarSubcategoria,
    agregarCategoriaConSubcategorias
};