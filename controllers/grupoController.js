const grupoModel = require('../models/grupoModel');

const obtenerGrupos = (req, res) => {
    const { id_usuario_medico, rol } = req.params;
    grupoModel.obtenerGrupos(id_usuario_medico, rol, (err, results) => {
        if (err) {
            console.error('Error fetching groups:', err);
            return res.status(500).send({ error: 'Error fetching groups' });
        }
        res.status(200).send(results);
    });
};

const crearGrupo = (req, res) => {
    const grupoData = req.body;
    grupoModel.crearGrupo(grupoData, (err, result) => {
        if (err) {
            console.error('Error creating group:', err);
            return res.status(500).send({ error: 'Error creating group' });
        }
        res.status(201).send({ message: 'Grupo creado exitosamente' });
    });
};

const actualizarGrupo = (req, res) => {
    const id_grupo = req.params.id_grupo;
    const grupoData = req.body;
    grupoModel.actualizarGrupo(id_grupo, grupoData, (err, result) => {
        if (err) {
            console.error('Error updating group:', err);
            return res.status(500).send({ error: 'Error updating group' });
        }
        res.status(200).send({ message: 'Grupo actualizado exitosamente' });
    });
};

const eliminarGrupo = (req, res) => {
    const id_grupo = req.params.id_grupo;
    grupoModel.eliminarEstudiantesDelGrupo(id_grupo, (err, result) => {
        if (err) {
            console.error('Error deleting students from group:', err);
            return res.status(500).send({ error: 'Error deleting students from group' });
        }
        grupoModel.eliminarGrupo(id_grupo, (err, result) => {
            if (err) {
                console.error('Error deleting group:', err);
                return res.status(500).send({ error: 'Error deleting group' });
            }
            res.status(200).send({ message: 'Grupo eliminado exitosamente' });
        });
    });
};

const matricularEstudiante = (req, res) => {
    const { id_grupo, id_usuario_estudiante } = req.body;
    grupoModel.matricularEstudiante(id_grupo, id_usuario_estudiante, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Error al matricular al estudiante' });
        }
        res.status(200).send({ message: 'Estudiante matriculado exitosamente' });
    });
};

const desvincularEstudiante = (req, res) => {
    const { id_grupo, id_usuario_estudiante } = req.body;
    grupoModel.desvincularEstudiante(id_grupo, id_usuario_estudiante, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Error al desvincular al estudiante' });
        }
        res.status(200).send({ message: 'Estudiante desvinculado exitosamente' });
    });
};

const obtenerGruposMatriculados = (req, res) => {
    const { id_usuario_estudiante } = req.params;
    grupoModel.obtenerGruposMatriculados(id_usuario_estudiante, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error al obtener los grupos matriculados' });
        }
        res.status(200).send(results);
    });
};

const obtenerGruposNoMatriculados = (req, res) => {
    const { id_usuario_estudiante } = req.params;
    grupoModel.obtenerGruposNoMatriculados(id_usuario_estudiante, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error al obtener los grupos no matriculados' });
        }
        res.status(200).send(results);
    });
};

const validarCodigoAcceso = (req, res) => {
    const { id_grupo, codigo_acceso } = req.body;
    grupoModel.validarCodigoAcceso(id_grupo, codigo_acceso, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Error al validar el código de acceso' });
        }
        if (result.length === 0) {
            return res.status(400).send({ error: 'Código de acceso incorrecto' });
        }
        res.status(200).send({ message: 'Código de acceso válido' });
    });
};

const obtenerEstudiantesPorGrupo = (req, res) => {
    const { id_grupo } = req.params;
    grupoModel.obtenerEstudiantesPorGrupo(id_grupo, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error al obtener los estudiantes del grupo' });
        }
        res.status(200).send(results);
    });
};

module.exports = {
    obtenerGrupos,
    crearGrupo,
    actualizarGrupo,
    eliminarGrupo,
    matricularEstudiante,
    desvincularEstudiante,
    obtenerGruposMatriculados,
    obtenerGruposNoMatriculados,
    validarCodigoAcceso,
    obtenerEstudiantesPorGrupo
};