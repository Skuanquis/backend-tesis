const db = require('../db/db');

const getUserByUsername = (username, callback) => {
    const sql = `SELECT u.id_usuario, u.username, r.name AS role, u.estado, u.password 
                    FROM usuario u JOIN rol r ON u.id_rol = r.id_rol 
                    WHERE u.username = ?;`;
    db.query(sql, [username], (err, results) => {
        if (err) return callback(err);
        return callback(null, results[0]);
    });
};

const getUserById = (id, callback) => {
    const query = `SELECT u.id_usuario, u.password, u.paterno, u.materno, u.nombre, u.fecha_nacimiento, u.username, r.name AS rol, u.estado 
                    FROM usuario u JOIN rol r ON u.id_rol = r.id_rol 
                    WHERE u.id_usuario = ?;`;
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(new Error('User not found'), null);
        }
        return callback(null, results[0]);
    });
};

const updateUserProfile = (id, userData, callback) => {
    const query = 'UPDATE usuario SET nombre = ?, paterno = ?, materno = ?, fecha_nacimiento = ? WHERE id_usuario = ?';
    const { nombre, paterno, materno, fecha_nacimiento } = userData;
    db.query(query, [nombre, paterno, materno, fecha_nacimiento, id], callback);
};

const updateUserPassword = (id, hashedPassword, callback) => {
    const query = 'UPDATE usuario SET password = ? WHERE id_usuario = ?';
    db.query(query, [hashedPassword, id], callback);
};

const createUser = (userData, callback) => {
    const query = `INSERT INTO usuario (username, password, paterno, materno, nombre, fecha_nacimiento, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const { username, password, paterno, materno, nombre, fecha_nacimiento, id_rol } = userData;
    //console.log(userData.password)
    db.query(query, [username, password, paterno, materno, nombre, fecha_nacimiento, id_rol], callback);
};


const getUsuarios = (callback) => {
    const sql = `
        SELECT 
            u.id_usuario,
            u.nombre, 
            u.paterno, 
            u.materno, 
            u.fecha_nacimiento, 
            u.estado, 
            r.name AS rol
        FROM 
            usuario u
        JOIN 
            rol r ON u.id_rol = r.id_rol
        WHERE
            r.name IN ('estudiante', 'medico');
        `;
    db.query(sql, callback);
};

const updateUsuario = (id, usuarioData, callback) => {
    const { nombre, paterno, materno, fecha_nacimiento, estado, password, id_rol } = usuarioData;  // Incluir 'id_rol' en la desestructuramaternoón
    console.log("El modelo: ", usuarioData, "id_usuario: ", id)
    const sql = password 
        ? `UPDATE usuario SET nombre = ?, paterno = ?, materno = ?, fecha_nacimiento = ?, password = ?, estado = ?, id_rol = ? WHERE id_usuario = ?`
        : `UPDATE usuario SET nombre = ?, paterno = ?, materno = ?, fecha_nacimiento = ?, estado = ?, id_rol = ? WHERE id_usuario = ?`;
    const params = password ? [nombre, paterno, materno, fecha_nacimiento, password, estado, id_rol, id] : [nombre, paterno, materno, fecha_nacimiento, estado, id_rol, id];
    db.query(sql, params, callback);
};

module.exports = {
    getUserByUsername,
    getUserById,
    updateUserProfile,
    updateUserPassword,
    createUser,
    getUsuarios,
    updateUsuario
};