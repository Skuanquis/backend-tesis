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
                    cc.diagnostico,
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
        UPDATE paciente p
        JOIN caso_clinico cc ON p.id_paciente = cc.id_paciente
        JOIN historia_clinica hc ON hc.id_caso_clinico = cc.id_caso_clinico
        SET p.nombre = ?, p.paterno = ?, p.materno = ?, p.edad = ?, p.sexo = ?, p.peso = ?, p.talla = ?, p.ocupacion = ?, hc.descripcion = ?
        WHERE hc.id_historia_clinica = ?`;
    const values = [data.nombre, data.paterno, data.materno, data.edad, data.sexo, data.peso, data.talla, data.ocupacion, data.descripcion, id_paciente];
    db.query(sql, values, callback);
};

const obtenerAntecedentesPatologicos = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM antecedentes_patologicos WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarAntecedentesPatologicos = (id_antecedente_patologico, data, callback) => {
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

const obtenerAntecedentesGinecoObstetricos = (id_historia_clinica, callback) => {
    const sql = `SELECT * FROM antecedentes_gineco_obstetricos WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarAntecedentesGinecoObstetricos = (id_antecedentes_familiares, data, callback) => {
    const sql = `
        UPDATE antecedentes_gineco_obstetricos
        SET menarca = ?, fum = ?, fpp = ?, gestaciones = ?, partos = ?, abortos = ?, cesarias = ?, cpn = ?
        WHERE id_historia_clinica = ?`;
    const values = [data.menarca, data.fum, data.fpp, data.gestaciones, data.partos, data.abortos, data.cesarias, data.cpn, id_antecedentes_familiares];
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
        SET cabeza = ?, feed_cabeza = ?, puntaje_cabeza = ?, img_cabeza = ?, cuello = ?, feed_cuello = ?, puntaje_cuello = ?, img_cuello = ?, 
            torax = ?, feed_torax = ?, puntaje_torax = ?, img_torax = ?, corazon = ?, feed_corazon = ?, puntaje_corazon = ?, img_corazon = ?, 
            mamas = ?, feed_mamas = ?, puntaje_mamas = ?, img_mamas = ?, abdomen = ?, feed_abdomen = ?, puntaje_abdomen = ?, img_abdomen = ?, 
            genitourinario = ?, feed_genitourinario = ?, puntaje_genitourinario = ?, img_genitourinario = ?, extremidades = ?, 
            feed_extremidades = ?, puntaje_extremidades = ?, img_extremidades = ?, neurologico = ?, feed_neurologico = ?, 
            puntaje_neurologico = ?, img_neurologico = ?, piel = ?, feed_piel = ?, 
            puntaje_piel = ?, img_piel = ?
        WHERE id_historia_clinica = ?`;
    
    const values = [
        data.cabeza, data.feed_cabeza, data.puntaje_cabeza, data.img_cabeza, data.cuello, data.feed_cuello, data.puntaje_cuello, data.img_cuello,
        data.torax, data.feed_torax, data.puntaje_torax, data.img_torax, data.corazon, data.feed_corazon, data.puntaje_corazon, data.img_corazon,
        data.mamas, data.feed_mamas, data.puntaje_mamas, data.img_mamas, data.abdomen, data.feed_abdomen, data.puntaje_abdomen, data.img_abdomen,
        data.genitourinario, data.feed_genitourinario, data.puntaje_genitourinario, data.img_genitourinario, data.extremidades,
        data.feed_extremidades, data.puntaje_extremidades, data.img_extremidades, data.neurologico, data.feed_neurologico,
        data.puntaje_neurologico, data.img_neurologico, data.piel, data.feed_piel,
        data.puntaje_piel, data.img_piel, id_historia_clinica
    ];
    
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

const obtenerSubespecialidades = (callback) => {
    const sql = `SELECT id_subespecialidad, nombre FROM subespecialidad ORDER BY nombre`;
    db.query(sql, callback);
};

const obtenerSubespecialidadesPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT se.id_subespecialidad, se.nombre, ce.descripcion, ce.feed_subespecialidad, ce.puntaje_subespecialidad
        FROM subespecialidad se
        INNER JOIN consulta_externa ce ON se.id_subespecialidad = ce.id_subespecialidad
        WHERE ce.id_historia_clinica = ?
        ORDER BY se.nombre
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarSubespecialidades = (id_historia_clinica, subsData, callback) => {
    db.beginTransaction(err => {
        if (err) {
            return callback(err);
        }
        const selectSql = 'SELECT id_subespecialidad FROM consulta_externa WHERE id_historia_clinica = ?';
        db.query(selectSql, [id_historia_clinica], (err, results) => {
            if (err) {
                return db.rollback(() => {
                    callback(err);
                });
            }
            const existingIds = results.map(row => row.id_subespecialidad);
            const subsDataIds = subsData.map(sub => sub.id_subespecialidad);
            const idsToInsert = subsDataIds.filter(id => !existingIds.includes(id));
            const idsToUpdate = subsDataIds.filter(id => existingIds.includes(id));
            const idsToDelete = existingIds.filter(id => !subsDataIds.includes(id));
            const tasks = [];

            if (idsToDelete.length > 0) {
                tasks.push((cb) => {
                    const deleteSql = 'DELETE FROM consulta_externa WHERE id_historia_clinica = ? AND id_subespecialidad IN (?)';
                    db.query(deleteSql, [id_historia_clinica, idsToDelete], cb);
                });
            }

            idsToUpdate.forEach(id_subespecialidad => {
                const sub = subsData.find(s => s.id_subespecialidad === id_subespecialidad);
                tasks.push((cb) => {
                    const updateSql = 'UPDATE consulta_externa SET descripcion = ?, feed_subespecialidad = ?, puntaje_subespecialidad = ? WHERE id_historia_clinica = ? AND id_subespecialidad = ?';
                    const params = [sub.descripcion, sub.feedback, sub.score, id_historia_clinica, id_subespecialidad];
                    db.query(updateSql, params, cb);
                });
            });

            if (idsToInsert.length > 0) {
                tasks.push((cb) => {
                    const insertSubs = subsData.filter(sub => idsToInsert.includes(sub.id_subespecialidad));
                    const insertValues = insertSubs.map(sub => [
                        sub.id_subespecialidad,
                        id_historia_clinica,
                        sub.descripcion,
                        sub.feedback,
                        sub.score
                    ]);

                    const insertSql = 'INSERT INTO consulta_externa (id_subespecialidad, id_historia_clinica, descripcion, feed_subespecialidad, puntaje_subespecialidad) VALUES ?';
                    db.query(insertSql, [insertValues], cb);
                });
            }

            executeTasks(tasks, (err) => {
                if (err) {
                    return db.rollback(() => {
                        callback(err);
                    });
                }
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => {
                            callback(err);
                        });
                    }
                    callback(null);
                });
            });
        });
    });
};
function executeTasks(tasks, finalCallback) {
    let index = 0;

    function next(err) {
        if (err || index === tasks.length) {
            return finalCallback(err);
        }
        const task = tasks[index++];
        task(next);
    }

    next();
}




const obtenerCategoriasConImagenologias = (callback) => {
    const sql = `
        SELECT ci.id_categoria_imagenologia, ci.nombre AS categoria_nombre,
               i.id_imagenologia, i.nombre AS imagenologia_nombre, i.descripcion
        FROM categoria_imagenologia ci
        LEFT JOIN imagenologia i ON ci.id_categoria_imagenologia = i.id_categoria_imagenologia
        ORDER BY ci.nombre, i.nombre
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err);

        // Organizar los resultados en categorías con sus imagenologías
        const categories = [];
        const categoryMap = {};

        results.forEach(row => {
            let category = categoryMap[row.id_categoria_imagenologia];
            if (!category) {
                category = {
                    id_categoria_imagenologia: row.id_categoria_imagenologia,
                    nombre: row.categoria_nombre,
                    imagenologias: []
                };
                categoryMap[row.id_categoria_imagenologia] = category;
                categories.push(category);
            }
            if (row.id_imagenologia) {
                category.imagenologias.push({
                    id_imagenologia: row.id_imagenologia,
                    nombre: row.imagenologia_nombre,
                    descripcion: row.descripcion
                });
            }
        });
        callback(null, categories);
    });
};

// Obtener estudios de imagenología por historia clínica
const obtenerEstudiosImagenologiaPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT ei.*, i.nombre AS imagenologia_nombre, ci.nombre AS categoria_nombre
        FROM estudios_imagenologia ei
        INNER JOIN imagenologia i ON ei.id_imagenologia = i.id_imagenologia
        INNER JOIN categoria_imagenologia ci ON i.id_categoria_imagenologia = ci.id_categoria_imagenologia
        WHERE ei.id_historia_clinica = ?
        ORDER BY ci.nombre, i.nombre
    `;
    db.query(sql, [id_historia_clinica], callback);
};

// Actualizar estudios de imagenología
const actualizarEstudiosImagenologia = (id_historia_clinica, estudiosData, callback) => {
    db.beginTransaction(err => {
        if (err) return callback(err);

        const sqlGetExisting = 'SELECT id_estudios_imagenologia FROM estudios_imagenologia WHERE id_historia_clinica = ?';
        db.query(sqlGetExisting, [id_historia_clinica], (err, results) => {
            if (err) {
                return db.rollback(() => callback(err));
            }
            const existingIds = results.map(row => row.id_estudios_imagenologia);
            const estudiosDataIds = estudiosData.map(estudio => estudio.id_estudios_imagenologia).filter(id => id);

            const idsToInsert = estudiosData.filter(estudio => !estudio.id_estudios_imagenologia);
            const idsToUpdate = estudiosData.filter(estudio => estudio.id_estudios_imagenologia && existingIds.includes(estudio.id_estudios_imagenologia));
            const idsToDelete = existingIds.filter(id => !estudiosDataIds.includes(id));

            const tasks = [];
            if (idsToDelete.length > 0) {
                tasks.push(cb => {
                    const sqlDelete = 'DELETE FROM estudios_imagenologia WHERE id_estudios_imagenologia IN (?)';
                    db.query(sqlDelete, [idsToDelete], cb);
                });
            }
            idsToUpdate.forEach(estudio => {
                tasks.push(cb => {
                    const sqlUpdate = `
                        UPDATE estudios_imagenologia
                        SET interpretacion = ?, feed_estudios_imagenologia = ?, puntaje_estudios_imagenologia = ?, path = ?, id_imagenologia = ?
                        WHERE id_estudios_imagenologia = ?
                    `;
                    const params = [
                        estudio.interpretacion,
                        estudio.feed_estudios_imagenologia,
                        estudio.puntaje_estudios_imagenologia,
                        estudio.path,
                        estudio.id_imagenologia,
                        estudio.id_estudios_imagenologia
                    ];
                    db.query(sqlUpdate, params, cb);
                });
            });
            idsToInsert.forEach(estudio => {
                tasks.push(cb => {
                    const sqlInsert = `
                        INSERT INTO estudios_imagenologia (id_imagenologia, id_historia_clinica, interpretacion, path, feed_estudios_imagenologia, puntaje_estudios_imagenologia)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;
                    const params = [
                        estudio.id_imagenologia,
                        id_historia_clinica,
                        estudio.interpretacion,
                        estudio.path,
                        estudio.feed_estudios_imagenologia,
                        estudio.puntaje_estudios_imagenologia
                    ];
                    db.query(sqlInsert, params, (err, result) => {
                        if (err) return cb(err);
                        estudio.id_estudios_imagenologia = result.insertId; // Actualiza el ID en el objeto
                        cb();
                    });
                });
            });

            executeTasks(tasks, (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }
                    callback(null);
                });
            });
        });
    });
};

function executeTasks(tasks, finalCallback) {
    let index = 0;

    function next(err) {
        if (err || index === tasks.length) {
            return finalCallback(err);
        }
        const task = tasks[index++];
        task(next);
    }

    next();
}

const obtenerCategoriasProcedimientos = (callback) => {
    const sql = 'SELECT * FROM categoria_procedimiento';
    db.query(sql, callback);
};

// Obtener procedimientos por categoría
const obtenerProcedimientosPorCategoria = (id_categoria_procedimiento, callback) => {
    const sql = 'SELECT * FROM procedimiento WHERE id_categoria_procedimiento = ?';
    db.query(sql, [id_categoria_procedimiento], callback);
};

// Obtener procedimientos asignados por historia clínica
const obtenerProcedimientosAsignadosPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT pa.*, p.nombre, p.descripcion
        FROM procedimiento_asignado pa
        JOIN procedimiento p ON pa.id_procedimiento = p.id_procedimiento
        WHERE pa.id_historia_clinica = ?
    `;
    db.query(sql, [id_historia_clinica], callback);
};

// Actualizar procedimientos asignados
const actualizarProcedimientosAsignados = (id_historia_clinica, data, callback) => {
    const sqlSelect = `
        SELECT id_procedimiento_asignado, id_procedimiento
        FROM procedimiento_asignado
        WHERE id_historia_clinica = ?
    `;
    db.query(sqlSelect, [id_historia_clinica], (err, results) => {
        if (err) return callback(err);

        const existingProcedimientos = results;
        const existingIds = existingProcedimientos.map(p => p.id_procedimiento);
        const newIds = data.map(p => p.id_procedimiento);
        const idsToDelete = existingIds.filter(id => !newIds.includes(id));
        const procsToInsert = data.filter(p => !existingIds.includes(p.id_procedimiento));
        const procsToUpdate = data.filter(p => existingIds.includes(p.id_procedimiento));
        db.beginTransaction(err => {
            if (err) return callback(err);

            let deletePromise = Promise.resolve();
            if (idsToDelete.length > 0) {
                const sqlDelete = `
                    DELETE FROM procedimiento_asignado
                    WHERE id_historia_clinica = ? AND id_procedimiento IN (?)
                `;
                deletePromise = new Promise((resolve, reject) => {
                    db.query(sqlDelete, [id_historia_clinica, idsToDelete], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            let insertPromise = Promise.resolve();
            if (procsToInsert.length > 0) {
                const sqlInsert = `
                    INSERT INTO procedimiento_asignado (id_procedimiento, id_historia_clinica, feed_procedimiento_asignado, puntaje_procedimiento_asignado)
                    VALUES ?
                `;
                const values = procsToInsert.map(procedimiento => [
                    procedimiento.id_procedimiento,
                    id_historia_clinica,
                    procedimiento.feed_procedimiento_asignado,
                    procedimiento.puntaje_procedimiento_asignado,
                ]);
                insertPromise = new Promise((resolve, reject) => {
                    db.query(sqlInsert, [values], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            }

            let updatePromises = [];
            procsToUpdate.forEach(procedimiento => {
                const sqlUpdate = `
                    UPDATE procedimiento_asignado
                    SET feed_procedimiento_asignado = ?, puntaje_procedimiento_asignado = ?
                    WHERE id_historia_clinica = ? AND id_procedimiento = ?
                `;
                updatePromises.push(new Promise((resolve, reject) => {
                    db.query(sqlUpdate, [
                        procedimiento.feed_procedimiento_asignado,
                        procedimiento.puntaje_procedimiento_asignado,
                        id_historia_clinica,
                        procedimiento.id_procedimiento
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


const obtenerTraspaso = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            t.opcion_uno,
            t.puntaje_opcion_uno,
            t.feed_opcion_uno,
            t.opcion_dos,
            t.puntaje_opcion_dos,
            t.feed_opcion_dos,
            t.opcion_tres,
            t.puntaje_opcion_tres,
            t.feed_opcion_tres,
            t.opcion_cuatro,
            t.puntaje_opcion_cuatro,
            t.feed_opcion_cuatro
        FROM 
            traspaso t
        WHERE 
            t.id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarTraspaso = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
                    traspaso
                SET 
                    puntaje_opcion_uno = ?,
                    feed_opcion_uno = ?,
                    puntaje_opcion_dos = ?,
                    feed_opcion_dos = ?,
                    puntaje_opcion_tres = ?,
                    feed_opcion_tres = ?,
                    puntaje_opcion_cuatro = ?,
                    feed_opcion_cuatro = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_opcion_uno, data.feed_opcion_uno ,data.puntaje_opcion_dos, data.feed_opcion_dos ,data.puntaje_opcion_tres, data.feed_opcion_tres,data.puntaje_opcion_cuatro, data.feed_opcion_cuatro, id_historia_clinica], callback);
};

const actualizarDiagnosticoFinal = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE
                    caso_clinico
                SET
                    diagnostico = ?
                WHERE
                    id_caso_clinico = ?;
    `;
    db.query(sql, [data.diagnostico, id_historia_clinica], callback);
};

const obtenerTraspasoRubrica = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                t.opcion_uno,
                t.puntaje_opcion_uno,
                vp_uno.rubrica AS rubrica_opcion_uno,
                t.feed_opcion_uno,
                t.opcion_dos,
                t.puntaje_opcion_dos,
                vp_dos.rubrica AS rubrica_opcion_dos,
                t.feed_opcion_dos,
                t.opcion_tres,
                t.puntaje_opcion_tres,
                vp_tres.rubrica AS rubrica_opcion_tres,
                t.feed_opcion_tres,
                t.opcion_cuatro,
                t.puntaje_opcion_cuatro,
                vp_cuatro.rubrica AS rubrica_opcion_cuatro,
                t.feed_opcion_cuatro
            FROM 
                traspaso t
            LEFT JOIN 
                valor_puntaje vp_uno 
                ON vp_uno.id_historia_clinica = t.id_historia_clinica 
                AND vp_uno.codigo = t.puntaje_opcion_uno
            LEFT JOIN 
                valor_puntaje vp_dos 
                ON vp_dos.id_historia_clinica = t.id_historia_clinica 
                AND vp_dos.codigo = t.puntaje_opcion_dos
            LEFT JOIN 
                valor_puntaje vp_tres 
                ON vp_tres.id_historia_clinica = t.id_historia_clinica 
                AND vp_tres.codigo = t.puntaje_opcion_tres
            LEFT JOIN 
                valor_puntaje vp_cuatro 
                ON vp_cuatro.id_historia_clinica = t.id_historia_clinica 
                AND vp_cuatro.codigo = t.puntaje_opcion_cuatro
            WHERE 
                t.id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerCategoriasAnalisis = (callback) => {
    const sql = 'SELECT * FROM categoria_analisis';
    db.query(sql, callback);
};

// Obtener subcategorías de análisis por categoría
const obtenerSubcategoriasPorCategoria = (id_categoria_analisis, callback) => {
    const sql = 'SELECT * FROM subcategoria_analisis WHERE id_categoria_analisis = ?';
    db.query(sql, [id_categoria_analisis], callback);
};

const obtenerSolicitudesAnalisisPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sqlSolicitudes = `
        SELECT sa.*, ca.nombre_categoria
        FROM solicitud_analisis sa
        JOIN categoria_analisis ca ON sa.id_categoria_analisis = ca.id_categoria_analisis
        WHERE sa.id_historia_clinica = ?
    `;
    db.query(sqlSolicitudes, [id_historia_clinica], (err, solicitudes) => {
        if (err) return callback(err);

        if (solicitudes.length === 0) {
            return callback(null, []);
        }

        const solicitudIds = solicitudes.map(s => s.id_solicitud_analisis);
        const sqlDetalles = `
            SELECT dsa.*, sca.nombre_subcategoria
            FROM detalle_subanalisis dsa
            JOIN subcategoria_analisis sca ON dsa.id_subcategoria_analisis = sca.id_subcategoria_analisis
            WHERE dsa.id_solicitud_analisis IN (?)
        `;
        db.query(sqlDetalles, [solicitudIds], (err, detalles) => {
            if (err) return callback(err);

            // Mapear los detalles a las solicitudes correspondientes
            solicitudes.forEach(solicitud => {
                solicitud.detalles = detalles.filter(d => d.id_solicitud_analisis === solicitud.id_solicitud_analisis);
            });

            callback(null, solicitudes);
        });
    });
};

const actualizarSolicitudesAnalisis = (id_historia_clinica, data, callback) => {
    db.beginTransaction(err => {
        if (err) return callback(err);

        // Obtener solicitudes existentes
        const sqlFetchSolicitudes = `
            SELECT id_solicitud_analisis, id_categoria_analisis
            FROM solicitud_analisis
            WHERE id_historia_clinica = ?
        `;
        db.query(sqlFetchSolicitudes, [id_historia_clinica], (err, existingSolicitudes) => {
            if (err) {
                return db.rollback(() => callback(err));
            }

            const existingSolicitudesMap = {};
            existingSolicitudes.forEach(sa => {
                existingSolicitudesMap[sa.id_categoria_analisis] = sa;
            });

            const solicitudesToKeep = [];
            const solicitudesToDelete = [];

            // Procesar solicitudes
            processSolicitudes(0);

            function processSolicitudes(index) {
                if (index >= data.length) {
                    // Después de procesar todas las solicitudes
                    deleteUnwantedSolicitudes();
                    return;
                }

                const solicitud = data[index];

                if (solicitud.id_solicitud_analisis) {
                    if (!solicitud.detalles || solicitud.detalles.length === 0) {
                        // Si no hay detalles, marcar solicitud para eliminar
                        solicitudesToDelete.push(solicitud.id_solicitud_analisis);
                        processSolicitudes(index + 1);
                    } else {
                        // Actualizar solicitud existente
                        const sqlUpdateSolicitud = `
                            UPDATE solicitud_analisis
                            SET puntaje_analisis = ?, feed_analsis = ?
                            WHERE id_solicitud_analisis = ?
                        `;
                        db.query(sqlUpdateSolicitud, [
                            solicitud.puntaje_analisis,
                            solicitud.feed_analsis,
                            solicitud.id_solicitud_analisis
                        ], (err) => {
                            if (err) {
                                return db.rollback(() => callback(err));
                            }

                            solicitudesToKeep.push(solicitud.id_solicitud_analisis);

                            // Procesar detalles
                            procesarDetalles(solicitud, (err) => {
                                if (err) {
                                    return db.rollback(() => callback(err));
                                }
                                processSolicitudes(index + 1);
                            });
                        });
                    }
                } else {
                    if (!solicitud.detalles || solicitud.detalles.length === 0) {
                        // No hay nada que hacer si no hay detalles y es una solicitud nueva
                        processSolicitudes(index + 1);
                    } else {
                        // Insertar nueva solicitud
                        const sqlInsertSolicitud = `
                            INSERT INTO solicitud_analisis (id_historia_clinica, id_categoria_analisis, puntaje_analisis, feed_analsis)
                            VALUES (?, ?, ?, ?)
                        `;
                        db.query(sqlInsertSolicitud, [
                            id_historia_clinica,
                            solicitud.id_categoria_analisis,
                            solicitud.puntaje_analisis,
                            solicitud.feed_analsis
                        ], (err, result) => {
                            if (err) {
                                return db.rollback(() => callback(err));
                            }

                            solicitud.id_solicitud_analisis = result.insertId;
                            solicitudesToKeep.push(solicitud.id_solicitud_analisis);

                            //console.log('Inserted solicitud_analisis with ID:', solicitud.id_solicitud_analisis);

                            // Procesar detalles
                            procesarDetalles(solicitud, (err) => {
                                if (err) {
                                    return db.rollback(() => callback(err));
                                }
                                processSolicitudes(index + 1);
                            });
                        });
                    }
                }
            }

            function deleteUnwantedSolicitudes() {
                const idsToDelete = existingSolicitudes
                    .filter(sa => !solicitudesToKeep.includes(sa.id_solicitud_analisis))
                    .map(sa => sa.id_solicitud_analisis)
                    .concat(solicitudesToDelete);

                if (idsToDelete.length > 0) {
                    db.query(
                        `DELETE FROM detalle_subanalisis WHERE id_solicitud_analisis IN (?)`,
                        [idsToDelete],
                        (err) => {
                            if (err) {
                                return db.rollback(() => callback(err));
                            }
                            db.query(
                                `DELETE FROM solicitud_analisis WHERE id_solicitud_analisis IN (?)`,
                                [idsToDelete],
                                (err) => {
                                    if (err) {
                                        return db.rollback(() => callback(err));
                                    }
                                    commitTransaction();
                                }
                            );
                        }
                    );
                } else {
                    commitTransaction();
                }
            }

            function commitTransaction() {
                db.commit((err) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }
                    callback(null);
                });
            }

            function procesarDetalles(solicitud, cb) {
                const id_solicitud_analisis = solicitud.id_solicitud_analisis;

                //console.log('Processing detalles for id_solicitud_analisis:', id_solicitud_analisis);

                // Obtener detalles existentes para esta solicitud
                const sqlFetchDetalles = `
                    SELECT id_detalle_subanalisis, id_subcategoria_analisis
                    FROM detalle_subanalisis
                    WHERE id_solicitud_analisis = ?
                `;
                db.query(sqlFetchDetalles, [id_solicitud_analisis], (err, existingDetalles) => {
                    if (err) {
                        return cb(err);
                    }

                    const existingDetallesMap = {};
                    existingDetalles.forEach(d => {
                        existingDetallesMap[d.id_subcategoria_analisis] = d;
                    });

                    const detallesToKeepIds = [];
                    const detallesToDeleteIds = [];

                    processDetalles(0);

                    function processDetalles(index) {
                        if (index >= solicitud.detalles.length) {
                            // Después de procesar todos los detalles
                            deleteUnwantedDetalles();
                            return;
                        }

                        const detalle = solicitud.detalles[index];

                        if (detalle.id_detalle_subanalisis) {
                            // Actualizar detalle existente
                            const sqlUpdateDetalle = `
                                UPDATE detalle_subanalisis
                                SET resultado = ?
                                WHERE id_detalle_subanalisis = ?
                            `;
                            db.query(sqlUpdateDetalle, [
                                detalle.resultado,
                                detalle.id_detalle_subanalisis
                            ], (err) => {
                                if (err) {
                                    return cb(err);
                                }
                                detallesToKeepIds.push(detalle.id_detalle_subanalisis);
                                processDetalles(index + 1);
                            });
                        } else {
                            // Insertar nuevo detalle
                            const sqlInsertDetalle = `
                                INSERT INTO detalle_subanalisis (id_solicitud_analisis, id_subcategoria_analisis, resultado)
                                VALUES (?, ?, ?)
                            `;
                            db.query(sqlInsertDetalle, [
                                id_solicitud_analisis,
                                detalle.id_subcategoria_analisis,
                                detalle.resultado
                            ], (err, result) => {
                                if (err) {
                                    return cb(err);
                                }
                                detalle.id_detalle_subanalisis = result.insertId;
                                detallesToKeepIds.push(detalle.id_detalle_subanalisis);

                                //console.log('Inserted detalle_subanalisis with ID:', detalle.id_detalle_subanalisis);

                                processDetalles(index + 1);
                            });
                        }
                    }

                    function deleteUnwantedDetalles() {
                        const existingDetalleIds = existingDetalles.map(d => d.id_detalle_subanalisis);
                        const detallesToDeleteIdsLocal = existingDetalleIds.filter(id => !detallesToKeepIds.includes(id));

                        if (detallesToDeleteIdsLocal.length > 0) {
                            db.query(
                                `DELETE FROM detalle_subanalisis WHERE id_detalle_subanalisis IN (?)`,
                                [detallesToDeleteIdsLocal],
                                (err) => {
                                    if (err) {
                                        return cb(err);
                                    }
                                    cb(null);
                                }
                            );
                        } else {
                            cb(null);
                        }
                    }
                });
            }

        });
    });
};



function executeTasks(tasks, finalCallback) {
    let index = 0;

    function next(err) {
        if (err || index === tasks.length) {
            return finalCallback(err);
        }
        const task = tasks[index++];
        task(next);
    }

    next();
}

const actualizarPuntajeAnamnesis = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
            puntaje_anamnesis
        SET 
            puntaje_a = ?,
            puntaje_b = ?,
            puntaje_c = ?,
            puntaje_d = ?,
            puntaje_e = ?
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_a, data.puntaje_b, data.puntaje_c, data.puntaje_d, data.puntaje_e, id_historia_clinica], callback);
};

const actualizarPuntajeExamen = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
                    puntaje_examen
                SET 
                    puntaje_a = ?,
                    puntaje_b = ?,
                    puntaje_c = ?,
                    puntaje_d = ?,
                    puntaje_e = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_a, data.puntaje_b, data.puntaje_c, data.puntaje_d, data.puntaje_e, id_historia_clinica], callback);
};

const actualizarPuntajeDiferencial = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
                    puntaje_diferencial
                SET 
                    puntaje_a = ?,
                    puntaje_b = ?,
                    puntaje_c = ?,
                    puntaje_d = ?,
                    puntaje_e = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_a, data.puntaje_b, data.puntaje_c, data.puntaje_d, data.puntaje_e, id_historia_clinica], callback);
};
const actualizarPuntajeLaboratorio = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
                    puntaje_laboratorio
                SET 
                    puntaje_a = ?,
                    puntaje_b = ?,
                    puntaje_c = ?,
                    puntaje_d = ?,
                    puntaje_e = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_a, data.puntaje_b, data.puntaje_c, data.puntaje_d, data.puntaje_e, id_historia_clinica], callback);
};
const actualizarPuntajeIntervenir = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
                    puntaje_intervenir
                SET 
                    puntaje_a = ?,
                    puntaje_b = ?,
                    puntaje_c = ?,
                    puntaje_d = ?,
                    puntaje_e = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_a, data.puntaje_b, data.puntaje_c, data.puntaje_d, data.puntaje_e, id_historia_clinica], callback);
};
const actualizarPuntajeExterna = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
                    puntaje_externa
                SET 
                    puntaje_a = ?,
                    puntaje_b = ?,
                    puntaje_c = ?,
                    puntaje_d = ?,
                    puntaje_e = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_a, data.puntaje_b, data.puntaje_c, data.puntaje_d, data.puntaje_e, id_historia_clinica], callback);
};
const actualizarPuntajeTraspaso = (id_historia_clinica, data, callback) => {
    const sql = `UPDATE 
                    puntaje_traspaso
                SET 
                    puntaje_a = ?,
                    puntaje_b = ?,
                    puntaje_c = ?,
                    puntaje_d = ?,
                    puntaje_e = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_a, data.puntaje_b, data.puntaje_c, data.puntaje_d, data.puntaje_e, id_historia_clinica], callback);
};

const obtenerPuntajeAnamnesis = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    puntaje_a,
                    puntaje_b,
                    puntaje_c,
                    puntaje_d,
                    puntaje_e
        FROM 
            puntaje_anamnesis
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeExamen = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    puntaje_a,
                    puntaje_b,
                    puntaje_c,
                    puntaje_d,
                    puntaje_e
        FROM 
            puntaje_examen
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeDiferencial = (id_historia_clinica, callback) => {
    const sql = `SELECT
                    puntaje_a,
                    puntaje_b,
                    puntaje_c,
                    puntaje_d,
                    puntaje_e
        FROM 
            puntaje_diferencial
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeLaboratorio = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    puntaje_a,
                    puntaje_b,
                    puntaje_c,
                    puntaje_d,
                    puntaje_e
        FROM 
            puntaje_laboratorio
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeIntervenir = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    puntaje_a,
                    puntaje_b,
                    puntaje_c,
                    puntaje_d,
                    puntaje_e
        FROM 
            puntaje_intervenir
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeExterna = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    puntaje_a,
                    puntaje_b,
                    puntaje_c,
                    puntaje_d,
                    puntaje_e
        FROM 
            puntaje_externa
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeTraspaso = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    puntaje_a,
                    puntaje_b,
                    puntaje_c,
                    puntaje_d,
                    puntaje_e
        FROM 
            puntaje_traspaso
        WHERE 
            id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeTotalHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `WITH historia AS (
    SELECT id_historia_clinica 
    FROM historia_clinica 
    WHERE id_historia_clinica = ?
    )
    SELECT 
        (SELECT IFNULL(SUM(puntaje_a), 0) FROM puntaje_anamnesis pa JOIN historia h ON pa.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_a), 0) FROM puntaje_examen pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_a), 0) FROM puntaje_diferencial pd JOIN historia h ON pd.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_a), 0) FROM puntaje_laboratorio pl JOIN historia h ON pl.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_a), 0) FROM puntaje_intervenir pi JOIN historia h ON pi.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_a), 0) FROM puntaje_externa pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_a), 0) FROM puntaje_traspaso pt JOIN historia h ON pt.id_historia_clinica = h.id_historia_clinica) AS total_puntaje_a,

        (SELECT IFNULL(SUM(puntaje_b), 0) FROM puntaje_anamnesis pa JOIN historia h ON pa.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_b), 0) FROM puntaje_examen pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_b), 0) FROM puntaje_diferencial pd JOIN historia h ON pd.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_b), 0) FROM puntaje_laboratorio pl JOIN historia h ON pl.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_b), 0) FROM puntaje_intervenir pi JOIN historia h ON pi.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_b), 0) FROM puntaje_externa pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_b), 0) FROM puntaje_traspaso pt JOIN historia h ON pt.id_historia_clinica = h.id_historia_clinica) AS total_puntaje_b,

        (SELECT IFNULL(SUM(puntaje_c), 0) FROM puntaje_anamnesis pa JOIN historia h ON pa.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_c), 0) FROM puntaje_examen pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_c), 0) FROM puntaje_diferencial pd JOIN historia h ON pd.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_c), 0) FROM puntaje_laboratorio pl JOIN historia h ON pl.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_c), 0) FROM puntaje_intervenir pi JOIN historia h ON pi.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_c), 0) FROM puntaje_externa pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_c), 0) FROM puntaje_traspaso pt JOIN historia h ON pt.id_historia_clinica = h.id_historia_clinica) AS total_puntaje_c,

        (SELECT IFNULL(SUM(puntaje_d), 0) FROM puntaje_anamnesis pa JOIN historia h ON pa.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_d), 0) FROM puntaje_examen pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_d), 0) FROM puntaje_diferencial pd JOIN historia h ON pd.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_d), 0) FROM puntaje_laboratorio pl JOIN historia h ON pl.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_d), 0) FROM puntaje_intervenir pi JOIN historia h ON pi.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_d), 0) FROM puntaje_externa pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_d), 0) FROM puntaje_traspaso pt JOIN historia h ON pt.id_historia_clinica = h.id_historia_clinica) AS total_puntaje_d,

        (SELECT IFNULL(SUM(puntaje_e), 0) FROM puntaje_anamnesis pa JOIN historia h ON pa.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_e), 0) FROM puntaje_examen pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_e), 0) FROM puntaje_diferencial pd JOIN historia h ON pd.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_e), 0) FROM puntaje_laboratorio pl JOIN historia h ON pl.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_e), 0) FROM puntaje_intervenir pi JOIN historia h ON pi.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_e), 0) FROM puntaje_externa pe JOIN historia h ON pe.id_historia_clinica = h.id_historia_clinica) +
        (SELECT IFNULL(SUM(puntaje_e), 0) FROM puntaje_traspaso pt JOIN historia h ON pt.id_historia_clinica = h.id_historia_clinica) AS total_puntaje_e;
        `;
    db.query(sql, [id_historia_clinica], callback);
};

const obtenerPuntajeAccionSimulacion = (id_simulacion, callback) => {
    const sql = `SELECT puntaje.puntaje, 
                COALESCE(COUNT(accion_simulacion.puntaje), 0) AS cantidad
            FROM ( 
                SELECT 'A' AS puntaje
                UNION ALL
                SELECT 'B' AS puntaje
                UNION ALL
                SELECT 'C' AS puntaje
                UNION ALL
                SELECT 'D' AS puntaje
                UNION ALL
                SELECT 'E' AS puntaje
            ) AS puntaje
            LEFT JOIN accion_simulacion 
                ON puntaje.puntaje = accion_simulacion.puntaje 
                AND accion_simulacion.id_simulacion = ?
            GROUP BY puntaje.puntaje;

        `;
    db.query(sql, [id_simulacion], callback);
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
    actualizarMedicamentosSuministrados,
    obtenerSubespecialidades,
    obtenerSubespecialidadesPorHistoriaClinica,
    actualizarSubespecialidades,
    obtenerAntecedentesGinecoObstetricos,
    actualizarAntecedentesGinecoObstetricos,
    
    
    obtenerCategoriasConImagenologias,
    obtenerEstudiosImagenologiaPorHistoriaClinica,
    actualizarEstudiosImagenologia, 
    obtenerCategoriasProcedimientos,
    obtenerProcedimientosPorCategoria,
    obtenerProcedimientosAsignadosPorHistoriaClinica,
    actualizarProcedimientosAsignados,
    obtenerCategoriasAnalisis,
    obtenerSubcategoriasPorCategoria,
    obtenerSolicitudesAnalisisPorHistoriaClinica,
    actualizarSolicitudesAnalisis,
    obtenerTraspaso,
    actualizarTraspaso,
    actualizarDiagnosticoFinal,
    obtenerTraspasoRubrica,
    actualizarPuntajeAnamnesis,
    actualizarPuntajeExamen,
    actualizarPuntajeDiferencial,
    actualizarPuntajeLaboratorio,
    actualizarPuntajeIntervenir,
    actualizarPuntajeExterna,
    actualizarPuntajeTraspaso,
    obtenerPuntajeAnamnesis,
    obtenerPuntajeExamen,
    obtenerPuntajeDiferencial,
    obtenerPuntajeLaboratorio,
    obtenerPuntajeIntervenir,
    obtenerPuntajeExterna,
    obtenerPuntajeTraspaso,
    obtenerPuntajeTotalHistoriaClinica,
    obtenerPuntajeAccionSimulacion 
};