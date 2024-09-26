const db = require('../db/db');

const getListaPacientes = (callback) => {
    const sql = `SELECT 
                    id_paciente,
                    paterno, 
                    materno, 
                    nombre, 
                    fecha_nacimiento,
                    sexo,
                    peso,
                    talla,
                    TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) AS edad
                FROM 
                    paciente;`;
    db.query(sql, callback);
};

const getPacienteHistoria = (callback) => {
    const sql = `SELECT 
                    p.id_paciente,
                    p.paterno, 
                    p.materno, 
                    p.nombre, 
                    p.fecha_nacimiento,
                    p.peso,
                    p.talla, 
                    TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) AS edad,
                    h.descripcion,
                    h.id_historia_clinica,
                    c.id_caso_clinico,
                    c.autor,
                    c.difucultad,
                    c.puntaje,
                    c.tiempo
                FROM 
                    paciente p
                JOIN 
                    caso_clinico c 
                ON 
                    p.id_paciente = c.id_paciente
                JOIN 
                    historia_clinica h 
                ON 
                    c.id_caso_clinico = h.id_caso_clinico;
                `;
    db.query(sql, callback);
};

const getSexoPaciente = (id, callback) =>{
    const sql = `SELECT sexo FROM 
                    paciente p
                WHERE
                    p.id_paciente = ?`;
    db.query(sql, [id], callback);
}

module.exports = {
    getListaPacientes,
    getPacienteHistoria,
    getSexoPaciente
};