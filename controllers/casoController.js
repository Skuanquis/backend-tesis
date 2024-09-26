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
    //console.log(req.body)
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
    //console.log("puntaje controller: ", req.body)
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
    //console.log("Controller: ",req.body)
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

const obtenerExamenFisicoGeneral = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenFisicoGeneral(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenFisicoGeneral = (req, res) => {
    const { id_examen_fisico_general } = req.params;
    //console.log("controller: ", req.body)
    casoModel.actualizarExamenFisicoGeneral(id_examen_fisico_general, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen físico general actualizado correctamente' });
    });
};

const obtenerExamenFisicoSegmentario = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenFisicoSegmentario(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenFisicoSegmentario = (req, res) => {
    const { id_historia_clinica } = req.params;
    console.log("modelo: ",req.body)
    casoModel.actualizarExamenFisicoSegmentario(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen físico segmentario actualizado correctamente' });
    });
};

const obtenerExamenPiel = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenPiel(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenPiel = (req, res) => {
    const { id_examen_piel } = req.params;
    casoModel.actualizarExamenPiel(id_examen_piel, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen de piel actualizado correctamente' });
    });
};

const obtenerExamenCirculatorio = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenCirculatorio(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenCirculatorio = (req, res) => {
    const { id_examen_circulatorio } = req.params;
    casoModel.actualizarExamenCirculatorio(id_examen_circulatorio, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen circulatorio actualizado correctamente' });
    });
};

const obtenerExamenRespiratorio = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenRespiratorio(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenRespiratorio = (req, res) => {
    const { id_examen_respiratorio } = req.params;
    casoModel.actualizarExamenRespiratorio(id_examen_respiratorio, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen respiratorio actualizado correctamente' });
    });
};

const obtenerExamenViaAerea = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenViaAerea(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenViaAerea = (req, res) => {
    const { id_examen_via_aerea } = req.params;
    casoModel.actualizarExamenViaAerea(id_examen_via_aerea, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen vía aérea actualizado correctamente' });
    });
};

const obtenerExamenPsicologico = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenPsicologico(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenPsicologico = (req, res) => {
    const { id_examen_psicologico } = req.params;
    casoModel.actualizarExamenPsicologico(id_examen_psicologico, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen psicológico actualizado correctamente' });
    });
};

const obtenerExamenObstetrico = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenObstetrico(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

// Actualizar examen obstétrico
const actualizarExamenObstetrico = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarExamenObstetrico(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen obstétrico actualizado correctamente' });
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
    actualizarMotivoConsulta,
    obtenerExamenFisicoGeneral,
    actualizarExamenFisicoGeneral,
    obtenerExamenFisicoSegmentario,
    actualizarExamenFisicoSegmentario,
    obtenerExamenPiel,
    actualizarExamenPiel,
    obtenerExamenCirculatorio,
    actualizarExamenCirculatorio,
    obtenerExamenRespiratorio,
    actualizarExamenRespiratorio,
    obtenerExamenViaAerea,
    actualizarExamenViaAerea,
    obtenerExamenPsicologico,
    actualizarExamenPsicologico,
    obtenerExamenObstetrico,
    actualizarExamenObstetrico,
};