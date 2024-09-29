const db = require('../db/db');

const comenzarSimulacion = (id_usuario, simulacionData, callback) => {
    const sqlSimulacion = `INSERT INTO simulacion (id_paciente) VALUES (?);`;
    const { id_paciente, estado } = simulacionData;

    db.query(sqlSimulacion, [id_paciente], (err, results) => {
        if (err) {
            return callback(err);
        }
        
        const id_simulacion = results.insertId;

        const sqlRealizaSimulacion = `INSERT INTO realiza_simulación (id_simulacion, id_usuario, estado) VALUES (?, ?, ?);`;
        db.query(sqlRealizaSimulacion, [id_simulacion, id_usuario, estado], (err, results) => {
            if (err) {
                return callback(err);
            }

            callback(null, results.insertId);
        });
    });
};

const marcarSimulacionIncompleta = (id_realiza_simulacion, callback) => {
    const sql = `UPDATE realiza_simulación 
                 SET estado = 'incompleto', fecha_fin = CURRENT_TIMESTAMP 
                 WHERE id_realiza_simulacion = ?;`;
    db.query(sql, [id_realiza_simulacion], callback);
};

const finalizarSimulacion = (id_realiza_simulacion, tiempo_empleado, callback) => {
    const sql = `UPDATE realiza_simulación 
                 SET estado = 'finalizado', fecha_fin = CURRENT_TIMESTAMP 
                 WHERE id_realiza_simulacion = ?;`;
    db.query(sql, [id_realiza_simulacion], callback);
};

const obtenerTiempoSimulacion = (id_realiza_simulacion, callback) => {
    const sql = `SELECT TIMESTAMPDIFF(SECOND, fecha_inicio, fecha_fin) AS tiempo_empleado 
                 FROM realiza_simulación 
                 WHERE id_realiza_simulacion = ?;`;
    db.query(sql, [id_realiza_simulacion], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

const registrarAccion = (id_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion, callback) => {
    //
    console.log(id_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion)
    const sql = `
        INSERT INTO accion_simulacion (id_simulacion, descripcion, tipo_accion, accion_time, puntaje, retroalimentacion) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?);
    `;
    db.query(sql, [id_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion], callback);
};

const obtenerAcciones = (id_simulacion, callback) => {
    const sql = `SELECT descripcion, tipo_accion, TIME(accion_time) AS hora_accion, puntaje, retroalimentacion 
                 FROM accion_simulacion 
                 WHERE id_simulacion = ?`;
    db.query(sql, [id_simulacion], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

const eliminarAccion = (id_simulacion, descripcion, callback) => {
    const sql = `
        DELETE FROM accion_simulacion 
        WHERE id_simulacion = ? AND descripcion = ?;
    `;
    db.query(sql, [id_simulacion, descripcion], callback);
};

module.exports = {
    comenzarSimulacion,
    marcarSimulacionIncompleta,
    finalizarSimulacion,
    obtenerTiempoSimulacion,
    registrarAccion,
    obtenerAcciones,
    eliminarAccion  
};
