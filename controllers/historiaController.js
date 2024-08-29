const historiaModel = require('../models/historiaModel');

const getListaHistoriasClinicas = (req, res) =>{
    historiaModel.getListaHistoriasClinicas((err, pacientes) => {
        if (err) {
            return res.status(500).send({ error:'Error al cargar los pacientes'});
        }
        res.status(200).send(pacientes);
    })
};

const getInfoHistoria = (req, res) =>{
    const id_historia_clinica = req.params.id
    historiaModel.getInfoHistoria(id_historia_clinica, (err, pacientes) => {
        if (err) {
            return res.status(500).send({ error:'Error al cargar los pacientes'});
        }
        res.status(200).send(pacientes);
    })
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
    getExamenImagenPrueba
};