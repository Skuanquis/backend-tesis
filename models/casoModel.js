const db = require('../db/db');

const obtenerCasosClinicos = (callback) => {
    const sql = `SELECT 
                    cc.id_caso_clinico, 
                    cc.autor, 
                    cs.nombre AS categoria,
                    cc.difucultad, 
                    cc.puntaje, 
                    cc.tiempo, 
                    cc.estado, 
                    p.nombre, 
                    p.paterno, 
                    p.materno, 
                    p.peso, 
                    p.talla, 
                    p.sexo,
                    hc.descripcion
                FROM 
                    caso_clinico cc
                JOIN 
                    paciente p ON cc.id_paciente = p.id_paciente
                LEFT JOIN 
                    historia_clinica hc ON cc.id_caso_clinico = hc.id_caso_clinico
                LEFT JOIN 
                    categoria_simulacion cs ON cc.id_categoria_simulacion = cs.id_categoria_simulacion; -- Relación con la tabla de categorías
                                `;
    db.query(sql, callback);
};


const cambiarEstadoCaso = (id_caso_clinico, estado, callback) => {
    const sql = `UPDATE caso_clinico 
                 SET estado = ? 
                 WHERE id_caso_clinico = ?;`;
    db.query(sql, [estado, id_caso_clinico], callback);
};

const obtenerCategoriasSimulacion = (callback) => {
    const sql = `SELECT id_categoria_simulacion, nombre FROM categoria_simulacion`;
    db.query(sql, callback);
};

const obtenerCasoClinicoPorId = (id_caso_clinico, callback) => {
    const sql = `SELECT 
                    cc.id_caso_clinico, 
                    cc.autor, 
                    cc.id_categoria_simulacion, 
                    cs.nombre AS categoria, -- Se agrega la categoría desde la tabla categoria_simulacion
                    cc.difucultad, 
                    cc.puntaje, 
                    cc.tiempo, 
                    cc.estado, 
                    p.nombre, 
                    p.paterno, 
                    p.materno, 
                    p.peso, 
                    p.talla, 
                    p.sexo,
                    hc.descripcion,
                    hc.id_historia_clinica
                FROM 
                    caso_clinico cc
                JOIN 
                    paciente p ON cc.id_paciente = p.id_paciente
                LEFT JOIN 
                    historia_clinica hc ON cc.id_caso_clinico = hc.id_caso_clinico
                LEFT JOIN 
                    categoria_simulacion cs ON cc.id_categoria_simulacion = cs.id_categoria_simulacion -- Relación con la tabla de categorías
                WHERE 
                    cc.id_caso_clinico = ?;`;
    db.query(sql, [id_caso_clinico], callback);
};

const obtenerPuntajesPorCaso = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    vp.id_valor_puntaje, 
                    vp.rubrica, 
                    vp.codigo, 
                    vp.valor 
                 FROM 
                    valor_puntaje vp 
                 WHERE 
                    vp.id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerMensajesPorCaso = (id_caso_clinico, callback) => {
    const sql = `SELECT 
                    ms.id_mensajes_simulacion, 
                    ms.titulo, 
                    ms.descripcion, 
                    ms.tiempo 
                 FROM 
                    mensajes_simulacion ms 
                 WHERE 
                    ms.id_caso_clinico = ?`;
    db.query(sql, [id_caso_clinico], callback);
};

const actualizarPuntaje = (id_valor_puntaje, data, callback) => {
    const sql = `UPDATE valor_puntaje 
                 SET rubrica = ?, codigo = ?, valor = ? 
                 WHERE id_valor_puntaje = ?`;
    db.query(sql, [data.rubrica, data.codigo, data.valor, id_valor_puntaje], callback);
};

const actualizarMensaje = (id_mensajes_simulacion, data, callback) => {
    const sql = `UPDATE mensajes_simulacion 
                 SET titulo = ?, descripcion = ?, tiempo = ? 
                 WHERE id_mensajes_simulacion = ?`;
    db.query(sql, [data.titulo, data.descripcion, data.tiempo, id_mensajes_simulacion], callback);
};

const actualizarCasoClinico = (id_caso_clinico, data, callback) => {
    const sql = `UPDATE caso_clinico 
                 SET id_categoria_simulacion = ?, difucultad = ?, tiempo = ? 
                 WHERE id_caso_clinico = ?`;
    db.query(sql, [data.id_categoria_simulacion, data.dificultad, data.tiempo, id_caso_clinico], callback);
};

const agregarPuntaje = (data, callback) => {
    const sql = `INSERT INTO valor_puntaje (id_historia_clinica, rubrica, codigo, valor) VALUES (?, ?, ?, ?)`;
    db.query(sql, [data.id_historia_clinica, data.rubrica, data.codigo, data.valor], callback);
};

const eliminarPuntaje = (id_valor_puntaje, callback) => {
    const sql = `DELETE FROM valor_puntaje WHERE id_valor_puntaje = ?`;
    db.query(sql, [id_valor_puntaje], callback);
};

const agregarMensaje = (data, callback) => {
    const sql = `INSERT INTO mensajes_simulacion (id_caso_clinico, titulo, descripcion, tiempo) VALUES (?, ?, ?, ?)`;
    db.query(sql, [data.id_caso_clinico, data.titulo, data.descripcion, data.tiempo], callback);
};

const eliminarMensaje = (id_mensajes_simulacion, callback) => {
    const sql = `DELETE FROM mensajes_simulacion WHERE id_mensajes_simulacion = ?`;
    db.query(sql, [id_mensajes_simulacion], callback);
};

const obtenerPaciente = (id_historia_clinica, callback) => {
    const sql = `
        SELECT p.*, hc.descripcion, hc.id_historia_clinica
        FROM paciente p
        JOIN caso_clinico cc ON p.id_paciente = cc.id_paciente
        JOIN historia_clinica hc ON hc.id_caso_clinico = cc.id_caso_clinico
        WHERE hc.id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarPaciente = (id_paciente, data, callback) => {
    const sql = `
        UPDATE paciente 
        SET nombre = ?, paterno = ?, materno = ?, fecha_nacimiento = ?, sexo = ?, peso = ?, talla = ?
        WHERE id_paciente = ?`;
    const values = [data.nombre, data.paterno, data.materno, data.fecha_nacimiento, data.sexo, data.peso, data.talla, id_paciente];
    db.query(sql, values, callback);
};

const obtenerAntecedentesPatologicos = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM antecedentes_patologicos WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarAntecedentesPatologicos = (id_antecedente_patologico, data, callback) => {
    //console.log("patologicos: ", data)
    const sql = `
        UPDATE antecedentes_patologicos 
        SET alergias = ?, cirugias = ?, enfermedades_congenitas = ?, enfermedades_infancia = ?, 
            enfermedades_adolescencia = ?, enfermedades_adulto = ?, traumatismos = ?, intoxicaciones = ?, 
            hospitalizaciones = ?, enfermedades = ?, transfusiones = ?, patologia_asociada = ?, medicacion_en_curso = ?
        WHERE id_historia_clinica = ?`;
    const values = [
        data.alergias, data.cirugias, data.enfermedades_congenitas, data.enfermedades_infancia,
        data.enfermedades_adolescencia, data.enfermedades_adulto, data.traumatismos, data.intoxicaciones,
        data.hospitalizaciones, data.enfermedades, data.transfusiones, data.patologia_asociada, 
        data.medicacion_en_curso, id_antecedente_patologico
    ];
    db.query(sql, values, callback);
};

const obtenerAntecedentesNoPatologicos = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM antecedentes_no_patologicos WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarAntecedentesNoPatologicos = (id_antecedentes_no_patologicos, data, callback) => {
    const sql = `
        UPDATE antecedentes_no_patologicos 
        SET antecedentes_nacimiento = ?, habitos = ?, factores_de_riesgo = ?
        WHERE id_historia_clinica = ?`;
    const values = [data.antecedentes_nacimiento, data.habitos, data.factores_de_riesgo, id_antecedentes_no_patologicos];
    db.query(sql, values, callback);
};

const obtenerAntecedentesFamiliares = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM antecedentes_familiares WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarAntecedentesFamiliares = (id_antecedentes_familiares, data, callback) => {
    const sql = `
        UPDATE antecedentes_familiares 
        SET padre = ?, madre = ?, hermanos = ?, hijos = ?, conyugue = ?
        WHERE id_historia_clinica = ?`;
    const values = [data.padre, data.madre, data.hermanos, data.hijos, data.conyugue, id_antecedentes_familiares];
    db.query(sql, values, callback);
};

const obtenerAnamnesisSistemas = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM anamnesis_sistemas WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarAnamnesisSistemas = (id_anamnesis_sistemas, data, callback) => {
    //console.log("puntaje: ", data)
    const sql = `
        UPDATE anamnesis_sistemas 
        SET tegumentario = ?, feed_tegumentario = ?, puntaje_tegumentario = ?, 
            cardiovascular = ?, feed_cardiovascular = ?, puntaje_cardiovascular = ?, 
            gastrointestinal = ?, feed_gastrointestinal = ?, puntaje_gastrointestinal = ?, 
            genitourinario = ?, feed_genitourinario = ?, puntaje_genitourinario = ?, 
            respiratorio = ?, feed_respiratorio = ?, puntaje_respiratorio = ?, 
            neurologico = ?, feed_neurologico = ?, puntaje_neurologico = ?, 
            locomotor = ?, feed_locomotor = ?, puntaje_locomotor = ?, 
            endocrino = ?, feed_endocrino = ?, puntaje_endocrino = ?, 
            hematico = ?, feed_hematico = ?, puntaje_hematico = ?, 
            psiquiatrico = ?, feed_psiquiatrico = ?, puntaje_psiquiatrico = ?
        WHERE id_anamnesis_sistemas = ?`;
    const values = [
        data.tegumentario, data.feed_tegumentario, data.puntaje_tegumentario,
        data.cardiovascular, data.feed_cardiovascular, data.puntaje_cardiovascular,
        data.gastrointestinal, data.feed_gastrointestinal, data.puntaje_gastrointestinal,
        data.genitourinario, data.feed_genitourinario, data.puntaje_genitourinario,
        data.respiratorio, data.feed_respiratorio, data.puntaje_respiratorio,
        data.neurologico, data.feed_neurologico, data.puntaje_neurologico,
        data.locomotor, data.feed_locomotor, data.puntaje_locomotor,
        data.endocrino, data.feed_endocrino, data.puntaje_endocrino,
        data.hematico, data.feed_hematico, data.puntaje_hematico,
        data.psiquiatrico, data.feed_psiquiatrico, data.puntaje_psiquiatrico,
        id_anamnesis_sistemas
    ];
    db.query(sql, values, callback);
};

const obtenerMotivosConsulta = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM motivo_consulta WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const agregarMotivoConsulta = (data, callback) => {
    const sql = `INSERT INTO motivo_consulta (motivo, id_historia_clinica) VALUES (?, ?)`;
    db.query(sql, [data.motivo, data.id_historia_clinica], callback);
};

const eliminarMotivoConsulta = (id_motivo_consulta, callback) => {
    const sql = `DELETE FROM motivo_consulta WHERE id_motivo_consulta = ?`;
    db.query(sql, [id_motivo_consulta], callback);
};

const obtenerPuntaje = (id_historia_clinica, callback) => {
    const sql = `SELECT codigo, valor FROM valor_puntaje WHERE id_historia_clinica = ? ORDER BY codigo`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarMotivoConsulta = (id_motivo_consulta, data, callback) => {
    const sql = `UPDATE motivo_consulta SET motivo = ? WHERE id_motivo_consulta = ?`;
    db.query(sql, [data.motivo, id_motivo_consulta], callback);
};

const obtenerExamenFisicoGeneral = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM examen_fisico_general WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenFisicoGeneral = (id_historia_clinica, data, callback) => {
    //console.log("modelo: ",data)
    const sql = `
        UPDATE examen_fisico_general 
        SET descripcion = ?, pa = ?, fc = ?, fr = ?, temperatura = ?, saturacion = ?, peso = ?, talla = ?, imc = ?, 
            feed_examen_fisico = ?, puntaje_examen_fisico = ? 
        WHERE id_historia_clinica = ?`;
    const values = [
        data.descripcion, data.pa, data.fc, data.fr, data.temperatura, data.saturacion, data.peso, 
        data.talla, data.imc, data.feed_examen_fisico, data.puntaje_examen_fisico, id_historia_clinica
    ];
    db.query(sql, values, callback);
};

const obtenerExamenFisicoSegmentario = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM examen_fisico_segmentario WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenFisicoSegmentario = (id_historia_clinica, data, callback) => {

    const sql = `
        UPDATE examen_fisico_segmentario 
        SET cabeza = ?, feed_cabeza = ?, puntaje_cabeza = ?, cuello = ?, feed_cuello = ?, puntaje_cuello = ?, 
            torax = ?, feed_torax = ?, puntaje_torax = ?, corazon = ?, feed_corazon = ?, puntaje_corazon = ?, 
            mamas = ?, feed_mamas = ?, puntaje_mamas = ?, abdomen = ?, feed_abdomen = ?, puntaje_abdomen = ?, 
            genitourinario = ?, feed_genitourinario = ?, puntaje_genitourinario = ?, extremidades = ?, 
            feed_extremidades = ?, puntaje_extremidades = ?, neurologico = ?, feed_neurologico = ?, 
            puntaje_neurologico = ? 
        WHERE id_historia_clinica = ?`;
    
    const values = [
        data.cabeza, data.feed_cabeza, data.puntaje_cabeza, data.cuello, data.feed_cuello, data.puntaje_cuello,
        data.torax, data.feed_torax, data.puntaje_torax, data.corazon, data.feed_corazon, data.puntaje_corazon,
        data.mamas, data.feed_mamas, data.puntaje_mamas, data.abdomen, data.feed_abdomen, data.puntaje_abdomen,
        data.genitourinario, data.feed_genitourinario, data.puntaje_genitourinario, data.extremidades,
        data.feed_extremidades, data.puntaje_extremidades, data.neurologico, data.feed_neurologico,
        data.puntaje_neurologico, id_historia_clinica
    ];
    
    db.query(sql, values, callback);
    
};

const obtenerExamenPiel = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM examen_piel WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenPiel = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_piel 
        SET descripcion = ?, feed_examen_piel = ?, puntaje_examen_piel = ? 
        WHERE id_historia_clinica = ?`;
    const values = [data.descripcion, data.feed_examen_piel, data.puntaje_examen_piel, id_historia_clinica];
    db.query(sql, values, callback);
};

const obtenerExamenCirculatorio = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM examen_circulatorio WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenCirculatorio = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_circulatorio 
        SET descripcion = ?, feed_examen_circulatorio = ?, puntaje_examen_circulatorio = ? 
        WHERE id_historia_clinica = ?`;
    const values = [data.descripcion, data.feed_examen_circulatorio, data.puntaje_examen_circulatorio, id_historia_clinica];
    db.query(sql, values, callback);
};

const obtenerExamenRespiratorio = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM examen_respiratorio WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenRespiratorio = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_respiratorio 
        SET descripcion = ?, feed_examen_respiratorio = ?, puntaje_examen_respiratorio = ? 
        WHERE id_historia_clinica = ?`;
    const values = [data.descripcion, data.feed_examen_respiratorio, data.puntaje_examen_respiratorio, id_historia_clinica];
    db.query(sql, values, callback);
};

const obtenerExamenViaAerea = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM examen_via_aerea WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenViaAerea = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_via_aerea 
        SET descripcion = ?, feed_examen_via_aerea = ?, puntaje_examen_via_aerea = ? 
        WHERE id_historia_clinica = ?`;
    const values = [data.descripcion, data.feed_examen_via_aerea, data.puntaje_examen_via_aerea, id_historia_clinica];
    db.query(sql, values, callback);
};

const obtenerExamenPsicologico = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM examen_psicologico WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenPsicologico = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_psicologico 
        SET descripcion = ?, feed_examen_psicologico = ?, puntaje_examen_psicologico = ? 
        WHERE id_historia_clinica = ?`;
    const values = [data.descripcion, data.feed_examen_psicologico, data.puntaje_examen_psicologico, id_historia_clinica];
    db.query(sql, values, callback);
};

const obtenerExamenObstetrico = (id_historia_clinica, callback) => {
    const sql = 'SELECT * FROM examen_obstetrico WHERE id_historia_clinica = ?';
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenObstetrico = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_obstetrico 
        SET presentacion = ?, dorso = ?, afu = ?, fcf = ?, paf = ?, monitorizacion = ?, dilatacion = ?, 
            borramiento = ?, membranas = ?, plano = ?, au = ?, pelvis = ?, vp = ?, feed_examen_obstetrico = ?, 
            puntaje_examen_obstetrico = ?
        WHERE id_historia_clinica = ?`;
    const values = [
        data.presentacion, data.dorso, data.afu, data.fcf, data.paf, data.monitorizacion,
        data.dilatacion, data.borramiento, data.membranas, data.plano, data.au, 
        data.pelvis, data.vp, data.feed_examen_obstetrico, data.puntaje_examen_obstetrico, id_historia_clinica
    ];
    db.query(sql, values, callback);
};

const obtenerSignosVitales = (id_historia_clinica, callback) => {
    const sql = 'SELECT * FROM signos_vitales WHERE id_historia_clinica = ?';
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarSignosVitales = (id_historia_clinica, data, callback) => {
    //console.log(data)
    const sql = `
        UPDATE signos_vitales 
        SET frecuencia_cardiaca = ?, saturacion = ?, presion_sanguinea_sistole = ?, 
            presion_sanguinea_distole = ?, temperatura = ?, feed_signos_vitales = ?, 
            puntaje_signos_vitales = ? 
        WHERE id_historia_clinica = ?
    `;
    const values = [
        data.frecuencia_cardiaca, data.saturacion, data.presion_sanguinea_sistole,
        data.presion_sanguinea_distole, data.temperatura, data.feed_signos_vitales,
        data.puntaje_signos_vitales, id_historia_clinica
    ];

    db.query(sql, values, callback);
};

const obtenerCategoriasDiferenciales = (callback) => {
    const sql = `SELECT * FROM categoria_diferencial`;
    db.query(sql, callback);
};

const obtenerDiagnosticosPorCategoria = (id_categoria_diferencial, callback) => {
    const sql = `SELECT * FROM diagnostico WHERE id_categoria_diferencial = ?`;
    db.query(sql, [id_categoria_diferencial], callback);
};

const obtenerDiagnosticosDiferencialesPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT dd.*, d.nombre, d.descripcion 
        FROM diagnosticos_diferenciales dd 
        JOIN diagnostico d ON dd.id_diagnostico = d.id_diagnostico 
        WHERE dd.id_historia_clinica = ?
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarDiagnosticosDiferenciales = (id_historia_clinica, data, callback) => {
    const sqlSelect = `
        SELECT id_diagnosticos_diferenciales, id_diagnostico
        FROM diagnosticos_diferenciales
        WHERE id_historia_clinica = ?
    `;
    db.query(sqlSelect, [id_historia_clinica], (err, results) => {
        if (err) return callback(err);

        const existingDiagnosticos = results;
        const existingIds = existingDiagnosticos.map(d => d.id_diagnostico);
        const newIds = data.map(d => d.id_diagnostico);
        const idsToDelete = existingIds.filter(id => !newIds.includes(id));
        const diagnosToInsert = data.filter(d => !existingIds.includes(d.id_diagnostico));
        const diagnosToUpdate = data.filter(d => existingIds.includes(d.id_diagnostico));

        db.beginTransaction(err => {
            if (err) return callback(err);

            let deletePromise = Promise.resolve();
            if (idsToDelete.length > 0) {
                const sqlDelete = `
                    DELETE FROM diagnosticos_diferenciales
                    WHERE id_historia_clinica = ? AND id_diagnostico IN (?)
                `;
                deletePromise = new Promise((resolve, reject) => {
                    db.query(sqlDelete, [id_historia_clinica, idsToDelete], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            let insertPromise = Promise.resolve();
            if (diagnosToInsert.length > 0) {
                const sqlInsert = `
                    INSERT INTO diagnosticos_diferenciales (id_diagnostico, id_historia_clinica, feed_diagnostico_diferencial, puntaje_diagnostico_diferencial)
                    VALUES ?
                `;
                const values = diagnosToInsert.map(diagnostico => [
                    diagnostico.id_diagnostico,
                    id_historia_clinica,
                    diagnostico.feed_diagnostico_diferencial,
                    diagnostico.puntaje_diagnostico_diferencial,
                ]);
                insertPromise = new Promise((resolve, reject) => {
                    db.query(sqlInsert, [values], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            let updatePromises = [];
            diagnosToUpdate.forEach(diagnostico => {
                const sqlUpdate = `
                    UPDATE diagnosticos_diferenciales
                    SET feed_diagnostico_diferencial = ?, puntaje_diagnostico_diferencial = ?
                    WHERE id_historia_clinica = ? AND id_diagnostico = ?
                `;
                updatePromises.push(new Promise((resolve, reject) => {
                    db.query(sqlUpdate, [
                        diagnostico.feed_diagnostico_diferencial,
                        diagnostico.puntaje_diagnostico_diferencial,
                        id_historia_clinica,
                        diagnostico.id_diagnostico
                    ], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                }));
            });

            Promise.all([deletePromise, insertPromise, ...updatePromises])
                .then(() => {
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                callback(err);
                            });
                        }
                        callback(null);
                    });
                })
                .catch(err => {
                    db.rollback(() => {
                        callback(err);
                    });
                });
        });
    });
};

const obtenerCategoriasMedicamentos = (callback) => {
    const sql = 'SELECT * FROM categoria_medicamento';
    db.query(sql, callback);
};

const obtenerMedicamentosPorCategoria = (id_categoria_medicamento, callback) => {
    const sql = 'SELECT * FROM medicamento WHERE id_categoria_medicamento = ?';
    db.query(sql, [id_categoria_medicamento], callback);
};

const obtenerMedicamentosSuministradosPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT ms.*, m.nombre, m.descripcion
        FROM medicamentos_suministrados ms
        JOIN medicamento m ON ms.id_medicamento = m.id_medicamento
        WHERE ms.id_historia_clinica = ?
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarMedicamentosSuministrados = (id_historia_clinica, data, callback) => {
    const sqlSelect = `
        SELECT id_medicamentos_suministrados, id_medicamento
        FROM medicamentos_suministrados
        WHERE id_historia_clinica = ?
    `;
    db.query(sqlSelect, [id_historia_clinica], (err, results) => {
        if (err) return callback(err);

        const existingMedicamentos = results;
        const existingIds = existingMedicamentos.map(m => m.id_medicamento);
        const newIds = data.map(m => m.id_medicamento);
        const idsToDelete = existingIds.filter(id => !newIds.includes(id));
        const medsToInsert = data.filter(m => !existingIds.includes(m.id_medicamento));
        const medsToUpdate = data.filter(m => existingIds.includes(m.id_medicamento));
        db.beginTransaction(err => {
            if (err) return callback(err);

            let deletePromise = Promise.resolve();
            if (idsToDelete.length > 0) {
                const sqlDelete = `
                    DELETE FROM medicamentos_suministrados
                    WHERE id_historia_clinica = ? AND id_medicamento IN (?)
                `;
                deletePromise = new Promise((resolve, reject) => {
                    db.query(sqlDelete, [id_historia_clinica, idsToDelete], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            let insertPromise = Promise.resolve();
            if (medsToInsert.length > 0) {
                const sqlInsert = `
                    INSERT INTO medicamentos_suministrados (id_medicamento, id_historia_clinica, feed_medicamento_diferencial, puntaje_medicamento_diferencial)
                    VALUES ?
                `;
                const values = medsToInsert.map(medicamento => [
                    medicamento.id_medicamento,
                    id_historia_clinica,
                    medicamento.feed_medicamento_diferencial,
                    medicamento.puntaje_medicamento_diferencial,
                ]);
                insertPromise = new Promise((resolve, reject) => {
                    db.query(sqlInsert, [values], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            let updatePromises = [];
            medsToUpdate.forEach(medicamento => {
                const sqlUpdate = `
                    UPDATE medicamentos_suministrados
                    SET feed_medicamento_diferencial = ?, puntaje_medicamento_diferencial = ?
                    WHERE id_historia_clinica = ? AND id_medicamento = ?
                `;
                updatePromises.push(new Promise((resolve, reject) => {
                    db.query(sqlUpdate, [
                        medicamento.feed_medicamento_diferencial,
                        medicamento.puntaje_medicamento_diferencial,
                        id_historia_clinica,
                        medicamento.id_medicamento
                    ], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                }));
            });

            Promise.all([deletePromise, insertPromise, ...updatePromises])
                .then(() => {
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                callback(err);
                            });
                        }
                        callback(null);
                    });
                })
                .catch(err => {
                    db.rollback(() => {
                        callback(err);
                    });
                });
        });
    });
};



module.exports = {
    obtenerCasosClinicos,
    cambiarEstadoCaso,
    obtenerCategoriasSimulacion,
    obtenerCasoClinicoPorId,
    obtenerPuntajesPorCaso,
    obtenerMensajesPorCaso,
    actualizarPuntaje,
    actualizarMensaje,
    actualizarCasoClinico,
    agregarPuntaje,
    eliminarPuntaje,
    agregarMensaje,
    eliminarMensaje,
    obtenerPaciente,
    actualizarPaciente,
    obtenerAntecedentesPatologicos,
    actualizarAntecedentesPatologicos,
    obtenerAntecedentesNoPatologicos,
    actualizarAntecedentesNoPatologicos,
    obtenerAntecedentesFamiliares,
    actualizarAntecedentesFamiliares,
    obtenerAnamnesisSistemas,
    actualizarAnamnesisSistemas,
    obtenerMotivosConsulta,
    agregarMotivoConsulta,
    eliminarMotivoConsulta,
    obtenerPuntaje,
    actualizarMotivoConsulta,
    obtenerExamenFisicoGeneral,
    actualizarExamenFisicoGeneral,
    obtenerExamenFisicoSegmentario,
    actualizarExamenFisicoSegmentario,
    obtenerExamenPiel,
    actualizarExamenPiel,
    obtenerExamenCirculatorio,
    actualizarExamenCirculatorio,
    obtenerExamenRespiratorio,
    actualizarExamenRespiratorio,
    obtenerExamenViaAerea,
    actualizarExamenViaAerea,
    obtenerExamenPsicologico,
    actualizarExamenPsicologico,
    obtenerExamenObstetrico,
    actualizarExamenObstetrico,
    obtenerSignosVitales,
    actualizarSignosVitales,
    obtenerCategoriasDiferenciales,
    obtenerDiagnosticosPorCategoria,
    obtenerDiagnosticosDiferencialesPorHistoriaClinica,
    actualizarDiagnosticosDiferenciales,
    obtenerCategoriasMedicamentos,
    obtenerMedicamentosPorCategoria,
    obtenerMedicamentosSuministradosPorHistoriaClinica,
    actualizarMedicamentosSuministrados
};