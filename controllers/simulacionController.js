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

module.exports = {
    comenzarSimulacion,
    marcarSimulacionIncompleta,
    finalizarSimulacion,
    obtenerTiempoSimulacion,
    registrarAccion,
    obtenerAcciones,
    eliminarAccion  
}