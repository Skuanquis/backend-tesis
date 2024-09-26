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

module.exports = {
    getListaPacientes,
    getPacienteHistoria,
    getSexoPaciente
};