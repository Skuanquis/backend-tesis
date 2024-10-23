const db = require('../db/db');

const comenzarSimulacion = (id_usuario, simulacionData, callback) => {
    const sqlSimulacion = `INSERT INTO simulacion (id_paciente) VALUES (?);`;
    const { id_paciente, estado } = simulacionData;

    db.query(sqlSimulacion, [id_paciente], (err, results) => {
        if (err) {
            return callback(err);
        }
        
        const id_simulacion = results.insertId;

        const sqlRealizaSimulacion = `INSERT INTO realiza_simulacion (id_simulacion, id_usuario, estado) VALUES (?, ?, ?);`;
        db.query(sqlRealizaSimulacion, [id_simulacion, id_usuario, estado], (err, results) => {
            if (err) {
                return callback(err);
            }

            callback(null, results.insertId);
        });
    });
};

const marcarSimulacionIncompleta = (id_realiza_simulacion, callback) => {
    const sql = `UPDATE realiza_simulacion 
                 SET estado = 'incompleto', fecha_fin = CURRENT_TIMESTAMP 
                 WHERE id_realiza_simulacion = ?;`;
    db.query(sql, [id_realiza_simulacion], callback);
};

const finalizarSimulacion = (id_realiza_simulacion, tiempo_empleado, callback) => {
    const sql = `UPDATE realiza_simulacion 
                 SET estado = 'finalizado', fecha_fin = CURRENT_TIMESTAMP, tiempo_empleado = ?
                 WHERE id_realiza_simulacion = ?;`;
    db.query(sql, [tiempo_empleado, id_realiza_simulacion], callback);
};

const obtenerTiempoSimulacion = (id_realiza_simulacion, callback) => {
    const sql = `SELECT tiempo_empleado 
                 FROM realiza_simulacion 
                 WHERE id_realiza_simulacion = ?;`;
    db.query(sql, [id_realiza_simulacion], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

const registrarAccion = (id_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion, callback) => {
    //console.log(id_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion)
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


const obtenerMensajes = (id_caso_clinico, callback) => {
    const sql = `SELECT 
                    ms.id_mensajes_simulacion,
                    ms.titulo,
                    ms.descripcion,
                    ms.tiempo AS tiempo_mensaje,
                    cc.id_caso_clinico
                FROM 
                    mensajes_simulacion ms
                JOIN 
                    caso_clinico cc ON ms.id_caso_clinico = cc.id_caso_clinico
                WHERE 
                    cc.id_caso_clinico = ?;`;
    db.query(sql, [id_caso_clinico], callback);
}

const enviarDiagnosticoFinal = (id_realiza_simulacion, data, callback) => {
    const sql = `UPDATE 
                    realiza_simulacion
                SET 
                    diagnostico_final = ?
                WHERE 
                    id_realiza_simulacion = ?;
    `;
    db.query(sql, [data.diagnostico_final, id_realiza_simulacion], callback);
};

const actualizarPuntajePorcentaje = (id_simulacion, puntaje_porcentaje, callback) => {
    const sql = `UPDATE realiza_simulacion SET puntaje_porcentaje = ? WHERE id_simulacion = ?`;
    db.query(sql, [puntaje_porcentaje, id_simulacion], callback);
};

const obtenerSimulaciones = (id_usuario, rol, id_grupo, callback) => {
    let sql = `
        SELECT 
            r.id_realiza_simulacion,
            CONCAT(u.nombre, ' ', u.paterno, ' ', u.materno) AS nombre_completo,
            h.id_historia_clinica,
            r.tiempo_empleado,
            r.fecha_inicio AS fecha_simulacion,
            r.puntaje_porcentaje
        FROM 
            realiza_simulacion r
        JOIN 
            usuario u ON r.id_usuario = u.id_usuario
        JOIN 
            simulacion s ON r.id_simulacion = s.id_simulacion
        JOIN 
            paciente p ON s.id_paciente = p.id_paciente
        JOIN 
            caso_clinico c ON p.id_paciente = c.id_paciente
        JOIN 
            historia_clinica h ON c.id_caso_clinico = h.id_caso_clinico
    `;

    const params = [];

    if (rol === 'administrador') {
        if (id_grupo && id_grupo !== '0') {
            sql += `
                JOIN grupo_estudiante ge ON ge.id_usuario_estudiante = r.id_usuario
                WHERE ge.id_grupo = ?
            `;
            params.push(id_grupo);
        }
    } else if (rol === 'medico') {
        sql += `
            JOIN grupo_estudiante ge ON ge.id_usuario_estudiante = r.id_usuario
            JOIN grupo g ON ge.id_grupo = g.id_grupo
            WHERE g.id_usuario_medico = ?
        `;
        params.push(id_usuario);

        if (id_grupo && id_grupo !== '0') {
            sql += ' AND g.id_grupo = ?';
            params.push(id_grupo);
        }
    } else { // estudiante
        sql += ' WHERE r.id_usuario = ?';
        params.push(id_usuario);
    }

    db.query(sql, params, callback);
};


const obtenerDetallesSimulacion = (id_realiza_simulacion, callback) => {
    // Consulta para obtener los detalles generales de la simulación junto con el diagnóstico correcto
    const sqlSimulacion = `
        SELECT 
            r.id_realiza_simulacion,
            r.id_simulacion,
            r.id_usuario,
            r.fecha_inicio,
            r.fecha_fin,
            r.estado,
            r.diagnostico_final,
            r.tiempo_empleado,
            r.puntaje_porcentaje,
            s.id_paciente,
            p.nombre AS paciente_nombre,
            h.id_historia_clinica,
            d.nombre AS diagnostico_correcto
        FROM 
            realiza_simulacion r
        JOIN 
            simulacion s ON r.id_simulacion = s.id_simulacion
        JOIN 
            paciente p ON s.id_paciente = p.id_paciente
        JOIN 
            caso_clinico c ON p.id_paciente = c.id_paciente
        JOIN 
            historia_clinica h ON c.id_caso_clinico = h.id_caso_clinico
        JOIN 
            diagnostico d ON c.diagnostico = d.id_diagnostico
        WHERE 
            r.id_realiza_simulacion = ?;
    `;

    db.query(sqlSimulacion, [id_realiza_simulacion], (err, resultados) => {
        if (err) {
            console.error('Error en la consulta de simulación:', err);
            return callback(err);
        }

        if (resultados.length === 0) {
            return callback(new Error('Simulación no encontrada'));
        }

        const simulacion = resultados[0];

        // Consulta para obtener las acciones realizadas en la simulación, ordenadas por hora_accion
        const sqlAcciones = `
            SELECT descripcion, tipo_accion, TIME(accion_time) AS hora_accion, puntaje, retroalimentacion 
            FROM accion_simulacion 
            WHERE id_simulacion = ?
            ORDER BY accion_time ASC;
        `;

        db.query(sqlAcciones, [simulacion.id_simulacion], (err, acciones) => {
            if (err) {
                console.error('Error en la consulta de acciones:', err);
                return callback(err);
            }

            // Consulta para obtener los puntajes máximos de cada sección
            const secciones = ['anamnesis', 'examen', 'diferencial', 'laboratorio', 'intervenir', 'externa'];
            const puntajesMaximosPorSeccion = {};
            let seccionIndex = 0;

            /**
             * Función para obtener los puntajes máximos de una sección.
             * @param {string} seccion - Nombre de la sección.
             * @param {function} next - Callback para continuar con la siguiente sección.
             */
            const obtenerPuntajeMaximo = (seccion, next) => {
                const tableName = `puntaje_${seccion}`;
                const sqlPuntaje = `
                    SELECT puntaje_a, puntaje_b, puntaje_c, puntaje_d, puntaje_e
                    FROM ${tableName}
                    WHERE id_historia_clinica = ?;
                `;
                db.query(sqlPuntaje, [simulacion.id_historia_clinica], (err, resultados) => {
                    if (err) {
                        console.error(`Error en la consulta de puntajes máximos para ${seccion}:`, err);
                        return next(err);
                    }

                    if (resultados.length === 0) {
                        const errorMsg = `Puntaje máximo no encontrado para sección: ${seccion}`;
                        console.error(errorMsg);
                        return next(new Error(errorMsg));
                    }

                    puntajesMaximosPorSeccion[`puntaje_${seccion}`] = resultados[0];
                    next(null);
                });
            };

            /**
             * Función para procesar todas las secciones de manera secuencial.
             */
            const procesarSecciones = () => {
                console.log("INDEXXXXXX: ", seccionIndex, secciones.length)
                if (seccionIndex >= secciones.length) {
                    // Todas las secciones han sido procesadas
                    // Ahora calcular los puntajes obtenidos por sección y tipo
                    const puntajesObtenidosPorSeccion = {
                        puntaje_anamnesis: { puntaje_a: 0, puntaje_b: 0, puntaje_c: 0, puntaje_d: 0, puntaje_e: 0 },
                        puntaje_examen: { puntaje_a: 0, puntaje_b: 0, puntaje_c: 0, puntaje_d: 0, puntaje_e: 0 },
                        puntaje_diferencial: { puntaje_a: 0, puntaje_b: 0, puntaje_c: 0, puntaje_d: 0, puntaje_e: 0 },
                        puntaje_laboratorio: { puntaje_a: 0, puntaje_b: 0, puntaje_c: 0, puntaje_d: 0, puntaje_e: 0 },
                        puntaje_intervenir: { puntaje_a: 0, puntaje_b: 0, puntaje_c: 0, puntaje_d: 0, puntaje_e: 0 },
                        puntaje_externa: { puntaje_a: 0, puntaje_b: 0, puntaje_c: 0, puntaje_d: 0, puntaje_e: 0 }
                    };

                    acciones.forEach(accion => {
                        const { descripcion, puntaje } = accion;
                        const detalleLower = descripcion.toLowerCase();

                        console.log("INICIO:  ", accion)

                        let seccion = '';

                        if (detalleLower.includes('anamnesis')) {
                            seccion = 'puntaje_anamnesis';
                        } else if (detalleLower.includes('examen')) {
                            seccion = 'puntaje_examen';
                        } else if (detalleLower.includes('diagnostico') || detalleLower.includes('diferencial')) {
                            seccion = 'puntaje_diferencial';
                        } else if (detalleLower.includes('laboratorio') || detalleLower.includes('imagenologia')) {
                            seccion = 'puntaje_laboratorio';
                        } else if (detalleLower.includes('el procedimiento') || detalleLower.includes('suministro')) {
                            seccion = 'puntaje_intervenir';
                        } else if (detalleLower.includes('consulto') || detalleLower.includes('externa')) {
                            seccion = 'puntaje_externa';
                        }

                        if (seccion && puntajesObtenidosPorSeccion[seccion]) {
                            const puntajeUpper = puntaje.toUpperCase();
                            console.log("AQUIIII:  ", seccion, puntajesObtenidosPorSeccion[seccion])
                            if (['A', 'B', 'C', 'D', 'E'].includes(puntajeUpper)) {
                                puntajesObtenidosPorSeccion[seccion][`puntaje_${puntajeUpper.toLowerCase()}`] += 1;
                            }
                            console.log("DESPUESSS:  ",puntajesObtenidosPorSeccion[seccion])
                        }
                    });
                    const puntajeSecciones = {};

                    Object.keys(puntajesMaximosPorSeccion).forEach(seccion => {
                        puntajeSecciones[seccion] = {
                            puntaje_a: puntajesObtenidosPorSeccion[seccion].puntaje_a,
                            puntaje_b: puntajesObtenidosPorSeccion[seccion].puntaje_b,
                            puntaje_c: puntajesObtenidosPorSeccion[seccion].puntaje_c,
                            puntaje_d: puntajesObtenidosPorSeccion[seccion].puntaje_d,
                            puntaje_e: puntajesObtenidosPorSeccion[seccion].puntaje_e,
                            puntaje_a_max: puntajesMaximosPorSeccion[seccion].puntaje_a,
                            puntaje_b_max: puntajesMaximosPorSeccion[seccion].puntaje_b,
                            puntaje_c_max: puntajesMaximosPorSeccion[seccion].puntaje_c,
                            puntaje_d_max: puntajesMaximosPorSeccion[seccion].puntaje_d,
                            puntaje_e_max: puntajesMaximosPorSeccion[seccion].puntaje_e
                        };
                    });
                    const diagnosticoCorrecto = simulacion.diagnostico_correcto ? simulacion.diagnostico_correcto.trim().toLowerCase() : '';
                    const diagnosticoFinal = simulacion.diagnostico_final ? simulacion.diagnostico_final.trim().toLowerCase() : '';
                    const diagnosticoAcertado = diagnosticoCorrecto === diagnosticoFinal;
                    const ultimaAccion = acciones.length > 0 ? acciones[acciones.length - 1] : null;
                    const ultimaAccionCorrecta = ultimaAccion && ultimaAccion.puntaje.toUpperCase() === 'A';

                    callback(null, {
                        simulacion,
                        acciones,
                        puntajes: puntajeSecciones,
                        diagnosticoAcertado,
                        ultimaAccionCorrecta
                    });
                } else {
                    const seccionActual = secciones[seccionIndex];
                    obtenerPuntajeMaximo(seccionActual, (err) => {
                        if (err) {
                            return callback(err);
                        }

                        seccionIndex++;
                        procesarSecciones();
                    });
                }
            };
            procesarSecciones();
        });
    });
}

module.exports = {
    comenzarSimulacion,
    marcarSimulacionIncompleta,
    finalizarSimulacion,
    obtenerTiempoSimulacion,
    registrarAccion,
    obtenerAcciones,
    eliminarAccion,
    obtenerMensajes,
    enviarDiagnosticoFinal,
    actualizarPuntajePorcentaje,
    obtenerSimulaciones,
    obtenerDetallesSimulacion
}
