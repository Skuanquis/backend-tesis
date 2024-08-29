const db = require('../db/db');

const getListaHistoriasClinicas = (callback) => {
    const sql = `SELECT 
                    h.id_historia_clinica,
                    h.descripcion,
                    h.historia_enfermedad_actual
                FROM 
                    paciente p
                JOIN 
                    historia_clinica h ON p.id_paciente = h.id_paciente`;
    db.query(sql, callback);
};

const getInfoHistoria = (id_historia_clinica, callback) => {
    const sql = `SELECT 
                    p.id_paciente,
                    p.paterno,
                    p.materno,
                    p.nombre,
                    p.ci,
                    p.edad,
                    p.fecha_nacimiento,
                    p.sexo,
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
                    ap.app,
                    ap.afp,
                    ap.alergias,
                    ap.cirugias,
                    mc.motivo
                FROM 
                    paciente p
                JOIN 
                    historia_clinica hc ON p.id_paciente = hc.id_paciente
                JOIN 
                    antecedentes_gineco_obstetricos ag ON hc.id_historia_clinica = ag.id_historia_clinica
                JOIN 
                    antecedentes_patologicos ap ON hc.id_historia_clinica = ap.id_historia_clinica
                JOIN 
                    motivo_consulta mc ON hc.id_historia_clinica = mc.id_historia_clinica
                WHERE 
                    p.id_paciente = ?;
   
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
            e.imc
        FROM 
            examen_fisico_general e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
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
            e.neurologico
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
            e.cabeza
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioCuello = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.cuello
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioTorax = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.torax
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioCorazon = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.corazon
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioMamas = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.mamas
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioAbdomen = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.abdomen
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioGenitourinario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.genitourinario
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioExtremidades = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.extremidades
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoSegmentarioNeurologico = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            e.neurologico
        FROM 
            examen_fisico_segmentario e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
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
            e.vp
        FROM 
            examen_obstetrico e
        JOIN 
            historia_clinica hc ON e.id_historia_clinica = hc.id_historia_clinica
        WHERE 
            hc.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}

const getExamenFisicoOrina = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            efo.color,
            efo.aspecto,
            efo.volumen
        FROM 
            examen_fisico_orina efo
        JOIN 
            examen_orina eo ON efo.id_examen_orina = eo.id_examen_orina
        WHERE 
            eo.id_historia_clinica = ?;
    `;

    db.query(sql, [id_historia_clinica], callback)
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
            su.cilindros_eritrocitarios,
            su.flora_bacteriana,
            su.cristales,
            su.hifas,
            su.levaduras,
            su.otros
        FROM 
            sedimento_urinario su
        JOIN 
            examen_orina eo ON su.id_examen_orina = eo.id_examen_orina
        WHERE 
            eo.id_historia_clinica = ?;
    `;

    db.query(sql, [id_historia_clinica], callback)
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
            equ.leucocitos
        FROM 
            examen_quimico_urinario equ
        JOIN 
            examen_orina eo ON equ.id_examen_orina = eo.id_examen_orina
        WHERE 
            eo.id_historia_clinica = ?;
        `;

    db.query(sql, [id_historia_clinica], callback)
}


const getExamenesEspecialesOrina = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            eeo.proteurinaria,
            eeo.creatinuria,
            eeo.microalbuminuria,
            eeo.clearence_creatinina
        FROM 
            examenes_especiales_orina eeo
        JOIN 
            examen_orina eo ON eeo.id_examen_orina = eo.id_examen_orina
        WHERE 
            eo.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenBiometriaHematica = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            bh.globulos_rojos,
            bh.globulos_blancos,
            bh.hemoglobina,
            bh.hematocrito,
            bh.ves
        FROM 
            biometria_hematica bh
        JOIN 
            examen_hematologico eh ON bh.id_examen_hematologico = eh.id_examen_hematologico
        WHERE 
            eh.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenRecuentoDiferencialHematico= (id_historia_clinica, callback) => {
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
            rdh.recuento_reticulos
        FROM 
            recuento_diferencial_hematico rdh
        JOIN 
            examen_hematologico eh ON rdh.id_examen_hematologico = eh.id_examen_hematologico
        WHERE 
            eh.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenIndiceEritrocitario = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ieh.vcm,
            ieh.hbcm,
            ieh.chbcm
        FROM 
            indices_eritrocitarios_hematico ieh
        JOIN 
            examen_hematologico eh ON ieh.id_examen_hematologico = eh.id_examen_hematologico
        WHERE 
            eh.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
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
            qs.hemoglobina_glicosilada
        FROM 
            quimica_sanguinea qs
        JOIN 
            examen_sanguineo es ON qs.id_examen_sanguineo = es.id_examen_sanguineo
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
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
            hs.fibrinogeno
        FROM 
            hemostasia_sanguinea hs
        JOIN 
            examen_sanguineo es ON hs.id_examen_sanguineo = es.id_examen_sanguineo
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenSerologiaSanguinea = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            ss.proteina_c,
            ss.factor_reumatico,
            ss.rpr_sifilis,
            ss.prueba_sifilis,
            ss.prueba_vih_sida,
            ss.prueba_hepatitis_b
        FROM 
            serologia_sanguinea ss
        JOIN 
            examen_sanguineo es ON ss.id_examen_sanguineo = es.id_examen_sanguineo
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenElectrolitosSanquineos = (id_historia_clinica, callback) => {
    const sql = `SELECT 
            esa.calcio,
            esa.sodio,
            esa.potasio,
            esa.cloro,
            esa.fosforo,
            esa.magnesio
        FROM 
            electrolitos_sanguineos esa
        JOIN 
            examen_sanguineo es ON es.id_examen_sanguineo = esa.id_examen_sanguineo
        WHERE 
            es.id_historia_clinica = ?;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

const getExamenImagenPrueba = (id_historia_clinica, callback) => {
    const sql = `SELECT *
        FROM 
            imagen_prueba;
        `;
    db.query(sql, [id_historia_clinica], callback)
}

module.exports = {
    getListaHistoriasClinicas,
    getInfoHistoria,
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
};