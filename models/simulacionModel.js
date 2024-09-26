const db = require('../db/db');

const comenzarSimulacion = (id, simulacionData, callback) => {
    const sql = `INSERT INTO realiza_simulación (id_usuario, id_paciente, estado)
                 VALUES (?, ?, ?);`;
    const { id_paciente, estado } = simulacionData;
    db.query(sql, [id, id_paciente, estado], (err, results) => {
        if (err) {
            return callback(err);
        }
        db.query('SELECT LAST_INSERT_ID() as id_realiza_simulacion', (err, res) => {
            if (err) {
                return callback(err);
            }
            callback(null, res[0].id_realiza_simulacion);
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

const registrarAccion = (id_realiza_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion, callback) => {
    const sql = `
        INSERT INTO accion_simulacion (id_realiza_simulacion, descripcion, tipo_accion, accion_time, puntaje, retroalimentacion) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?);
    `;
    db.query(sql, [id_realiza_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion], callback);
};

const obtenerAcciones = (id_realiza_simulacion, callback) => {
    const sql = `SELECT descripcion, tipo_accion, TIME(accion_time) AS hora_accion, puntaje, retroalimentacion 
                 FROM accion_simulacion 
                 WHERE id_realiza_simulacion = ?`;
    db.query(sql, [id_realiza_simulacion], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};


module.exports = {
    comenzarSimulacion,
    marcarSimulacionIncompleta,
    finalizarSimulacion,
    obtenerTiempoSimulacion,
    registrarAccion,
    obtenerAcciones
};
