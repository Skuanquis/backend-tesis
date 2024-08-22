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

module.exports = {
    getListaHistoriasClinicas,
    getInfoHistoria,
    getExamenFisicoGeneral,
    getExamenFisicoSegmentario,
    getExamenObstetrico,
    getExamenFisicoOrina,
    getExamenSedimentoUrinario,
    getExamenQuimicoUrinario,
    getExamenesEspecialesOrina
};