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

const obtenerCategoriasImagenologia = (req, res) => {
    configuracionModel.obtenerCategoriasImagenologia((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

const agregarCategoriaImagenologia = (req, res) => {
    const { nombre } = req.body;
    configuracionModel.agregarCategoriaImagenologia(nombre, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Categoría de imagenología agregada correctamente", id_categoria_imagenologia: result.insertId });
    });
};

const actualizarCategoriaImagenologia = (req, res) => {
    const { id_categoria_imagenologia } = req.params;
    const { nombre } = req.body;
    configuracionModel.actualizarCategoriaImagenologia(id_categoria_imagenologia, nombre, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: "Categoría de imagenología actualizada correctamente" });
    });
};

const eliminarCategoriaImagenologia = (req, res) => {
    const { id_categoria_imagenologia } = req.params;
    configuracionModel.eliminarCategoriaImagenologia(id_categoria_imagenologia, (err, result) => {
        if (err) {
            console.error(`Error al eliminar categoría con id ${id_categoria_imagenologia}:`, err);
            return res.status(400).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Categoría de imagenología no encontrada" });
        }
        res.status(200).json({ message: "Categoría de imagenología eliminada correctamente" });
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
    obtenerCategoriasImagenologia,
    agregarCategoriaImagenologia,
    actualizarCategoriaImagenologia,
    eliminarCategoriaImagenologia
};