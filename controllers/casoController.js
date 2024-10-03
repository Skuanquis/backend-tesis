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
    //console.log("modelo: ",req.body)
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

const obtenerSignosVitales = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerSignosVitales(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarSignosVitales = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarSignosVitales(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Signos vitales actualizados correctamente' });
    });
};

const obtenerCategoriasDiferenciales = (req, res) => {
    casoModel.obtenerCategoriasDiferenciales((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerDiagnosticosPorCategoria = (req, res) => {
    const { id_categoria_diferencial } = req.params;
    casoModel.obtenerDiagnosticosPorCategoria(id_categoria_diferencial, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerDiagnosticosDiferencialesPorHistoriaClinica = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerDiagnosticosDiferencialesPorHistoriaClinica(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarDiagnosticosDiferenciales = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarDiagnosticosDiferenciales(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Diagnósticos diferenciales actualizados correctamente' });
    });
};

const obtenerCategoriasMedicamentos = (req, res) => {
    casoModel.obtenerCategoriasMedicamentos((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerMedicamentosPorCategoria = (req, res) => {
    const { id_categoria_medicamento } = req.params;
    casoModel.obtenerMedicamentosPorCategoria(id_categoria_medicamento, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerMedicamentosSuministradosPorHistoriaClinica = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerMedicamentosSuministradosPorHistoriaClinica(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarMedicamentosSuministrados = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarMedicamentosSuministrados(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Medicamentos suministrados actualizados correctamente' });
    });
};

const obtenerSubespecialidades = (req, res) => {
    casoModel.obtenerSubespecialidades((err, subespecialidades) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(subespecialidades);
    });
};

const obtenerSubespecialidadesPorHistoriaClinica = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerSubespecialidadesPorHistoriaClinica(id_historia_clinica, (err, subespecialidades) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(subespecialidades);
    });
};

const actualizarSubespecialidades = (req, res) => {
    const { id_historia_clinica } = req.params;
    const subsData = req.body; 

    casoModel.actualizarSubespecialidades(id_historia_clinica, subsData, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Subespecialidades actualizadas correctamente' });
    });
};

const obtenerExamenFisicoOrina = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenFisicoOrina(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenFisicoOrina = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarExamenFisicoOrina(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen físico de orina actualizado correctamente' });
    });
};

const obtenerSedimentoUrinario = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerSedimentoUrinario(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarSedimentoUrinario = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarSedimentoUrinario(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen de sedimento urinario actualizado correctamente' });
    });
};

const obtenerExamenQuimicoUrinario = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenQuimicoUrinario(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenQuimicoUrinario = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarExamenQuimicoUrinario(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen químico urinario actualizado correctamente' });
    });
};

const obtenerExamenEspecialOrina = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenEspecialOrina(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenEspecialOrina = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarExamenEspecialOrina(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen especial de orina actualizado correctamente' });
    });
};

const obtenerExamenHematologico = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerExamenHematologico(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarExamenHematologico = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarExamenHematologico(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Examen hematológico actualizado correctamente' });
    });
};

const obtenerBiometriaHematica = (req, res) => {
    const { id_examen_hematologico } = req.params;
    casoModel.obtenerBiometriaHematica(id_examen_hematologico, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarBiometriaHematica = (req, res) => {
    const { id_examen_hematologico } = req.params;
    casoModel.actualizarBiometriaHematica(id_examen_hematologico, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Biometría hemática actualizada correctamente' });
    });
};

const obtenerIndicesEritrocitarios = (req, res) => {
    const { id_examen_hematologico } = req.params;
    casoModel.obtenerIndicesEritrocitarios(id_examen_hematologico, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarIndicesEritrocitarios = (req, res) => {
    const { id_examen_hematologico } = req.params;
    casoModel.actualizarIndicesEritrocitarios(id_examen_hematologico, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Biometría hemática actualizada correctamente' });
    });
};

const obtenerRecuentoDiferencialHematico = (req, res) => {
    const { id_examen_hematologico } = req.params;
    casoModel.obtenerRecuentoDiferencialHematico(id_examen_hematologico, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarRecuentoDiferencialHematico = (req, res) => {
    const { id_examen_hematologico } = req.params;
    casoModel.actualizarRecuentoDiferencialHematico(id_examen_hematologico, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Recuento diferencial hemático actualizado correctamente' });
    });
};

const obtenerHemostasiaSanguinea = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.obtenerHemostasiaSanguinea(id_examen_sanguineo, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarHemostasiaSanguinea = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.actualizarHemostasiaSanguinea(id_examen_sanguineo, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Hemostasia sanguínea actualizada correctamente' });
    });
};

const obtenerSerologiaSanguinea = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.obtenerSerologiaSanguinea(id_examen_sanguineo, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarSerologiaSanguinea = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.actualizarSerologiaSanguinea(id_examen_sanguineo, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Serología sanguínea actualizada correctamente' });
    });
};

const obtenerElectrolitosSanguineos = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.obtenerElectrolitosSanguineos(id_examen_sanguineo, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarElectrolitosSanguineos = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.actualizarElectrolitosSanguineos(id_examen_sanguineo, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Electrolitos sanguíneos actualizados correctamente' });
    });
};

const obtenerQuimicaSanguinea = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.obtenerQuimicaSanguinea(id_examen_sanguineo, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const actualizarQuimicaSanguinea = (req, res) => {
    const { id_examen_sanguineo } = req.params;
    casoModel.actualizarQuimicaSanguinea(id_examen_sanguineo, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Química sanguínea actualizada correctamente' });
    });
};

const obtenerCategoriasImagenologia = (req, res) => {
    casoModel.obtenerCategoriasImagenologia((err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las categorías de imagenología' });
        } else {
            res.json(data);
        }
    });
};

const obtenerImagenesPorHistoriaClinica = (req, res) => {
    //console.log(req.params.id_historia_clinica)
    const id_historia_clinica = req.params.id_historia_clinica;

    casoModel.obtenerImagenesPorHistoriaClinica(id_historia_clinica, (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las imágenes' });
        } else {
            res.json(data);
        }
    });
};

const actualizarImagenes = (req, res) => {
    const id_historia_clinica = req.params.id_historia_clinica;
    ///console.log(id_historia_clinica)
    const imagenesData = req.body.imagenesData;

    casoModel.actualizarImagenes(id_historia_clinica, imagenesData, (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar las imágenes' });
        } else {
            res.json({ message: 'Imágenes actualizadas correctamente' });
        }
    });
};

const cargarImagen = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
    }
    const filePath = `http://localhost:3000/uploads/${file.filename}`;
    res.json({ path: filePath });
};

const obtenerTraspaso = (req, res) => {
    const id_historia_clinica = req.params.id_historia_clinica
    casoModel.obtenerTraspaso(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const actualizarTraspaso = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarTraspaso(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Traspaso actualizado correctamente' });
    });
};

const actualizarDiagnosticoFinal = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarDiagnosticoFinal(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Diagnostico final actualizado correctamente' });
    });
};

const obtenerTraspasoRubrica = (req, res) => {
    const id_historia_clinica = req.params.id_historia_clinica
    casoModel.obtenerTraspasoRubrica(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const actualizarPuntajeExamen = (req, res) => {
    //console.log(req.body)
    const { id_historia_clinica } = req.params;
    casoModel.actualizarPuntajeExamen(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Puntaje examen actualizado correctamente' });
    });
};

const actualizarPuntajeDiferencial = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarPuntajeDiferencial(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Puntaje diferencial actualizado correctamente' });
    });
};

const actualizarPuntajeLaboratorio = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarPuntajeLaboratorio(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Puntaje laboratorio actualizado correctamente' });
    });
};

const actualizarPuntajeIntervenir = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarPuntajeIntervenir(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Puntaje intervenir actualizado correctamente' });
    });
};

const actualizarPuntajeExterna = (req, res) => {
    console.log(req.body)
    const { id_historia_clinica } = req.params;
    casoModel.actualizarPuntajeExterna(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Puntaje externa actualizado correctamente' });
    });
};

const actualizarPuntajeTraspaso = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.actualizarPuntajeTraspaso(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Puntaje traspaso actualizado correctamente' });
    });
};

const actualizarPuntajeAnamnesis = (req, res) => {
    //console.log(req.body)
    const { id_historia_clinica } = req.params;
    casoModel.actualizarPuntajeAnamnesis(id_historia_clinica, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Puntaje anamnesis actualizado correctamente' });
    });
};

const obtenerPuntajeExamen = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeExamen(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result); // Devuelve el resultado de la consulta
    });
};

const obtenerPuntajeDiferencial = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeDiferencial(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerPuntajeLaboratorio = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeLaboratorio(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerPuntajeIntervenir = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeIntervenir(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerPuntajeExterna = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeExterna(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerPuntajeTraspaso = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeTraspaso(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerPuntajeAnamnesis = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeAnamnesis(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerPuntajeTotalHistoriaClinica = (req, res) => {
    const { id_historia_clinica } = req.params;
    casoModel.obtenerPuntajeTotalHistoriaClinica(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
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
    obtenerSignosVitales,
    actualizarSignosVitales,
    obtenerCategoriasDiferenciales,
    obtenerDiagnosticosPorCategoria,
    obtenerDiagnosticosDiferencialesPorHistoriaClinica,
    actualizarDiagnosticosDiferenciales,
    obtenerCategoriasMedicamentos,
    obtenerMedicamentosPorCategoria,
    obtenerMedicamentosSuministradosPorHistoriaClinica,
    actualizarMedicamentosSuministrados,
    obtenerSubespecialidades,
    obtenerSubespecialidadesPorHistoriaClinica,
    actualizarSubespecialidades,

    obtenerExamenFisicoOrina, 
    actualizarExamenFisicoOrina,
    obtenerSedimentoUrinario, 
    actualizarSedimentoUrinario,
    obtenerExamenQuimicoUrinario, 
    actualizarExamenQuimicoUrinario,
    obtenerExamenEspecialOrina,
    actualizarExamenEspecialOrina,
    obtenerExamenHematologico,
    actualizarExamenHematologico,
    obtenerIndicesEritrocitarios,
    actualizarIndicesEritrocitarios,
    obtenerRecuentoDiferencialHematico,
    actualizarRecuentoDiferencialHematico,
    obtenerHemostasiaSanguinea,
    actualizarHemostasiaSanguinea,
    obtenerSerologiaSanguinea,
    actualizarSerologiaSanguinea,
    obtenerElectrolitosSanguineos,
    actualizarElectrolitosSanguineos,
    obtenerQuimicaSanguinea,
    actualizarQuimicaSanguinea,
    obtenerBiometriaHematica,
    actualizarBiometriaHematica,
    obtenerCategoriasImagenologia,
    obtenerImagenesPorHistoriaClinica,
    actualizarImagenes,
    cargarImagen,
    obtenerTraspaso,
    actualizarTraspaso,
    actualizarDiagnosticoFinal,
    obtenerTraspasoRubrica,
    actualizarPuntajeAnamnesis,
    actualizarPuntajeExamen,
    actualizarPuntajeDiferencial,
    actualizarPuntajeLaboratorio,
    actualizarPuntajeIntervenir,
    actualizarPuntajeExterna,
    actualizarPuntajeTraspaso,
    obtenerPuntajeAnamnesis,
    obtenerPuntajeExamen,
    obtenerPuntajeDiferencial,
    obtenerPuntajeLaboratorio,
    obtenerPuntajeIntervenir,
    obtenerPuntajeExterna,
    obtenerPuntajeTraspaso,
    obtenerPuntajeTotalHistoriaClinica
};