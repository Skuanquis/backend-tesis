const casoModel = require('../models/casoModel');

const listarCasosClinicos = (req, res) => {
    casoModel.obtenerCasosClinicos((err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(resultados);
    });
};

const cambiarEstadoCaso = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    casoModel.cambiarEstadoCaso(id, estado, (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Estado del caso actualizado correctamente' });
    });
};

const listarCategoriasSimulacion = (req, res) => {
    casoModel.obtenerCategoriasSimulacion((err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(resultados);
    });
};

const obtenerCasoClinico = (req, res) => {
    const { id } = req.params;
    casoModel.obtenerCasoClinicoPorId(id, (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(resultado[0]);
    });
};

const obtenerPuntajes = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajesPorCaso(id_historia_clinica, (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(resultados);
    });
};

const obtenerMensajes = (req, res) => {
    const { id_caso_clinico } = req.params;
    casoModel.obtenerMensajesPorCaso(id_caso_clinico, (err, resultados) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(resultados);
    });
};

const actualizarPuntaje = (req, res) => {
    const { id } = req.params;
    const { rubrica, codigo, valor } = req.body;

    casoModel.actualizarPuntaje(id, { rubrica, codigo, valor }, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Puntaje actualizado correctamente' });
    });
};

const actualizarMensaje = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, tiempo } = req.body;

    casoModel.actualizarMensaje(id, { titulo, descripcion, tiempo }, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Mensaje actualizado correctamente' });
    });
};

const actualizarCasoClinico = (req, res) => {
    const { id } = req.params;
    const { id_categoria_simulacion, dificultad, tiempo } = req.body;

    casoModel.actualizarCasoClinico(id, { id_categoria_simulacion, dificultad, tiempo }, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Caso clínico actualizado correctamente' });
    });
};

const agregarPuntaje = (req, res) => {
    const { id_historia_clinica, rubrica, codigo, valor } = req.body;

    casoModel.agregarPuntaje({ id_historia_clinica, rubrica, codigo, valor }, (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id_valor_puntaje: resultado.insertId, message: 'Puntaje agregado correctamente' });
    });
};

const eliminarPuntaje = (req, res) => {
    const { id } = req.params;

    casoModel.eliminarPuntaje(id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Puntaje eliminado correctamente' });
    });
};

const agregarMensaje = (req, res) => {
    const { id_caso_clinico, titulo, descripcion, tiempo } = req.body;

    casoModel.agregarMensaje({ id_caso_clinico, titulo, descripcion, tiempo }, (err, resultado) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id_mensajes_simulacion: resultado.insertId, message: 'Mensaje agregado correctamente' });
    });
};

const eliminarMensaje = (req, res) => {
    const { id } = req.params;

    casoModel.eliminarMensaje(id, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Mensaje eliminado correctamente' });
    });
};

const obtenerPaciente = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPaciente(id_historia_clinica, (err, paciente) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(paciente);
    });
};

const actualizarPaciente = (req, res) => {
    const { id_paciente } = req.params;
    casoModel.actualizarPaciente(id_paciente, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Paciente actualizado correctamente' });
    });
};

const obtenerAntecedentesPatologicos = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerAntecedentesPatologicos(id_historia_clinica, (err, antecedentes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(antecedentes);
    });
};

const actualizarAntecedentesPatologicos = (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    casoModel.actualizarAntecedentesPatologicos(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Antecedentes patológicos actualizados correctamente' });
    });
};

const obtenerAntecedentesNoPatologicos = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerAntecedentesNoPatologicos(id_historia_clinica, (err, antecedentes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(antecedentes);
    });
};

const actualizarAntecedentesNoPatologicos = (req, res) => {
    const { id } = req.params;
    casoModel.actualizarAntecedentesNoPatologicos(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Antecedentes no patológicos actualizados correctamente' });
    });
};

const obtenerAntecedentesFamiliares = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerAntecedentesFamiliares(id_historia_clinica, (err, antecedentes) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(antecedentes);
    });
};

const actualizarAntecedentesFamiliares = (req, res) => {
    const { id } = req.params;
    casoModel.actualizarAntecedentesFamiliares(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Antecedentes familiares actualizados correctamente' });
    });
};

const obtenerAnamnesisSistemas = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerAnamnesisSistemas(id_historia_clinica, (err, anamnesis) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(anamnesis);
    });
};

const actualizarAnamnesisSistemas = (req, res) => {
    const { id } = req.params;
    casoModel.actualizarAnamnesisSistemas(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Anamnesis por sistemas actualizada correctamente' });
    });
};

const obtenerMotivosConsulta = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerMotivosConsulta(id_historia_clinica, (err, motivos) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(motivos);
    });
};

const agregarMotivoConsulta = (req, res) => {
    console.log("Controller: ",req.body)
    casoModel.agregarMotivoConsulta(req.body, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id_motivo_consulta: result.insertId, message: 'Motivo de consulta agregado correctamente' });
    });
};

const eliminarMotivoConsulta = (req, res) => {
    const { id } = req.params;
    casoModel.eliminarMotivoConsulta(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Motivo de consulta eliminado correctamente' });
    });
};

const obtenerPuntaje = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntaje(id_historia_clinica, (err, puntaje) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(puntaje);
    });
};

const actualizarMotivoConsulta = (req, res) => {
    const { id } = req.params;
    casoModel.actualizarMotivoConsulta(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Motivo de consulta actualizado correctamente' });
    });
};

module.exports = {
    listarCasosClinicos,
    cambiarEstadoCaso,
    listarCategoriasSimulacion,
    obtenerCasoClinico,
    obtenerPuntajes,
    obtenerMensajes,
    actualizarPuntaje,
    actualizarMensaje,
    actualizarCasoClinico,
    agregarPuntaje,
    eliminarPuntaje,
    agregarMensaje,
    eliminarMensaje,
    obtenerPaciente,
    actualizarPaciente,
    obtenerAntecedentesPatologicos,
    actualizarAntecedentesPatologicos,
    obtenerAntecedentesNoPatologicos,
    actualizarAntecedentesNoPatologicos,
    obtenerAntecedentesFamiliares,
    actualizarAntecedentesFamiliares,
    obtenerAnamnesisSistemas,
    actualizarAnamnesisSistemas,
    obtenerMotivosConsulta,
    agregarMotivoConsulta,
    eliminarMotivoConsulta,
    obtenerPuntaje,
    actualizarMotivoConsulta
};