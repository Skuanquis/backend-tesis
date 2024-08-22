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
module.exports = {
    getListaHistoriasClinicas,
    getInfoHistoria,
    getExamenFisicoGeneral,
    getExamenFisicoSegmentario,
    getExamenObstetrico,
    getExamenFisicoOrina,
    getExamenSedimentoUrinario,
    getExamenQuimicoUrinario,
    getExamenesEspecialesOrina
};