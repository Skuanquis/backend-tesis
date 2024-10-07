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

const obtenerExamenFisicoOrina = (id_historia_clinica, callback) => {
    const sql = `
        SELECT efo.* 
        FROM examen_fisico_orina efo 
        JOIN examen_orina eo ON efo.id_examen_orina = eo.id_examen_orina 
        WHERE eo.id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

// Actualizar el examen físico de orina
const actualizarExamenFisicoOrina = (id_historia_clinica, data, callback) => {
    //console.log(data)
    const sql = `
        UPDATE examen_fisico_orina 
        SET color = ?, aspecto = ?, volumen = ?, feed_examen_fisico_orina = ?, puntaje_examen_fisico_orina = ?
        WHERE id_examen_orina = (SELECT id_examen_orina FROM examen_orina WHERE id_historia_clinica = ?)`;
    const values = [
        data.color, data.aspecto, data.volumen, data.feed_examen_fisico_orina,
        data.puntaje_examen_fisico_orina, id_historia_clinica
    ];
    db.query(sql, values, callback);
};

const obtenerSedimentoUrinario = (id_historia_clinica, callback) => {
    const sql = `
        SELECT su.* 
        FROM sedimento_urinario su 
        JOIN examen_orina eo ON su.id_examen_orina = eo.id_examen_orina 
        WHERE eo.id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarSedimentoUrinario = (id_historia_clinica, data, callback) => {
    //console.log(data)
    const sql = `
        UPDATE sedimento_urinario 
        SET hematies = ?, leucocitos = ?, piocitos = ?, celulas_epiteliales = ?, celulas_renales = ?, 
            cilindro_cereo = ?, cilindros_hialianos = ?, cilindros_granulosos = ?, cilindros_leucocitarios = ?, 
            cilindros_eritrocitarios = ?, flora_bacteriana = ?, cristales = ?, filamento_mucoso = ?, hifas = ?, levaduras = ?, otros = ?, 
            feed_examen_sedimento_urinario = ?, puntaje_examen_sedimento_urinario = ?
        WHERE id_examen_orina = (SELECT id_examen_orina FROM examen_orina WHERE id_historia_clinica = ?)`;
    const values = [
        data.hematies, data.leucocitos, data.piocitos, data.celulas_epiteliales, data.celulas_renales,
        data.cilindro_cereo, data.cilindros_hialianos, data.cilindros_granulosos, data.cilindros_leucocitarios,
        data.cilindros_eritrocitarios, data.flora_bacteriana, data.cristales, data.filamento_mucoso, data.hifas, data.levaduras, data.otros,
        data.feed_examen_sedimento_urinario, data.puntaje_examen_sedimento_urinario, id_historia_clinica
    ];
    db.query(sql, values, callback);
};

const obtenerExamenQuimicoUrinario = (id_historia_clinica, callback) => {
    const sql = `
        SELECT equ.* 
        FROM examen_quimico_urinario equ 
        JOIN examen_orina eo ON equ.id_examen_orina = eo.id_examen_orina 
        WHERE eo.id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenQuimicoUrinario = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_quimico_urinario 
        SET ph = ?, densidad = ?, proteinas = ?, sangre = ?, glucosa = ?, cetonas = ?, 
            urobilinogeno = ?, bilirrubina = ?, pigmentos_biliares = ?, nitritos = ?, leucocitos = ?, 
            feed_examen_quimico_urinario = ?, puntaje_examen_quimico_urinario = ?
        WHERE id_examen_orina = (SELECT id_examen_orina FROM examen_orina WHERE id_historia_clinica = ?)`;
    const values = [
        data.ph, data.densidad, data.proteinas, data.sangre, data.glucosa, data.cetonas, 
        data.urobilinogeno, data.bilirrubina, data.pigmentos_biliares, data.nitritos, data.leucocitos, 
        data.feed_examen_quimico_urinario, data.puntaje_examen_quimico_urinario, id_historia_clinica
    ];
    db.query(sql, values, callback);
};

const obtenerExamenEspecialOrina = (id_historia_clinica, callback) => {
    const sql = `
        SELECT eeo.* 
        FROM examenes_especiales_orina eeo 
        JOIN examen_orina eo ON eeo.id_examen_orina = eo.id_examen_orina 
        WHERE eo.id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenEspecialOrina = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examenes_especiales_orina 
        SET proteurinaria = ?, creatinuria = ?, microalbuminuria = ?, clearence_creatinina = ?, 
            feed_examen_especial_orina = ?, puntaje_examen_especial_orina = ?
        WHERE id_examen_orina = (SELECT id_examen_orina FROM examen_orina WHERE id_historia_clinica = ?)`;
    const values = [
        data.proteurinaria, data.creatinuria, data.microalbuminuria, data.clearence_creatinina, 
        data.feed_examen_especial_orina, data.puntaje_examen_especial_orina, id_historia_clinica
    ];
    db.query(sql, values, callback);
};

const obtenerExamenHematologico = (id_historia_clinica, callback) => {
    const sql = 'SELECT * FROM examen_hematologico WHERE id_historia_clinica = ?';
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarExamenHematologico = (id_historia_clinica, data, callback) => {
    const sql = `
        UPDATE examen_hematologico 
        SET grupo_sanguineo = ?, factor_rh = ?, observaciones = ?, 
            feed_examen_hematologico = ?, puntaje_examen_hematologico = ?
        WHERE id_historia_clinica = ?`;
    const values = [
        data.grupo_sanguineo, data.factor_rh, data.observaciones, 
        data.feed_examen_hematologico, data.puntaje_examen_hematologico, id_historia_clinica
    ];
    db.query(sql, values, callback);
};

const obtenerBiometriaHematica = (id_examen_hematologico, callback) => {
    const sql = 'SELECT * FROM biometria_hematica WHERE id_examen_hematologico = ?';
    db.query(sql, [id_examen_hematologico], callback);
};

const actualizarBiometriaHematica = (id_examen_hematologico, data, callback) => {
    const sql = `
        UPDATE biometria_hematica 
        SET globulos_rojos = ?, globulos_blancos = ?, hemoglobina = ?, hematocrito = ?, 
            ves = ?, feed_examen_biometria_hematica = ?, puntaje_examen_biometria_hematica = ?
        WHERE id_examen_hematologico = ?`;
    const values = [
        data.globulos_rojos, data.globulos_blancos, data.hemoglobina, data.hematocrito,
        data.ves, data.feed_examen_biometria_hematica, data.puntaje_examen_biometria_hematica, id_examen_hematologico
    ];
    db.query(sql, values, callback);
};

const obtenerIndicesEritrocitarios = (id_examen_hematologico, callback) => {
    const sql = 'SELECT * FROM indices_eritrocitarios_hematico WHERE id_examen_hematologico = ?';
    db.query(sql, [id_examen_hematologico], callback);
};

const actualizarIndicesEritrocitarios = (id_examen_hematologico, data, callback) => {
    const sql = `
        UPDATE indices_eritrocitarios_hematico 
        SET vcm = ?, hbcm = ?, chbcm = ?, 
            feed_indices_eritrocitarios = ?, puntaje_indices_eritrocitarios = ?
        WHERE id_examen_hematologico = ?`;
    const values = [
        data.vcm, data.hbcm, data.chbcm, 
        data.feed_indices_eritrocitarios, data.puntaje_indices_eritrocitarios, id_examen_hematologico
    ];
    db.query(sql, values, callback);
};

const obtenerRecuentoDiferencialHematico = (id_examen_hematologico, callback) => {
    const sql = 'SELECT * FROM recuento_diferencial_hematico WHERE id_examen_hematologico = ?';
    db.query(sql, [id_examen_hematologico], callback);
};

const actualizarRecuentoDiferencialHematico = (id_examen_hematologico, data, callback) => {
    const sql = `
        UPDATE recuento_diferencial_hematico 
        SET cayados_relativo = ?, cayados_absoluto = ?, linfocitos_relativo = ?, linfocitos_absoluto = ?, 
            eosinofilos_relativo = ?, eosinofilos_absoluto = ?, basofilos_relativo = ?, basofilos_absoluto = ?, 
            segmentados_relativo = ?, segmentados_absoluto = ?, monocitos_relativo = ?, monocitos_absoluto = ?, 
            recuento_plaquetas = ?, recuento_reticulos = ?, feed_recuento_diferencial_hematico = ?, 
            puntaje_recuento_diferencial_hematico = ?
        WHERE id_examen_hematologico = ?`;
    const values = [
        data.cayados_relativo, data.cayados_absoluto, data.linfocitos_relativo, data.linfocitos_absoluto,
        data.eosinofilos_relativo, data.eosinofilos_absoluto, data.basofilos_relativo, data.basofilos_absoluto,
        data.segmentados_relativo, data.segmentados_absoluto, data.monocitos_relativo, data.monocitos_absoluto,
        data.recuento_plaquetas, data.recuento_reticulos, data.feed_recuento_diferencial_hematico, 
        data.puntaje_recuento_diferencial_hematico, id_examen_hematologico
    ];
    db.query(sql, values, callback);
};

const obtenerHemostasiaSanguinea = (id_examen_sanguineo, callback) => {
    const sql = 'SELECT * FROM hemostasia_sanguinea WHERE id_examen_sanguineo = ?';
    db.query(sql, [id_examen_sanguineo], callback);
};

const actualizarHemostasiaSanguinea = (id_examen_sanguineo, data, callback) => {
    const sql = `
        UPDATE hemostasia_sanguinea 
        SET tiempo_coagulacion = ?, tiempo_sangria = ?, tiempo_protrombina = ?, 
            actividad_protrombinica = ?, inr = ?, tiempo_control = ?, 
            tiempo_tromboplastina_parcial = ?, dimero_d = ?, fibrinogeno = ?, 
            feed_hemostasia_sanguinea = ?, puntaje_hemostasia_sanguinea = ?
        WHERE id_examen_sanguineo = ?`;
    const values = [
        data.tiempo_coagulacion, data.tiempo_sangria, data.tiempo_protrombina, 
        data.actividad_protrombinica, data.inr, data.tiempo_control, 
        data.tiempo_tromboplastina_parcial, data.dimero_d, data.fibrinogeno, 
        data.feed_hemostasia_sanguinea, data.puntaje_hemostasia_sanguinea, id_examen_sanguineo
    ];
    db.query(sql, values, callback);
};

const obtenerSerologiaSanguinea = (id_examen_sanguineo, callback) => {
    const sql = 'SELECT * FROM serologia_sanguinea WHERE id_examen_sanguineo = ?';
    db.query(sql, [id_examen_sanguineo], callback);
};

const actualizarSerologiaSanguinea = (id_examen_sanguineo, data, callback) => {
    const sql = `
        UPDATE serologia_sanguinea 
        SET proteina_c = ?, factor_reumatico = ?, rpr_sifilis = ?, 
            prueba_sifilis = ?, prueba_vih_sida = ?, prueba_hepatitis_b = ?, 
            feed_serologia_sanguinea = ?, puntaje_serologia_sanguinea = ?
        WHERE id_examen_sanguineo = ?`;
    const values = [
        data.proteina_c, data.factor_reumatico, data.rpr_sifilis, 
        data.prueba_sifilis, data.prueba_vih_sida, data.prueba_hepatitis_b, 
        data.feed_serologia_sanguinea, data.puntaje_serologia_sanguinea, id_examen_sanguineo
    ];
    db.query(sql, values, callback);
};

const obtenerElectrolitosSanguineos = (id_examen_sanguineo, callback) => {
    const sql = 'SELECT * FROM electrolitos_sanguineos WHERE id_examen_sanguineo = ?';
    db.query(sql, [id_examen_sanguineo], callback);
};

const actualizarElectrolitosSanguineos = (id_examen_sanguineo, data, callback) => {
    const sql = `
        UPDATE electrolitos_sanguineos 
        SET calcio = ?, sodio = ?, potasio = ?, cloro = ?, fosforo = ?, magnesio = ?, 
            feed_electrolitos_sanguineos = ?, puntaje_electrolitos_sanguineos = ?
        WHERE id_examen_sanguineo = ?`;
    const values = [
        data.calcio, data.sodio, data.potasio, data.cloro, data.fosforo, data.magnesio,
        data.feed_electrolitos_sanguineos, data.puntaje_electrolitos_sanguineos, id_examen_sanguineo
    ];
    db.query(sql, values, callback);
};

const obtenerQuimicaSanguinea = (id_examen_sanguineo, callback) => {
    const sql = 'SELECT * FROM quimica_sanguinea WHERE id_examen_sanguineo = ?';
    db.query(sql, [id_examen_sanguineo], callback);
};

const actualizarQuimicaSanguinea = (id_examen_sanguineo, data, callback) => {
    const sql = `
        UPDATE quimica_sanguinea 
        SET glicemia = ?, creatinina = ?, nitrogeno_ureico = ?, urea = ?, acido_urico = ?, 
            bilirrubina_total = ?, bilirrubina_directa = ?, bilirrubina_indirecta = ?, transaminasa_gpt = ?, 
            transaminasa_got = ?, lactato_deshidrogenasa = ?, fosfatasa_alcalina = ?, proteinas_totales = ?, 
            albumina = ?, globulina = ?, relacion_alb_glo = ?, colesterol_total = ?, trigliceridos = ?, 
            hdl_colesterol = ?, ldl_colesterol = ?, vldl_colesterol = ?, glicemia_rn = ?, 
            hemoglobina_glicosilada = ?, feed_quimica_sanguinea = ?, puntaje_quimica_sanguinea = ?
        WHERE id_examen_sanguineo = ?`;
    const values = [
        data.glicemia, data.creatinina, data.nitrogeno_ureico, data.urea, data.acido_urico,
        data.bilirrubina_total, data.bilirrubina_directa, data.bilirrubina_indirecta, data.transaminasa_gpt,
        data.transaminasa_got, data.lactato_deshidrogenasa, data.fosfatasa_alcalina, data.proteinas_totales,
        data.albumina, data.globulina, data.relacion_alb_glo, data.colesterol_total, data.trigliceridos,
        data.hdl_colesterol, data.ldl_colesterol, data.vldl_colesterol, data.glicemia_rn,
        data.hemoglobina_glicosilada, data.feed_quimica_sanguinea, data.puntaje_quimica_sanguinea, id_examen_sanguineo
    ];
    db.query(sql, values, callback);
};


const obtenerCategoriasImagenologia = (callback) => {
    const sql = 'SELECT * FROM categoria_imagenologia ORDER BY nombre';
    db.query(sql, callback);
};

const obtenerImagenesPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT img.*, cat.nombre AS categoria_nombre
        FROM imagenologia img
        INNER JOIN categoria_imagenologia cat ON img.id_categoria_imagenologia = cat.id_categoria_imagenologia
        WHERE img.id_historia_clinica = ?
        ORDER BY cat.nombre
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarImagenes = (id_historia_clinica, imagenesData, callback) => {
    //console.log("modelo: ",imagenesData)
    db.beginTransaction(err => {
        if (err) return callback(err);
        const sqlGetExisting = 'SELECT id_imagenologia FROM imagenologia WHERE id_historia_clinica = ?';
        db.query(sqlGetExisting, [id_historia_clinica], (err, results) => {
            if (err) {
                return db.rollback(() => callback(err));
            }
            const existingIds = results.map(row => row.id_imagenologia);
            const imagenesDataIds = imagenesData.map(img => img.id_imagenologia).filter(id => id);

            const idsToInsert = imagenesData.filter(img => !img.id_imagenologia);
            const idsToUpdate = imagenesData.filter(img => img.id_imagenologia && existingIds.includes(img.id_imagenologia));
            const idsToDelete = existingIds.filter(id => !imagenesDataIds.includes(id));
            const tasks = [];
            if (idsToDelete.length > 0) {
                tasks.push(cb => {
                    const sqlDelete = 'DELETE FROM imagenologia WHERE id_imagenologia IN (?)';
                    db.query(sqlDelete, [idsToDelete], cb);
                });
            }
            idsToUpdate.forEach(img => {
                tasks.push(cb => {
                    const sqlUpdate = `
                            UPDATE imagenologia
                            SET interpretacion = ?, feed_imagenologia = ?, puntaje_imagenologia = ?, path = ?, nombre = ?, id_categoria_imagenologia = ?
                            WHERE id_imagenologia = ?
                        `;
                        const params = [
                            img.interpretacion,
                            img.feed_imagenologia,
                            img.puntaje_imagenologia,
                            img.path,
                            img.nombre,
                            img.id_categoria_imagenologia,
                            img.id_imagenologia
                        ];
                    db.query(sqlUpdate, params, cb);
                });
            });
            idsToInsert.forEach(img => {
                tasks.push(cb => {
                    const sqlInsert = `
                        INSERT INTO imagenologia (id_categoria_imagenologia, id_historia_clinica, interpretacion, path, feed_imagenologia, puntaje_imagenologia)
                        VALUES (?, ?, ?, ?, ?, ?)
                    `;
                    const params = [
                        img.id_categoria_imagenologia,
                        id_historia_clinica,
                        img.interpretacion,
                        img.path,
                        img.feed_imagenologia,
                        img.puntaje_imagenologia
                    ];
                    db.query(sqlInsert, params, cb);
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
            t.feed_opcion_tres
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
                    feed_opcion_tres = ?
                WHERE 
                    id_historia_clinica = ?;
    `;
    db.query(sql, [data.puntaje_opcion_uno, data.feed_opcion_uno ,data.puntaje_opcion_dos, data.feed_opcion_dos ,data.puntaje_opcion_tres, data.feed_opcion_tres ,id_historia_clinica], callback);
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
                t.feed_opcion_tres
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
            WHERE 
                t.id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

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
    
    obtenerExamenFisicoOrina, 
    actualizarExamenFisicoOrina,
    obtenerSedimentoUrinario, 
    actualizarSedimentoUrinario,
    obtenerExamenQuimicoUrinario, 
    actualizarExamenQuimicoUrinario,
    obtenerExamenEspecialOrina,
    actualizarExamenEspecialOrina,
    obtenerExamenHematologico,
    actualizarExamenHematologico,
    obtenerIndicesEritrocitarios,
    actualizarIndicesEritrocitarios,
    obtenerRecuentoDiferencialHematico,
    actualizarRecuentoDiferencialHematico,
    obtenerHemostasiaSanguinea,
    actualizarHemostasiaSanguinea,
    obtenerSerologiaSanguinea,
    actualizarSerologiaSanguinea,
    obtenerElectrolitosSanguineos,
    actualizarElectrolitosSanguineos,
    obtenerQuimicaSanguinea,
    actualizarQuimicaSanguinea,
    obtenerBiometriaHematica,
    actualizarBiometriaHematica,
    obtenerCategoriasImagenologia,
    obtenerImagenesPorHistoriaClinica,
    actualizarImagenes,
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