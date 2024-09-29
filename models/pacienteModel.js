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
                    c.tiempo,
                    cs.nombre AS categoria  -- Agregando la categoría del caso clínico
                FROM 
                    paciente p
                JOIN 
                    caso_clinico c 
                ON 
                    p.id_paciente = c.id_paciente
                JOIN 
                    historia_clinica h 
                ON 
                    c.id_caso_clinico = h.id_caso_clinico
                JOIN
                    categoria_simulacion cs  -- Añadir el JOIN para obtener la categoría
                ON
                    c.id_categoria_simulacion = cs.id_categoria_simulacion
                WHERE 
                    c.estado = 'habilitado';
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

const obtenerCategoriasSimulacionConsultaExterna = (callback) => {
    const sql = `SELECT 
        id_categoria_simulacion,
        nombre
    FROM 
        categoria_simulacion
    WHERE 
        nombre NOT LIKE 'Urgencia%';`;
    db.query(sql, callback);
};

const obtenerPacientesFiltrados = (categoriaId, dificultad, callback) => {
    let sql = `SELECT 
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
                    c.tiempo,
                    cs.nombre AS categoria  
                FROM 
                    paciente p
                JOIN 
                    caso_clinico c 
                ON 
                    p.id_paciente = c.id_paciente
                JOIN 
                    historia_clinica h 
                ON 
                    c.id_caso_clinico = h.id_caso_clinico
                JOIN
                    categoria_simulacion cs  
                ON
                    c.id_categoria_simulacion = cs.id_categoria_simulacion
                WHERE 
                    c.estado = 'habilitado'
            `;

    const params = [];

    if (categoriaId !== 'T') {
        sql += ' AND c.id_categoria_simulacion = ?';
        params.push(categoriaId);
    }

    if (dificultad !== 'T' && dificultad !== 'Todos') {
        sql += ' AND c.difucultad = ?';
        params.push(dificultad);
    }

    sql += ' ORDER BY c.id_caso_clinico';

    //console.log("Consulta SQL:", sql, "Parámetros:", params);

    db.query(sql, params, callback);
};


module.exports = {
    getListaPacientes,
    getPacienteHistoria,
    getSexoPaciente,
    obtenerCategoriasSimulacionConsultaExterna,
    obtenerPacientesFiltrados
};