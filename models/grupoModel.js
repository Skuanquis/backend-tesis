const db = require('../db/db');

const obtenerGrupos = (id_usuario_medico, rol, callback) => {
    let sql = `
        SELECT 
            g.id_grupo, 
            g.nombre, 
            g.descripcion, 
            g.codigo_acceso, 
            g.fecha_creacion,
            u.nombre AS nombre_usuario, 
            u.paterno AS paterno_usuario, 
            u.materno AS materno_usuario
        FROM 
            grupo g
        JOIN 
            usuario u ON g.id_usuario_medico = u.id_usuario
    `;
    
    if (rol === "administrador") {
        // Si es administrador, agregar la opción "Todos" en el frontend, por lo que se devuelven todos los grupos
        db.query(sql, callback);
    } else if (rol === "medico") {
        // Si es médico, filtrar los grupos creados por él
        sql += ` WHERE g.id_usuario_medico = ?`;
        db.query(sql, [id_usuario_medico], callback);
    } else {
        // Si es estudiante, no devolver ningún grupo
        callback(null, []); // Devolver una lista vacía para no mostrar ningún grupo
    }
};


const crearGrupo = (grupoData, callback) => {
    const sql = `INSERT INTO grupo (nombre, descripcion, codigo_acceso, id_usuario_medico) VALUES (?, ?, ?, ?)`;
    const { nombre, descripcion, codigo_acceso, id_usuario_medico } = grupoData;
    db.query(sql, [nombre, descripcion, codigo_acceso, id_usuario_medico], callback);
};

const actualizarGrupo = (id_grupo, grupoData, callback) => {
    const sql = `UPDATE grupo SET nombre = ?, descripcion = ?, codigo_acceso = ? WHERE id_grupo = ?`;
    const { nombre, descripcion, codigo_acceso } = grupoData;
    db.query(sql, [nombre, descripcion, codigo_acceso, id_grupo], callback);
};

const eliminarEstudiantesDelGrupo = (id_grupo, callback) => {
    const sql = `DELETE FROM grupo_estudiante WHERE id_grupo = ?`;
    db.query(sql, [id_grupo], callback);
};

const eliminarGrupo = (id_grupo, callback) => {
    const sql = `DELETE FROM grupo WHERE id_grupo = ?`;
    db.query(sql, [id_grupo], callback);
};

const matricularEstudiante = (id_grupo, id_usuario_estudiante, callback) => {
    const sql = `INSERT INTO grupo_estudiante (id_grupo, id_usuario_estudiante) VALUES (?, ?)`;
    db.query(sql, [id_grupo, id_usuario_estudiante], callback);
};

const desvincularEstudiante = (id_grupo, id_usuario_estudiante, callback) => {
    const sql = `DELETE FROM grupo_estudiante WHERE id_grupo = ? AND id_usuario_estudiante = ?`;
    db.query(sql, [id_grupo, id_usuario_estudiante], callback);
};

const obtenerGruposMatriculados = (id_usuario_estudiante, callback) => {
    const sql = `
        SELECT 
            g.id_grupo, 
            g.nombre, 
            g.descripcion, 
            g.codigo_acceso, 
            g.fecha_creacion,
            u.nombre AS nombre_usuario, 
            u.paterno AS paterno_usuario, 
            u.materno AS materno_usuario
        FROM 
            grupo g
        JOIN 
            usuario u ON g.id_usuario_medico = u.id_usuario
        JOIN 
            grupo_estudiante ge ON g.id_grupo = ge.id_grupo
        WHERE 
            ge.id_usuario_estudiante = ?;
    `;
    db.query(sql, [id_usuario_estudiante], (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

const obtenerGruposNoMatriculados = (id_usuario_estudiante, callback) => {
    const sql = `
        SELECT 
            g.id_grupo, 
            g.nombre, 
            g.descripcion, 
            g.codigo_acceso, 
            g.fecha_creacion,
            u.nombre AS nombre_usuario, 
            u.paterno AS paterno_usuario, 
            u.materno AS materno_usuario
        FROM 
            grupo g
        JOIN 
            usuario u ON g.id_usuario_medico = u.id_usuario
        WHERE 
            g.id_grupo NOT IN (
                SELECT id_grupo FROM grupo_estudiante WHERE id_usuario_estudiante = ?
            );
    `;
    db.query(sql, [id_usuario_estudiante], callback);
};


const validarCodigoAcceso = (id_grupo, codigo_acceso, callback) => {
    const sql = `SELECT * FROM grupo WHERE id_grupo = ? AND codigo_acceso = ?`;
    db.query(sql, [id_grupo, codigo_acceso], callback);
};

module.exports = {
    obtenerGrupos,
    crearGrupo,
    actualizarGrupo,
    eliminarGrupo,
    eliminarEstudiantesDelGrupo,
    matricularEstudiante,
    desvincularEstudiante,
    obtenerGruposMatriculados,
    obtenerGruposNoMatriculados,
    validarCodigoAcceso
};
