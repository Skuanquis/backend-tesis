const db = require('../db/db');
const simulacionModel = require('../models/simulacionModel');

const comenzarSimulacion = (req, res) => {
    const id = req.user.id;
    let simulacionData = req.body;
    simulacionModel.comenzarSimulacion(id, simulacionData, (err, id_simulacion) => {
        if (err) {
            return res.status(500).send({ error: 'Error al iniciar la simulación' });
        }
        res.status(200).send({ id_simulacion });
    });
};

const marcarSimulacionIncompleta = (req, res) => {
    const id_simulacion = req.params.id;
    simulacionModel.marcarSimulacionIncompleta(id_simulacion, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error al marcar la simulación como incompleta' });
        }
        res.status(200).send({ message: 'Simulación marcada como incompleta' });
    });
};

const finalizarSimulacion = (req, res) => {
    const id_simulacion = req.params.id;
    const { tiempo_empleado } = req.body; 
    //console.log(req)
    //console.log(id_simulacion)
    simulacionModel.finalizarSimulacion(id_simulacion, tiempo_empleado, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error al finalizar la simulación' });
        }
        res.status(200).send({ message: 'Simulación finalizada con éxito' });
    });
};

const obtenerTiempoSimulacion = (req, res) => {
    const id_simulacion = req.params.id; 

    simulacionModel.obtenerTiempoSimulacion(id_simulacion, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Error al obtener los datos de la simulación' });
        }
        if (!result) {
            return res.status(404).send({ error: 'Simulación no encontrada' });
        }
        res.status(200).send(result);
    });
};

const registrarAccion = (req, res) => {
    const { id_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion } = req.body;
    //console.log("controller: ",req.body)

    simulacionModel.registrarAccion(id_simulacion, descripcion, tipo_accion, puntaje, retroalimentacion, (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Error al registrar la acción' });
        }
        res.status(200).send({ message: 'Acción registrada con éxito' });
    });
};

const obtenerAcciones = (req, res) => {
    const id_simulacion = req.params.id;

    simulacionModel.obtenerAcciones(id_simulacion, (err, results) => {
        if (err) {
            console.error('Error al obtener las acciones:', err);
            return res.status(500).send({ error: 'Error al obtener las acciones' });
        }
        if (results.length === 0) {
            return res.status(200).send({ message: 'No hay acciones registradas para esta simulación' });
        }
        res.status(200).send(results);
    });
};

const eliminarAccion = (req, res) => {
    const { id_simulacion, descripcion } = req.body;

    simulacionModel.eliminarAccion(id_simulacion, descripcion, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Acción eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Acción no encontrada' });
        }
    });
};

const obtenerMensajes = (req, res) => {
    const id_historia_clinica = req.params.id
   simulacionModel.obtenerMensajes(id_historia_clinica, (err, examen) => {
        if (err) {
            return res.status(500).send({ error:'Error al obtener el examen físico general'})
        }
        res.status(200).send(examen);
    })
}

const enviarDiagnosticoFinal = (req, res) => {
    const { id_realiza_simulacion } = req.params;
    simulacionModel.enviarDiagnosticoFinal(id_realiza_simulacion, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Diagnostico final actualizado correctamente' });
    });
};

const actualizarPuntajePorcentaje = (req, res) => {
    const { id_simulacion } = req.params;
    const { puntaje_porcentaje } = req.body;

    if (!puntaje_porcentaje || !id_simulacion) {
        return res.status(400).json({ error: 'Se requiere el id_simulacion y el puntaje_porcentaje' });
    }

    simulacionModel.actualizarPuntajePorcentaje(id_simulacion, puntaje_porcentaje, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el puntaje porcentaje' });
        }
        res.status(200).json({ message: 'Puntaje porcentaje actualizado exitosamente' });
    });
};

const obtenerSimulaciones = (req, res) => {
    const { id_usuario } = req.params;
    const { id_grupo } = req.query; 
    const sqlRol = `
        SELECT r.name AS rol 
        FROM usuario u 
        JOIN rol r ON u.id_rol = r.id_rol 
        WHERE u.id_usuario = ?
    `;

    db.query(sqlRol, [id_usuario], (err, results) => {
        if (err) {
            console.error('Error al obtener el rol del usuario:', err);
            return res.status(500).send({ error: 'Error al obtener el rol del usuario' });
        }

        if (results.length === 0) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        const rol = results[0].rol;
        simulacionModel.obtenerSimulaciones(id_usuario, rol, id_grupo, (err, simulaciones) => {
            if (err) {
                console.error('Error al obtener las simulaciones:', err);
                return res.status(500).send({ error: 'Error al obtener las simulaciones' });
            }
            res.status(200).send(simulaciones);
        });
    });
};

const obtenerDetallesSimulacionController = (req, res) => {
    const { id_realiza_simulacion } = req.params;

    simulacionModel.obtenerDetallesSimulacion(id_realiza_simulacion, (err, detalles) => {
        if (err) {
            console.error('Error al obtener los detalles de la simulación:', err);
            // Determinar el tipo de error para una respuesta más precisa
            if (err.message === 'Simulación no encontrada' || err.message.startsWith('Puntaje máximo no encontrado')) {
                return res.status(404).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        res.status(200).json(detalles);
    });
};

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
    obtenerDetallesSimulacionController
}