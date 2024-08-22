const db = require('../db/db');

const getListaPacientes = (callback) => {
    const sql = 'select * from paciente';
    db.query(sql, callback);
};

const getPacienteHistoria = (callback) => {
    const sql = `SELECT 
                    p.id_paciente,
                    p.paterno, 
                    p.materno, 
                    p.nombre, 
                    p.edad, 
                    p.ci, 
                    h.descripcion,
                    h.id_historia_clinica 
                FROM 
                    paciente p
                JOIN 
                    historia_clinica h 
                ON 
                    p.id_paciente = h.id_paciente`;
    db.query(sql, callback);
};

module.exports = {
    getListaPacientes,
    getPacienteHistoria
};