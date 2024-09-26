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
    console.log("patologicos: ", data)
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
    const sql = `SELECT codigo, valor FROM valor_puntaje WHERE id_historia_clinica = ?`;
    db.query(sql, [id_historia_clinica], callback);
};

const actualizarMotivoConsulta = (id_motivo_consulta, data, callback) => {
    const sql = `UPDATE motivo_consulta SET motivo = ? WHERE id_motivo_consulta = ?`;
    db.query(sql, [data.motivo, id_motivo_consulta], callback);
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
    actualizarMotivoConsulta
};