const pacienteModel = require('../models/pacienteModel');

const getListaPacientes = (req, res) =>{
    pacienteModel.getListaPacientes((err, pacientes) => {
        if (err) {
            return res.status(500).send({ error:'Error al cargar los pacientes'});
        }
        res.status(200).send(pacientes);
    })
};

const getPacienteHistoria = (req, res) =>{
    pacienteModel.getPacienteHistoria((err, pacientes) => {
        if (err) {
            return res.status(500).send({ error:'Error al cargar los pacientes'});
        }
        res.status(200).send(pacientes);
    })
};

const getSexoPaciente = (req, res) =>{
    pacienteModel.getSexoPaciente((err, pacientes) => {
        if (err) {
            return res.status(500).send({ error:'Error al cargar los pacientes'});
        }
        res.status(200).send(pacientes);
    })
};

const obtenerCategoriasSimulacionConsultaExterna = (req, res) => {
    pacienteModel.obtenerCategoriasSimulacionConsultaExterna((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

const obtenerPacientesFiltrados = (req, res) => {
    const { categoria, dificultad } = req.query;

    pacienteModel.obtenerPacientesFiltrados(categoria, dificultad, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
    });
};

module.exports = {
    getListaPacientes,
    getPacienteHistoria,
    getSexoPaciente,
    obtenerCategoriasSimulacionConsultaExterna,
    obtenerPacientesFiltrados
};