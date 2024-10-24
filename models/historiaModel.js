const db = require('../db/db');

const getListaHistoriasClinicas = (callback) => {
    const sql = `SELECT 
                    hc.id_historia_clinica,
                    hc.descripcion,
                    hc.historia_enfermedad_actual
                FROM 
                    historia_clinica hc
                JOIN 
                    caso_clinico cc ON hc.id_caso_clinico = cc.id_caso_clinico
                JOIN 
                    paciente p ON cc.id_paciente = p.id_paciente`;
    db.query(sql, callback);
};

const getInfoHistoriaFemenino = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    p.id_paciente,
                    p.paterno,
                    p.materno,
                    p.nombre,
                    p.edad, 
                    p.peso,
                    p.talla,
                    p.sexo,
                    p.ocupacion,
                    hc.id_historia_clinica,
                    hc.descripcion,
                    hc.historia_enfermedad_actual,
                    ag.menarca,
                    ag.fum,
                    ag.fpp,
                    ag.gestaciones,
                    ag.partos,
                    ag.abortos,
                    ag.cesarias,
                    ag.cpn,
                    ap.alergias,
                    ap.cirugias,
                    ap.enfermedades_congenitas,
                    ap.enfermedades_infancia,
                    ap.enfermedades_adolescencia,
                    ap.enfermedades_adulto,
                    ap.traumatismos,
                    ap.intoxicaciones,
                    ap.hospitalizaciones,
                    ap.enfermedades,
                    ap.transfusiones,
                    ap.patologia_asociada,
                    anp.antecedentes_nacimiento,
                    anp.habitos,
                    anp.factores_de_riesgo,
                    af.padre,
                    af.madre,
                    af.hermanos,
                    af.hijos,
                    af.conyugue,
                    mc.motivo
                FROM 
                    historia_clinica hc
                JOIN 
                    caso_clinico cc ON hc.id_caso_clinico = cc.id_caso_clinico
                JOIN 
                    paciente p ON cc.id_paciente = p.id_paciente
                LEFT JOIN 
                    antecedentes_gineco_obstetricos ag ON hc.id_historia_clinica = ag.id_historia_clinica
                LEFT JOIN 
                    antecedentes_patologicos ap ON hc.id_historia_clinica = ap.id_historia_clinica
                LEFT JOIN 
                    antecedentes_no_patologicos anp ON hc.id_historia_clinica = anp.id_historia_clinica
                LEFT JOIN 
                    antecedentes_familiares af ON hc.id_historia_clinica = af.id_historia_clinica
                LEFT JOIN 
                    motivo_consulta mc ON hc.id_historia_clinica = mc.id_historia_clinica
                WHERE 
                    hc.id_historia_clinica = ?;
   
    `;

    db.query(sql, [id_historia_clinica], callback)
}

const getInfoHistoriaMasculino = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    p.id_paciente,
                    p.paterno,
                    p.materno,
                    p.nombre,
                    p.edad,
                    p.peso,
                    p.talla,
                    p.sexo,
                    p.ocupacion,
                    hc.id_historia_clinica,
                    hc.descripcion,
                    hc.historia_enfermedad_actual,
                    ap.alergias,
                    ap.cirugias,
                    ap.enfermedades_congenitas,
                    ap.enfermedades_infancia,
                    ap.enfermedades_adolescencia,
                    ap.enfermedades_adulto,
                    ap.traumatismos,
                    ap.intoxicaciones,
                    ap.hospitalizaciones,
                    ap.enfermedades,
                    ap.transfusiones,
                    ap.patologia_asociada,
                    anp.antecedentes_nacimiento,
                    anp.habitos,
                    anp.factores_de_riesgo,
                    af.padre,
                    af.madre,
                    af.hermanos,
                    af.hijos,
                    af.conyugue,
                    mc.motivo
                FROM 
                    historia_clinica hc
                JOIN 
                    caso_clinico cc ON hc.id_caso_clinico = cc.id_caso_clinico
                JOIN 
                    paciente p ON cc.id_paciente = p.id_paciente
                LEFT JOIN 
                    antecedentes_gineco_obstetricos ag ON hc.id_historia_clinica = ag.id_historia_clinica
                LEFT JOIN 
                    antecedentes_patologicos ap ON hc.id_historia_clinica = ap.id_historia_clinica
                LEFT JOIN 
                    antecedentes_no_patologicos anp ON hc.id_historia_clinica = anp.id_historia_clinica
                LEFT JOIN 
                    antecedentes_familiares af ON hc.id_historia_clinica = af.id_historia_clinica
                LEFT JOIN 
                    motivo_consulta mc ON hc.id_historia_clinica = mc.id_historia_clinica
                WHERE 
                    hc.id_historia_clinica = ?;
   
    `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoGeneral = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    e.descripcion,
                    e.pa,
                    e.fc,
                    e.fr,
                    e.temperatura,
                    e.saturacion,
                    e.peso,
                    e.talla,
                    e.imc,
                    e.feed_examen_fisico,
                    e.puntaje_examen_fisico,
                    vp.rubrica
                FROM 
                    examen_fisico_general e
                JOIN 
                    historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
                LEFT JOIN 
                    valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                                    AND e.puntaje_examen_fisico = vp.codigo
                WHERE 
                    hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.cabeza,
            e.cuello,
            e.torax,
            e.corazon,
            e.mamas,
            e.abdomen,
            e.genitourinario,
            e.extremidades,
            e.neurologico,
            e.piel
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioCabeza = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.cabeza,
            e.feed_cabeza,
            e.puntaje_cabeza,
            e.img_cabeza,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_cabeza = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioCuello = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.cuello,
            e.feed_cuello,
            e.puntaje_cuello,
            e.img_cuello,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_cuello = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioTorax = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.torax,
            e.feed_torax,
            e.puntaje_torax,
            e.img_torax,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_torax = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioCorazon = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.corazon,
            e.feed_corazon,
            e.puntaje_corazon,
            e.img_corazon,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_corazon = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioMamas = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.mamas,
            e.feed_mamas,
            e.puntaje_mamas,
            e.img_mamas,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_mamas = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioAbdomen = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.abdomen,
            e.feed_abdomen,
            e.puntaje_abdomen,
            e.img_abdomen,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_abdomen = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioGenitourinario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.genitourinario,
            e.feed_genitourinario,
            e.puntaje_genitourinario,
            e.img_genitourinario,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_genitourinario = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioExtremidades = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.extremidades,
            e.feed_extremidades,
            e.puntaje_extremidades,
            e.img_extremidades,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_extremidades = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioNeurologico = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.neurologico,
            e.feed_neurologico,
            e.puntaje_neurologico,
            e.img_neurologico,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_neurologico = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioPiel = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.piel,
            e.feed_piel,
            e.puntaje_piel,
            e.img_piel,
            vp.rubrica
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_piel = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenObstetrico = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.situacion,
            e.presentacion,
            e.dorso,
            e.afu,
            e.fcf,
            e.paf,
            e.monitorizacion,
            e.dilatacion,
            e.borramiento,
            e.membranas,
            e.plano,
            e.au,
            e.pelvis,
            e.vp,
            e.feed_examen_obstetrico,
            vp.rubrica,
            e.puntaje_examen_obstetrico
        FROM 
            examen_obstetrico e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_examen_obstetrico = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenCirculatorio = (id_historia_clinica, callback) => {
    const sql = `SELECT e.descripcion, 
            e.feed_examen_circulatorio, 
            e.puntaje_examen_circulatorio,
            vp.rubrica
        FROM 
            examen_circulatorio e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_examen_circulatorio = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenRespiratorio = (id_historia_clinica, callback) => {
    const sql = `SELECT e.descripcion, 
            e.feed_examen_respiratorio, 
            e.puntaje_examen_respiratorio,
            vp.rubrica
        FROM 
            examen_respiratorio e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_examen_respiratorio = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenPsicologico = (id_historia_clinica, callback) => {
    const sql = `SELECT e.descripcion, 
            e.feed_examen_psicologico, 
            e.puntaje_examen_psicologico,
            vp.rubrica
        FROM 
            examen_psicologico e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_examen_psicologico = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenViaAerea = (id_historia_clinica, callback) => {
    const sql = `SELECT e.descripcion, 
            e.feed_examen_via_aerea, 
            e.puntaje_examen_via_aerea,
            vp.rubrica
        FROM 
            examen_via_aerea e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND e.puntaje_examen_via_aerea = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoOrina = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            efo.color,
            efo.aspecto,
            efo.volumen,
            vp.rubrica,
            efo.puntaje_examen_fisico_orina AS puntaje,
            efo.feed_examen_fisico_orina AS feed
        FROM 
            examen_fisico_orina efo
        JOIN 
            examen_orina eo ON efo.id_examen_orina = eo.id_examen_orina
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = eo.id_historia_clinica AND vp.codigo = efo.puntaje_examen_fisico_orina 
        WHERE 
            eo.id_historia_clinica = ?;
    `;

    db.query(sql, [id_historia_clinica], callback);
}

const getExamenSedimentoUrinario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            su.hematies,
            su.leucocitos,
            su.piocitos,
            su.celulas_epiteliales,
            su.celulas_renales,
            su.cilindro_cereo,
            su.cilindros_hialianos,
            su.cilindros_granulosos,
            su.cilindros_leucocitarios,
            su.flora_bacteriana,
            su.cristales,
            su.filamento_mucoso,
            su.hifas,
            su.levaduras,
            su.otros,
            vp.rubrica,
            su.puntaje_examen_sedimento_urinario AS puntaje,
            su.feed_examen_sedimento_urinario AS feed
        FROM 
            sedimento_urinario su
        JOIN 
            examen_orina eo ON su.id_examen_orina = eo.id_examen_orina
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = eo.id_historia_clinica AND vp.codigo = su.puntaje_examen_sedimento_urinario 
        WHERE 
            eo.id_historia_clinica = ?;
    `;

    db.query(sql, [id_historia_clinica], callback);
}

const getExamenQuimicoUrinario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            equ.ph,
            equ.densidad,
            equ.proteinas,
            equ.sangre,
            equ.glucosa,
            equ.cetonas,
            equ.urobilinogeno,
            equ.bilirrubina,
            equ.pigmentos_biliares,
            equ.nitritos,
            equ.leucocitos,
            vp.rubrica,
            equ.puntaje_examen_quimico_urinario AS puntaje,
            equ.feed_examen_quimico_urinario AS feed
        FROM 
            examen_quimico_urinario equ
        JOIN 
            examen_orina eo ON equ.id_examen_orina = eo.id_examen_orina
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = eo.id_historia_clinica AND vp.codigo = equ.puntaje_examen_quimico_urinario
        WHERE 
            eo.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback);
}

const getExamenesEspecialesOrina = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            eeo.proteurinaria,
            eeo.creatinuria,
            eeo.microalbuminuria,
            eeo.clearence_creatinina,
            vp.rubrica,
            eeo.puntaje_examen_especial_orina AS puntaje,
            eeo.feed_examen_especial_orina AS feed
        FROM 
            examenes_especiales_orina eeo
        JOIN 
            examen_orina eo ON eeo.id_examen_orina = eo.id_examen_orina
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = eo.id_historia_clinica AND vp.codigo = eeo.puntaje_examen_especial_orina
        WHERE 
            eo.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenBiometriaHematica = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            bh.globulos_rojos,
            bh.globulos_blancos,
            bh.hemoglobina,
            bh.hematocrito,
            bh.ves,
            vp.rubrica,
            bh.puntaje_examen_biometria_hematica AS puntaje,
            bh.feed_examen_biometria_hematica AS feed
        FROM 
            biometria_hematica bh
        JOIN 
            examen_hematologico eh ON bh.id_examen_hematologico = eh.id_examen_hematologico
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = eh.id_historia_clinica AND vp.codigo = bh.puntaje_examen_biometria_hematica 
        WHERE 
            eh.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenRecuentoDiferencialHematico = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            rdh.cayados_relativo,
            rdh.cayados_absoluto,
            rdh.linfocitos_relativo,
            rdh.linfocitos_absoluto,
            rdh.eosinofilos_relativo,
            rdh.eosinofilos_absoluto,
            rdh.basofilos_relativo,
            rdh.basofilos_absoluto,
            rdh.segmentados_relativo,
            rdh.segmentados_absoluto,
            rdh.monocitos_relativo,
            rdh.monocitos_absoluto,
            rdh.recuento_plaquetas,
            rdh.recuento_reticulos,
            vp.rubrica,
            rdh.puntaje_recuento_diferencial_hematico AS puntaje,
            rdh.feed_recuento_diferencial_hematico AS feed
        FROM 
            recuento_diferencial_hematico rdh
        JOIN 
            examen_hematologico eh ON rdh.id_examen_hematologico = eh.id_examen_hematologico
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = eh.id_historia_clinica AND vp.codigo = rdh.puntaje_recuento_diferencial_hematico
        WHERE 
            eh.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenIndiceEritrocitario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ieh.vcm,
            ieh.hbcm,
            ieh.chbcm,
            vp.rubrica,
            ieh.puntaje_indices_eritrocitarios AS puntaje,
            ieh.feed_indices_eritrocitarios AS feed
        FROM 
            indices_eritrocitarios_hematico ieh
        JOIN 
            examen_hematologico eh ON ieh.id_examen_hematologico = eh.id_examen_hematologico
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = eh.id_historia_clinica AND vp.codigo = ieh.puntaje_indices_eritrocitarios
        WHERE 
            eh.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenQuimicoSanguineo = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            qs.glicemia,
            qs.creatinina,
            qs.nitrogeno_ureico,
            qs.urea,
            qs.acido_urico,
            qs.bilirrubina_total,
            qs.bilirrubina_directa,
            qs.bilirrubina_indirecta,
            qs.transaminasa_gpt,
            qs.transaminasa_got,
            qs.lactato_deshidrogenasa,
            qs.fosfatasa_alcalina,
            qs.proteinas_totales,
            qs.albumina,
            qs.globulina,
            qs.relacion_alb_glo,
            qs.colesterol_total,
            qs.trigliceridos,
            qs.hdl_colesterol,
            qs.ldl_colesterol,
            qs.vldl_colesterol,
            qs.glicemia_rn,
            qs.hemoglobina_glicosilada,
            vp.rubrica,
            qs.puntaje_quimica_sanguinea AS puntaje,
            qs.feed_quimica_sanguinea AS feed
        FROM 
            quimica_sanguinea qs
        JOIN 
            examen_sanguineo es ON qs.id_examen_sanguineo = es.id_examen_sanguineo
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = es.id_historia_clinica AND vp.codigo = qs.puntaje_quimica_sanguinea
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenHemostaseaSanguinea = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            hs.tiempo_coagulacion,
            hs.tiempo_sangria,
            hs.tiempo_protrombina,
            hs.actividad_protrombinica,
            hs.inr,
            hs.tiempo_control,
            hs.tiempo_tromboplastina_parcial,
            hs.dimero_d,
            hs.fibrinogeno,
            vp.rubrica,
            hs.puntaje_hemostasia_sanguinea AS puntaje,
            hs.feed_hemostasia_sanguinea AS feed
        FROM 
            hemostasia_sanguinea hs
        JOIN 
            examen_sanguineo es ON hs.id_examen_sanguineo = es.id_examen_sanguineo
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = es.id_historia_clinica AND vp.codigo = hs.puntaje_hemostasia_sanguinea
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenSerologiaSanguinea = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ss.proteina_c,
            ss.factor_reumatico,
            ss.rpr_sifilis,
            ss.prueba_sifilis,
            ss.prueba_vih_sida,
            ss.prueba_hepatitis_b,
            vp.rubrica,
            ss.puntaje_serologia_sanguinea AS puntaje,
            ss.feed_serologia_sanguinea AS feed
        FROM 
            serologia_sanguinea ss
        JOIN 
            examen_sanguineo es ON ss.id_examen_sanguineo = es.id_examen_sanguineo
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = es.id_historia_clinica AND vp.codigo = ss.puntaje_serologia_sanguinea
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenElectrolitosSanquineos = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            esa.calcio,
            esa.sodio,
            esa.potasio,
            esa.cloro,
            esa.fosforo,
            esa.magnesio,
            vp.rubrica,
            esa.puntaje_electrolitos_sanguineos AS puntaje,
            esa.feed_electrolitos_sanguineos AS feed
        FROM 
            electrolitos_sanguineos esa
        JOIN 
            examen_sanguineo es ON es.id_examen_sanguineo = esa.id_examen_sanguineo
        LEFT JOIN
            valor_puntaje vp ON vp.id_historia_clinica = es.id_historia_clinica AND vp.codigo = esa.puntaje_electrolitos_sanguineos
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback);
}

const getExamenImagenPrueba = (id_historia_clinica, callback) => {
    const sql = `SELECT *
        FROM 
            imagen_prueba;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisTegumentario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.tegumentario,
            ans.feed_tegumentario,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_tegumentario = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisCardiovascular = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    ans.cardiovascular,
                    ans.feed_cardiovascular,
                    vp.rubrica,
                    vp.codigo
                FROM 
                    anamnesis_sistemas ans
                JOIN 
                    historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
                LEFT JOIN 
                    valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                                    AND ans.puntaje_cardiovascular = vp.codigo
                WHERE 
                    hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisGastrointestinal = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.gastrointestinal,
            ans.feed_gastrointestinal,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_gastrointestinal = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisGenitourinario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.genitourinario,
            ans.feed_genitourinario,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_genitourinario = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisRespiratorio = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.respiratorio,
            ans.feed_respiratorio,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_respiratorio = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisNeurologico = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.neurologico,
            ans.feed_neurologico,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_neurologico = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisLocomotor = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.locomotor,
            ans.feed_locomotor,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_locomotor = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisEndocrino = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.endocrino,
            ans.feed_endocrino,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_endocrino = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisHematico = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.hematico,
            ans.feed_hematico,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_hematico = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getAnamnesisPsiquiatrico = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ans.psiquiatrico,
            ans.feed_psiquiatrico,
            vp.rubrica,
            vp.codigo
        FROM 
            anamnesis_sistemas ans
        JOIN 
            historia_clinica hc ON ans.id_historia_clinica = hc.id_historia_clinica
        LEFT JOIN 
            valor_puntaje vp ON hc.id_historia_clinica = vp.id_historia_clinica 
                             AND ans.puntaje_psiquiatrico = vp.codigo
        WHERE 
            hc.id_historia_clinica = ?;
        `
    db.query(sql, [id_historia_clinica], callback)
}

const getDiagnosticosDiferencialesPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT 
            cd.categoria, 
            d.nombre AS diagnostico,
            dd.feed_diagnostico_diferencial,
            dd.puntaje_diagnostico_diferencial,
            vp.rubrica
        FROM 
            diagnosticos_diferenciales dd
        JOIN 
            diagnostico d ON dd.id_diagnostico = d.id_diagnostico
        JOIN 
            categoria_diferencial cd ON d.id_categoria_diferencial = cd.id_categoria_diferencial
        LEFT JOIN 
            valor_puntaje vp ON dd.id_historia_clinica = vp.id_historia_clinica 
                             AND dd.puntaje_diagnostico_diferencial = vp.codigo
        WHERE 
            dd.id_historia_clinica = ?;
    `;
    
    db.query(sql, [id_historia_clinica], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        const response = results.reduce((acc, row) => {
            if (!acc[row.categoria]) {
                acc[row.categoria] = { diagnosticos: [] };
            }
            acc[row.categoria].diagnosticos.push({
                nombre: row.diagnostico,
                feed: row.feed_diagnostico_diferencial,
                rubrica: row.rubrica,
                puntaje: row.puntaje_diagnostico_diferencial
            });
            return acc;
        }, {});

        callback(null, response);
    });
}

const obtenerMedicamentosSuministradosPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT 
            cm.categoria, 
            m.nombre AS medicamento,
            ms.feed_medicamento_diferencial,
            ms.puntaje_medicamento_diferencial,
            vp.rubrica
        FROM 
            medicamentos_suministrados ms
        JOIN 
            medicamento m ON ms.id_medicamento = m.id_medicamento
        JOIN 
            categoria_medicamento cm ON m.id_categoria_medicamento = cm.id_categoria_medicamento
        LEFT JOIN 
            valor_puntaje vp ON ms.id_historia_clinica = vp.id_historia_clinica 
                             AND ms.puntaje_medicamento_diferencial = vp.codigo
        WHERE 
            ms.id_historia_clinica = ?;
    `;
    
    db.query(sql, [id_historia_clinica], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const response = results.reduce((acc, row) => {
            if (!acc[row.categoria]) {
                acc[row.categoria] = { medicamentos: [] };
            }
            acc[row.categoria].medicamentos.push({
                nombre: row.medicamento,
                feed: row.feed_medicamento_diferencial,
                rubrica: row.rubrica,
                puntaje: row.puntaje_medicamento_diferencial
            });
            return acc;
        }, {});

        callback(null, response);
    });
};

const obtenerProcedimientosAsignadosPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT 
            cp.nombre AS categoria, 
            p.nombre AS procedimiento,
            pa.feed_procedimiento_asignado,
            pa.puntaje_procedimiento_asignado,
            vp.rubrica
        FROM 
            procedimiento_asignado pa
        JOIN 
            procedimiento p ON pa.id_procedimiento = p.id_procedimiento
        JOIN 
            categoria_procedimiento cp ON p.id_categoria_procedimiento = cp.id_categoria_procedimiento
        LEFT JOIN 
            valor_puntaje vp ON pa.id_historia_clinica = vp.id_historia_clinica 
                             AND pa.puntaje_procedimiento_asignado = vp.codigo
        WHERE 
            pa.id_historia_clinica = ?;
    `;

    db.query(sql, [id_historia_clinica], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const response = results.reduce((acc, row) => {
            if (!acc[row.categoria]) {
                acc[row.categoria] = { procedimientos: [] };
            }
            acc[row.categoria].procedimientos.push({
                nombre: row.procedimiento,
                feed: row.feed_procedimiento_asignado,
                rubrica: row.rubrica,
                puntaje: row.puntaje_procedimiento_asignado
            });
            return acc;
        }, {});
        callback(null, response);
    });
};



const obtenerAnalisisPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT 
            ca.nombre_categoria AS categoria, 
            sca.nombre_subcategoria AS subanalisis,
            dsa.resultado AS resultado,
            sa.feed_analsis AS feed, -- Aquí está el feed que ahora estará en la categoría
            sa.puntaje_analisis AS puntaje,
            vp.rubrica
        FROM 
            solicitud_analisis sa
        JOIN 
            categoria_analisis ca ON sa.id_categoria_analisis = ca.id_categoria_analisis
        JOIN 
            detalle_subanalisis dsa ON sa.id_solicitud_analisis = dsa.id_solicitud_analisis
        JOIN 
            subcategoria_analisis sca ON dsa.id_subcategoria_analisis = sca.id_subcategoria_analisis
        LEFT JOIN 
            valor_puntaje vp ON sa.id_historia_clinica = vp.id_historia_clinica 
                            AND sa.puntaje_analisis = vp.codigo
        WHERE 
            sa.id_historia_clinica = ?;
    `;

    db.query(sql, [id_historia_clinica], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        const response = results.reduce((acc, row) => {
            if (!acc[row.categoria]) {
                acc[row.categoria] = { 
                    puntaje: row.puntaje,
                    rubrica: row.rubrica,
                    feed: row.feed,
                    subanalisis: []
                };
            }
            acc[row.categoria].subanalisis.push({
                nombre: row.subanalisis,
                resultado: row.resultado
            });
            return acc;
        }, {});

        callback(null, response);
    });
};



const obtenerSubespecialidades = (id_historia_clinica, callback) => {
    const sql = `
        SELECT 
            s.nombre AS subespecialidad,
            ce.descripcion,
            ce.feed_subespecialidad,
            ce.puntaje_subespecialidad,
            vp.rubrica
        FROM 
            consulta_externa ce
        JOIN 
            subespecialidad s ON ce.id_subespecialidad = s.id_subespecialidad
        LEFT JOIN 
            valor_puntaje vp ON ce.id_historia_clinica = vp.id_historia_clinica 
                             AND ce.puntaje_subespecialidad = vp.codigo
        WHERE 
            ce.id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
};

const getImagenologiasByHistoria = (id_historia_clinica, callback) => {
    const sql = `
      SELECT 
        img.id_imagenologia,
        img.nombre,
        img.interpretacion,
        img.path,
        img.feed_imagenologia,
        img.puntaje_imagenologia,
        img.id_categoria_imagenologia,
        cat.nombre AS categoria_nombre
      FROM 
        imagenologia img
      JOIN 
        categoria_imagenologia cat ON img.id_categoria_imagenologia = cat.id_categoria_imagenologia
      WHERE 
        img.id_historia_clinica = ?;
    `;
    db.query(sql, [id_historia_clinica], callback);
  };
  
const getImagenologiaByCategoria = (id_historia_clinica, id_categoria_imagenologia, callback) => {
    const sql = `
      SELECT 
        img.id_imagenologia,
        img.nombre,
        img.interpretacion,
        img.path,
        img.feed_imagenologia,
        img.puntaje_imagenologia,
        img.id_categoria_imagenologia,
        cat.nombre AS categoria_nombre
      FROM 
        imagenologia img
      JOIN 
        categoria_imagenologia cat ON img.id_categoria_imagenologia = cat.id_categoria_imagenologia
      WHERE 
        img.id_historia_clinica = ? AND img.id_categoria_imagenologia = ?;
    `;
    db.query(sql, [id_historia_clinica, id_categoria_imagenologia], callback);
  };

const getAllCategoriasImagenologia = (callback) => {
    const sql = `
      SELECT 
        id_categoria_imagenologia,
        nombre
      FROM 
        categoria_imagenologia;
    `;
    db.query(sql, callback);
  };

  const obtenerImagenologiaPorHistoriaClinica = (id_historia_clinica, callback) => {
    const sql = `
        SELECT 
            ci.nombre AS categoria, 
            i.nombre AS nombre_imagen,
            ei.path,
            ei.puntaje_estudios_imagenologia AS puntaje,
            ei.feed_estudios_imagenologia AS feed,
            vp.rubrica,
            ei.interpretacion
        FROM 
            estudios_imagenologia ei
        JOIN 
            imagenologia i ON ei.id_imagenologia = i.id_imagenologia
        JOIN 
            categoria_imagenologia ci ON i.id_categoria_imagenologia = ci.id_categoria_imagenologia
        LEFT JOIN 
            valor_puntaje vp ON ei.id_historia_clinica = vp.id_historia_clinica 
                             AND ei.puntaje_estudios_imagenologia = vp.codigo
        WHERE 
            ei.id_historia_clinica = ?;
    `;
    
    db.query(sql, [id_historia_clinica], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        
        // Estructura la respuesta agrupando por categoría
        const response = results.reduce((acc, row) => {
            if (!acc[row.categoria]) {
                acc[row.categoria] = [];
            }
            acc[row.categoria].push({
                nombre: row.nombre_imagen,
                path: row.path,
                puntaje: row.puntaje,
                feed: row.feed,
                rubrica: row.rubrica,
                interpretacion: row.interpretacion
            });
            return acc;
        }, {});

        callback(null, response);
    });
};



module.exports = {
    getListaHistoriasClinicas,
    getInfoHistoriaFemenino,
    getInfoHistoriaMasculino,   
    getExamenFisicoGeneral,
    getExamenFisicoSegmentario,
    getExamenFisicoSegmentarioCabeza,
    getExamenFisicoSegmentarioCuello,
    getExamenFisicoSegmentarioTorax,
    getExamenFisicoSegmentarioCorazon,
    getExamenFisicoSegmentarioMamas,
    getExamenFisicoSegmentarioAbdomen,
    getExamenFisicoSegmentarioGenitourinario,
    getExamenFisicoSegmentarioExtremidades,
    getExamenFisicoSegmentarioNeurologico,
    getExamenFisicoSegmentarioPiel,
    getExamenCirculatorio,
    getExamenRespiratorio,
    getExamenViaAerea,
    getExamenPsicologico,
    getExamenObstetrico,
    getExamenFisicoOrina,
    getExamenSedimentoUrinario,
    getExamenQuimicoUrinario,
    getExamenesEspecialesOrina,
    getExamenBiometriaHematica,
    getExamenRecuentoDiferencialHematico,
    getExamenIndiceEritrocitario,
    getExamenQuimicoSanguineo,
    getExamenQuimicoSanguineo,
    getExamenHemostaseaSanguinea,
    getExamenSerologiaSanguinea,
    getExamenElectrolitosSanquineos,
    getExamenImagenPrueba,
    getAnamnesisTegumentario,
    getAnamnesisRespiratorio,
    getAnamnesisPsiquiatrico,
    getAnamnesisNeurologico,
    getAnamnesisLocomotor,
    getAnamnesisHematico,
    getAnamnesisGenitourinario,
    getAnamnesisGastrointestinal,
    getAnamnesisEndocrino,
    getAnamnesisCardiovascular,
    getDiagnosticosDiferencialesPorHistoriaClinica,
    obtenerMedicamentosSuministradosPorHistoriaClinica,
    obtenerSubespecialidades,
    getImagenologiasByHistoria,
    getImagenologiaByCategoria,
    getAllCategoriasImagenologia,
    obtenerImagenologiaPorHistoriaClinica,
    obtenerAnalisisPorHistoriaClinica,
    obtenerProcedimientosAsignadosPorHistoriaClinica
};