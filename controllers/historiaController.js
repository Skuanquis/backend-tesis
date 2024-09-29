const historiaModel = require('../models/historiaModel');
const pacienteModel = require('../models/pacienteModel');

const getListaHistoriasClinicas = (req, res) =>{
    historiaModel.getListaHistoriasClinicas((err, pacientes) => {
        if (err) {
            return res.status(500).send({ error:'Error al cargar los pacientes'});
        }
        res.status(200).send(pacientes);
    })
};

function sendResponse(res) {
    return (err, pacientes) => {
        if (err) {
            return res.status(500).send({ error: 'Error al cargar los datos de la historia clínica' });
        }
        res.status(200).send(pacientes);
    }
}

const getInfoHistoria = (req, res) =>{
    const id_historia_clinica = req.params.id
    
    pacienteModel.getSexoPaciente(id_historia_clinica, (err, result) => {
        if (err || result.length === 0) {
            return res.status(500).send({ error: 'Error al obtener el sexo del paciente' });
        }

        const sexo = result[0].sexo;
        if (sexo === 'femenino') {
            historiaModel.getInfoHistoriaFemenino(id_historia_clinica, sendResponse(res));
        } else if (sexo === 'masculino') {
            historiaModel.getInfoHistoriaMasculino(id_historia_clinica, sendResponse(res));
        } else {
            res.status(500).send({ error: 'Sexo del paciente no definido correctamente' });
        }
    });
};

const getExamenFisicoGeneral = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoGeneral(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentario = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentario(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioCabeza = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioCabeza(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioCuello = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioCuello(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioTorax = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioTorax(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioCorazon = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioCorazon(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioMamas = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioMamas(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioAbdomen = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioAbdomen(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioGenitourinario = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioGenitourinario(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioExtremidades = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioExtremidades(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoSegmentarioNeurologico = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoSegmentarioNeurologico(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenObstetrico = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenObstetrico(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getExamenFisicoOrina = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenFisicoOrina(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico de orina'})
        }
        res.status(200).send(examen);
    })
}

const getExamenSedimentoUrinario = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenSedimentoUrinario(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenQuimicoUrinario = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenQuimicoUrinario(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenesEspecialesOrina = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenesEspecialesOrina(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenBiometriaHematica = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenBiometriaHematica(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenRecuentoDiferencialHematico = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenRecuentoDiferencialHematico(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenIndiceEritrocitario = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenIndiceEritrocitario(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenQuimicoSanguineo = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenQuimicoSanguineo(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenHemostaseaSanguinea = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenHemostaseaSanguinea(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenSerologiaSanguinea = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenSerologiaSanguinea(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenElectrolitosSanquineos = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenElectrolitosSanquineos(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getExamenImagenPrueba = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getExamenImagenPrueba(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen de sedimento urinario'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisCardiovascular = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisCardiovascular(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisEndocrino = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisEndocrino(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisGastrointestinal = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisGastrointestinal(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisGenitourinario = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisGenitourinario(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisHematico = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisHematico(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisLocomotor = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisLocomotor(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisNeurologico = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisNeurologico(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisPsiquiatrico = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisPsiquiatrico(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisRespiratorio = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisRespiratorio(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getAnamnesisTegumentario = (req, res) => {
    const id_historia_clinica = req.params.id
    historiaModel.getAnamnesisTegumentario(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const getDiagnosticosDiferencialesPorHistoriaClinica = (req, res) => {
    const id_historia_clinica = req.params.id; // Obtener el id_historia_clinica desde los parámetros de la URL
    historiaModel.getDiagnosticosDiferencialesPorHistoriaClinica(id_historia_clinica, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error al obtener los diagnósticos diferenciales' });
        }
        res.status(200).json(results);
    });
};

const obtenerMedicamentosSuministrados = (req, res) => {
    const { id_historia_clinica } = req.params;
    historiaModel.obtenerMedicamentosSuministradosPorHistoriaClinica(id_historia_clinica, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

module.exports = {
    getListaHistoriasClinicas,
    getInfoHistoria,
    getExamenFisicoGeneral,
    getExamenFisicoSegmentario,
    getExamenFisicoSegmentarioCabeza,
    getExamenFisicoSegmentarioCuello,
    getExamenFisicoSegmentarioTorax,
    getExamenFisicoSegmentarioCorazon,
    getExamenFisicoSegmentarioMamas,
    getExamenFisicoSegmentarioAbdomen,
    getExamenFisicoSegmentarioGenitourinario,
    getExamenFisicoSegmentarioExtremidades,
    getExamenFisicoSegmentarioNeurologico,
    getExamenObstetrico,
    getExamenFisicoOrina,
    getExamenSedimentoUrinario,
    getExamenQuimicoUrinario,
    getExamenesEspecialesOrina,
    getExamenBiometriaHematica,
    getExamenRecuentoDiferencialHematico,
    getExamenIndiceEritrocitario,
    getExamenQuimicoSanguineo,
    getExamenHemostaseaSanguinea,
    getExamenSerologiaSanguinea,
    getExamenElectrolitosSanquineos,
    getExamenImagenPrueba,
    getAnamnesisTegumentario,
    getAnamnesisRespiratorio,
    getAnamnesisPsiquiatrico,
    getAnamnesisNeurologico,
    getAnamnesisLocomotor,
    getAnamnesisHematico,
    getAnamnesisGenitourinario,
    getAnamnesisGastrointestinal,
    getAnamnesisEndocrino,
    getAnamnesisCardiovascular,
    getDiagnosticosDiferencialesPorHistoriaClinica,
    obtenerMedicamentosSuministrados
};