const db = require('../db/db');

const obtenerDiagnosticosPorCategoria = (callback) => {
    const sql = `
        SELECT 
            cd.id_categoria_diferencial,
            cd.categoria AS categoria,
            d.id_diagnostico,
            d.nombre AS diagnostico,
            d.descripcion AS descripcion
        FROM 
            diagnostico d
        JOIN 
            categoria_diferencial cd ON d.id_categoria_diferencial = cd.id_categoria_diferencial
        ORDER BY 
            cd.categoria;
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        const categorias = {};
        results.forEach(row => {
            const { id_categoria_diferencial, categoria, diagnostico, descripcion, id_diagnostico } = row;
            if (!categorias[categoria]) {
                categorias[categoria] = {
                    id_categoria_diferencial,
                    diagnosticos: []
                };
            }
            categorias[categoria].diagnosticos.push({ id_diagnostico, diagnostico, descripcion });
        });
        callback(null, categorias);
    });
};

const eliminarDiagnostico = (id_diagnostico, callback) => {
    const sql = `DELETE FROM diagnostico WHERE id_diagnostico = ?`;
    db.query(sql, [id_diagnostico], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451) {
                return callback(new Error('No se puede eliminar el diagnóstico porque está siendo utilizado en otros registros.'));
            }
            return callback(err);
        }
        callback(null, result);
    });
};
const actualizarDiagnostico = (id_diagnostico, nombre, callback) => {
    console.log("Actualizando diagnóstico:", { id_diagnostico, nombre });

    if (!nombre) {
        console.error("El nombre no puede ser nulo");
        return callback(new Error("El nombre del diagnóstico no puede ser nulo"));
    }

    const sql = `UPDATE diagnostico SET nombre = ? WHERE id_diagnostico = ?`;
    db.query(sql, [nombre, id_diagnostico], callback);
};
const agregarDiagnostico = (id_categoria_diferencial, nombre, callback) => {
    const sql = `INSERT INTO diagnostico (id_categoria_diferencial, nombre) VALUES (?, ?)`;
    db.query(sql, [id_categoria_diferencial, nombre], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

const agregarCategoriaConDiagnosticos = (categoria, diagnosticos, callback) => {
    console.log("se añadio: ",categoria, diagnosticos)
    db.beginTransaction(err => {
        if (err) return callback(err);

        const sqlCategoria = `INSERT INTO categoria_diferencial (categoria) VALUES (?)`;
        db.query(sqlCategoria, [categoria], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    callback(err);
                });
            }

            const id_categoria_diferencial = result.insertId;

            const sqlDiagnostico = `INSERT INTO diagnostico (id_categoria_diferencial, nombre) VALUES ?`;
            const diagnosticosData = diagnosticos.map(d => [id_categoria_diferencial, d]);

            db.query(sqlDiagnostico, [diagnosticosData], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        callback(err);
                    });
                }
                const ids_diagnosticos = [];
                for (let i = 0; i < result.affectedRows; i++) {
                    ids_diagnosticos.push(result.insertId + i);
                }

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            callback(err);
                        });
                    }
                    callback(null, { id_categoria_diferencial, ids_diagnosticos });
                });
            });
        });
    });
};

const obtenerMedicamentosPorCategoria = (callback) => {
    const sql = `
        SELECT 
            cm.id_categoria_medicamento,
            cm.categoria AS categoria,
            m.id_medicamento,
            m.nombre AS medicamento,
            m.descripcion AS descripcion
        FROM 
            medicamento m
        JOIN 
            categoria_medicamento cm ON m.id_categoria_medicamento = cm.id_categoria_medicamento
        ORDER BY 
            cm.categoria;
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        const categorias = {};
        results.forEach(row => {
            const { id_categoria_medicamento, categoria, medicamento, descripcion, id_medicamento } = row;
            if (!categorias[categoria]) {
                categorias[categoria] = {
                    id_categoria_medicamento,
                    medicamentos: []
                };
            }
            categorias[categoria].medicamentos.push({ id_medicamento, medicamento, descripcion });
        });
        callback(null, categorias);
    });
};

const eliminarMedicamento = (id_medicamento, callback) => {
    const sql = `DELETE FROM medicamento WHERE id_medicamento = ?`;
    db.query(sql, [id_medicamento], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451) {
                return callback(new Error('No se puede eliminar el medicamento porque está siendo utilizado en otros registros.'));
            }
            return callback(err);
        }
        callback(null, result);
    });
};

const actualizarMedicamento = (id_medicamento, nombre, callback) => {
    if (!nombre) {
        return callback(new Error("El nombre del medicamento no puede ser nulo"));
    }
    const sql = `UPDATE medicamento SET nombre = ? WHERE id_medicamento = ?`;
    db.query(sql, [nombre, id_medicamento], callback);
};

const agregarMedicamento = (id_categoria_medicamento, nombre, callback) => {
    if (!nombre) {
        return callback(new Error("El nombre del medicamento no puede ser nulo"));
    }
    const sql = `INSERT INTO medicamento (id_categoria_medicamento, nombre) VALUES (?, ?)`;
    db.query(sql, [id_categoria_medicamento, nombre], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

const agregarCategoriaConMedicamentos = (categoria, medicamentos, callback) => {
    db.beginTransaction(err => {
        if (err) return callback(err);
        const sqlCategoria = `INSERT INTO categoria_medicamento (categoria) VALUES (?)`;
        db.query(sqlCategoria, [categoria], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    callback(err);
                });
            }
            const id_categoria_medicamento = result.insertId;
            const sqlMedicamento = `INSERT INTO medicamento (id_categoria_medicamento, nombre) VALUES ?`;
            const medicamentosData = medicamentos.map(m => [id_categoria_medicamento, m]);

            db.query(sqlMedicamento, [medicamentosData], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        callback(err);
                    });
                }
                const ids_medicamentos = [];
                for (let i = 0; i < result.affectedRows; i++) {
                    ids_medicamentos.push(result.insertId + i);
                }
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            callback(err);
                        });
                    }
                    callback(null, { id_categoria_medicamento, ids_medicamentos });
                });
            });
        });
    });
};

const obtenerSubespecialidades = (callback) => {
    const sql = `SELECT * FROM subespecialidad ORDER BY nombre`;
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

const agregarSubespecialidad = (nombre, callback) => {
    if (!nombre) {
        return callback(new Error("El nombre de la subespecialidad no puede ser nulo"));
    }
    const sql = `INSERT INTO subespecialidad (nombre) VALUES (?)`;
    db.query(sql, [nombre], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

const actualizarSubespecialidad = (id_subespecialidad, nombre, callback) => {
    if (!nombre) {
        return callback(new Error("El nombre de la subespecialidad no puede ser nulo"));
    }
    const sql = `UPDATE subespecialidad SET nombre = ? WHERE id_subespecialidad = ?`;
    db.query(sql, [nombre, id_subespecialidad], callback);
};

const eliminarSubespecialidad = (id_subespecialidad, callback) => {
    const sql = `DELETE FROM subespecialidad WHERE id_subespecialidad = ?`;
    db.query(sql, [id_subespecialidad], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451) {
                return callback(new Error('No se puede eliminar la subespecialidad porque está siendo utilizada en otros registros.'));
            }
            return callback(err);
        }
        callback(null, result);
    });
};

const obtenerImagenologiasPorCategoria = (callback) => {
    const sql = `
        SELECT 
            ci.id_categoria_imagenologia,
            ci.nombre AS categoria,
            i.id_imagenologia,
            i.nombre AS imagenologia,
            i.descripcion AS descripcion
        FROM 
            imagenologia i
        JOIN 
            categoria_imagenologia ci ON i.id_categoria_imagenologia = ci.id_categoria_imagenologia
        ORDER BY 
            ci.nombre;
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        const categorias = {};
        results.forEach(row => {
            const { id_categoria_imagenologia, categoria, imagenologia, descripcion, id_imagenologia } = row;
            if (!categorias[categoria]) {
                categorias[categoria] = {
                    id_categoria_imagenologia,
                    imagenologias: []
                };
            }
            categorias[categoria].imagenologias.push({ id_imagenologia, imagenologia, descripcion });
        });
        callback(null, categorias);
    });
};

const eliminarImagenologia = (id_imagenologia, callback) => {
    const sql = `DELETE FROM imagenologia WHERE id_imagenologia = ?`;
    db.query(sql, [id_imagenologia], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451) {
                return callback(new Error('No se puede eliminar la imagenología porque está siendo utilizada en otros registros.'));
            }
            return callback(err);
        }
        callback(null, result);
    });
};

const actualizarImagenologia = (id_imagenologia, nombre, callback) => {
    if (!nombre) {
        return callback(new Error("El nombre de la imagenología no puede ser nulo"));
    }
    const sql = `UPDATE imagenologia SET nombre = ? WHERE id_imagenologia = ?`;
    db.query(sql, [nombre, id_imagenologia], callback);
};

const agregarImagenologia = (id_categoria_imagenologia, nombre, callback) => {
    if (!nombre) {
        return callback(new Error("El nombre de la imagenología no puede ser nulo"));
    }
    const sql = `INSERT INTO imagenologia (id_categoria_imagenologia, nombre) VALUES (?, ?)`;
    db.query(sql, [id_categoria_imagenologia, nombre], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

const agregarCategoriaConImagenologias = (categoria, imagenologias, callback) => {
    db.beginTransaction(err => {
        if (err) return callback(err);
        const sqlCategoria = `INSERT INTO categoria_imagenologia (nombre) VALUES (?)`;
        db.query(sqlCategoria, [categoria], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    callback(err);
                });
            }
            const id_categoria_imagenologia = result.insertId;
            const sqlImagenologia = `INSERT INTO imagenologia (id_categoria_imagenologia, nombre) VALUES ?`;
            const imagenologiasData = imagenologias.map(i => [id_categoria_imagenologia, i]);

            db.query(sqlImagenologia, [imagenologiasData], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        callback(err);
                    });
                }
                const ids_imagenologias = [];
                for (let i = 0; i < result.affectedRows; i++) {
                    ids_imagenologias.push(result.insertId + i);
                }
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            callback(err);
                        });
                    }
                    callback(null, { id_categoria_imagenologia, ids_imagenologias });
                });
            });
        });
    });
};

const obtenerProcedimientosPorCategoria = (callback) => {
    const sql = `
        SELECT 
            cp.id_categoria_procedimiento,
            cp.nombre AS categoria,
            p.id_procedimiento,
            p.nombre AS procedimiento,
            p.descripcion AS descripcion
        FROM 
            procedimiento p
        JOIN 
            categoria_procedimiento cp ON p.id_categoria_procedimiento = cp.id_categoria_procedimiento
        ORDER BY 
            cp.nombre;
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);
        const categorias = {};
        results.forEach(row => {
            const { id_categoria_procedimiento, categoria, procedimiento, descripcion, id_procedimiento } = row;
            if (!categorias[categoria]) {
                categorias[categoria] = {
                    id_categoria_procedimiento,
                    procedimientos: []
                };
            }
            categorias[categoria].procedimientos.push({ id_procedimiento, procedimiento, descripcion });
        });
        callback(null, categorias);
    });
};

const eliminarProcedimiento = (id_procedimiento, callback) => {
    const sql = `DELETE FROM procedimiento WHERE id_procedimiento = ?`;
    db.query(sql, [id_procedimiento], (err, result) => {
        if (err) {
            if (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451) {
                return callback(new Error('No se puede eliminar el procedimiento porque está siendo utilizado en otros registros.'));
            }
            return callback(err);
        }
        callback(null, result);
    });
};

const actualizarProcedimiento = (id_procedimiento, nombre, callback) => {
    const sql = `UPDATE procedimiento SET nombre = ? WHERE id_procedimiento = ?`;
    db.query(sql, [nombre, id_procedimiento], callback);
};

const agregarProcedimiento = (id_categoria_procedimiento, nombre, callback) => {
    const sql = `INSERT INTO procedimiento (id_categoria_procedimiento, nombre) VALUES (?, ?)`;
    db.query(sql, [id_categoria_procedimiento, nombre], callback);
};

const agregarCategoriaConProcedimientos = (categoria, procedimientos, callback) => {
    db.beginTransaction(err => {
        if (err) return callback(err);
        const sqlCategoria = `INSERT INTO categoria_procedimiento (nombre) VALUES (?)`;
        db.query(sqlCategoria, [categoria], (err, result) => {
            if (err) return db.rollback(() => callback(err));
            const id_categoria_procedimiento = result.insertId;
            const sqlProcedimientos = `INSERT INTO procedimiento (id_categoria_procedimiento, nombre) VALUES ?`;
            const procedimientosData = procedimientos.map(p => [id_categoria_procedimiento, p]);
            db.query(sqlProcedimientos, [procedimientosData], (err, result) => {
                if (err) return db.rollback(() => callback(err));
                db.commit(err => {
                    if (err) return db.rollback(() => callback(err));
                    callback(null, { id_categoria_procedimiento, result });
                });
            });
        });
    });
};

const obtenerCategoriasConSubcategorias = (callback) => {
    const sql = `
        SELECT 
            ca.id_categoria_analisis,
            ca.nombre_categoria,
            sa.id_subcategoria_analisis,
            sa.nombre_subcategoria
        FROM 
            categoria_analisis ca
        LEFT JOIN 
            subcategoria_analisis sa ON ca.id_categoria_analisis = sa.id_categoria_analisis
        ORDER BY 
            ca.nombre_categoria;
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err, null);

        const categorias = {};
        results.forEach(row => {
            const { id_categoria_analisis, nombre_categoria, id_subcategoria_analisis, nombre_subcategoria } = row;
            if (!categorias[nombre_categoria]) {
                categorias[nombre_categoria] = {
                    id_categoria_analisis,
                    subcategorias: []
                };
            }
            if (id_subcategoria_analisis) {
                categorias[nombre_categoria].subcategorias.push({ id_subcategoria_analisis, nombre_subcategoria });
            }
        });
        callback(null, categorias);
    });
};

// Eliminar subcategoría
const eliminarSubcategoria = (id_subcategoria_analisis, callback) => {
    const sql = `DELETE FROM subcategoria_analisis WHERE id_subcategoria_analisis = ?`;
    db.query(sql, [id_subcategoria_analisis], callback);
};

// Actualizar subcategoría
const actualizarSubcategoria = (id_subcategoria_analisis, nombre_subcategoria, callback) => {
    const sql = `UPDATE subcategoria_analisis SET nombre_subcategoria = ? WHERE id_subcategoria_analisis = ?`;
    db.query(sql, [nombre_subcategoria, id_subcategoria_analisis], callback);
};

// Agregar subcategoría
const agregarSubcategoria = (id_categoria_analisis, nombre_subcategoria, callback) => {
    const sql = `INSERT INTO subcategoria_analisis (id_categoria_analisis, nombre_subcategoria) VALUES (?, ?)`;
    db.query(sql, [id_categoria_analisis, nombre_subcategoria], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Agregar categoría con subcategorías
const agregarCategoriaConSubcategorias = (categoria, subcategorias, callback) => {
    db.beginTransaction(err => {
        if (err) return callback(err);

        const sqlCategoria = `INSERT INTO categoria_analisis (nombre_categoria) VALUES (?)`;
        db.query(sqlCategoria, [categoria], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    callback(err);
                });
            }
            const id_categoria_analisis = result.insertId;
            const sqlSubcategoria = `INSERT INTO subcategoria_analisis (id_categoria_analisis, nombre_subcategoria) VALUES ?`;
            const subcategoriasData = subcategorias.map(s => [id_categoria_analisis, s]);

            db.query(sqlSubcategoria, [subcategoriasData], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        callback(err);
                    });
                }
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            callback(err);
                        });
                    }
                    callback(null, { id_categoria_analisis, result });
                });
            });
        });
    });
};


module.exports = {
    obtenerDiagnosticosPorCategoria,
    eliminarDiagnostico,
    actualizarDiagnostico,
    agregarDiagnostico,
    agregarCategoriaConDiagnosticos,
    obtenerMedicamentosPorCategoria,
    eliminarMedicamento,
    actualizarMedicamento,
    agregarMedicamento,
    agregarCategoriaConMedicamentos,
    obtenerSubespecialidades,
    agregarSubespecialidad,
    actualizarSubespecialidad,
    eliminarSubespecialidad,
    obtenerImagenologiasPorCategoria,
    eliminarImagenologia,
    actualizarImagenologia,
    agregarImagenologia,
    agregarCategoriaConImagenologias,
    obtenerProcedimientosPorCategoria,
    eliminarProcedimiento,
    actualizarProcedimiento,
    agregarProcedimiento,
    agregarCategoriaConProcedimientos,
    obtenerCategoriasConSubcategorias,
    eliminarSubcategoria,
    actualizarSubcategoria,
    agregarSubcategoria,
    agregarCategoriaConSubcategorias
};