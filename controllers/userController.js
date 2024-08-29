const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const loginUser = (req, res) => {
    const { username, password } = req.body;
    //console.log(username, password)
    userModel.getUserByUsername(username, async (err, user) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send({ error: 'Error al encontrar al usuario' });
        }
        if (!user) {
            return res.status(400).send({ error: 'Credendiales invalidas' });
        }
        if (user.estado !== 'activo') {
            return res.status(401).send({ error: 'La cuenta del usuario esta inactiva' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({ error: 'Credendiales invalidas' });
        }
        //console.log(user)
        const accessToken = jwt.sign({ id: user.id_usuario, username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).send({ accessToken });
    });
};

const getUserInfo = (req, res) => {
    //console.log(req.user)
    const userId = req.user.id;
    //console.log("user: ",userId)
    userModel.getUserById(userId, (err, user) => {
        if (err) {
            console.error('Error fetching user info:', err);
            return res.status(500).send({ error: 'Error fetching user info' });
        }
        res.status(200).send(user);
    });
};

const updateUserProfile = (req, res) => {
    const userId = req.user.id;
    const { nombre, paterno, materno, fecha_nacimiento } = req.body;
    //console.log(userId)
    //console.log(nombre, paterno, materno, fecha_nacimiento)

    userModel.updateUserProfile(userId, { nombre, paterno, materno, fecha_nacimiento }, (err, result) => {
        if (err) {
            console.error('Error al actualizar perfil:', err);
            return res.status(500).send({ error: 'Error al actualizar perfil' });
        }
        res.status(200).send({ message: 'Perfil actualizado correctamente' });
    });
};

const updateUserPassword = (req, res) => {
    const userId = req.user.id;
    const { passwordAnterior, nuevaPassword } = req.body;
    //console.log(req.body)
    //console.log(req.user)
    userModel.getUserById(userId, async (err, user) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send({ error: 'Error fetching user' });
        }

        if (!user || !user.password) {
            console.error('User or password not found:', user);
            return res.status(400).send({ error: 'Invalid user or password' });
        }

        try {
            const validPassword = await bcrypt.compare(passwordAnterior, user.password);
            if (!validPassword) {
                return res.status(400).send({ error: 'Invalid current password' });
            }
            
            const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
            userModel.updateUserPassword(userId, hashedPassword, (err, result) => {
                if (err) {
                    console.error('Error updating password:', err);
                    return res.status(500).send({ error: 'Error updating password' });
                }
                res.status(200).send({ message: 'Password updated successfully' });
            });
        } catch (error) {
            console.error('Error during password comparison:', error);
            return res.status(500).send({ error: 'Error during password comparison' });
        }
    });
};

const createUser = async (req, res) => {
    let userData = req.body;
    //console.log(userData);
    try {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashedPassword;
        //console.log(userData)
        userModel.createUser(userData, (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error al registrar al usuario' });
            } else {
                res.status(201).send({ message: 'Usuario registrado exitosamente', userId: results.insertId });
            }
        });
    } catch (error) {
        res.status(500).send({ error: 'Error hashing password' });
    }
};

const getUsuarios = (req, res) => {
    userModel.getUsuarios((err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error al obtener los usuarios' });
        }
        res.status(200).send(results);
    });
};

const getUserById = (req, res) => {
    const id = req.params.id;
    //console.log("ee ",id)
    userModel.getUserById(id, (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Error fetching usuario' });
        }
        res.status(200).send(results);
    });
};

const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const usuarioData = req.body;
    //console.log("El controller: ", id, usuarioData)
    if (usuarioData.password) {
        try {
            const hashedPassword = await bcrypt.hash(usuarioData.password, 10);
            usuarioData.password = hashedPassword;
        } catch (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send({ error: 'Error hashing password' });
        }
    } else {
        delete usuarioData.password;
    }

    userModel.updateUsuario(id, usuarioData, (err, results) => {
        if (err) {
            console.error('Error updating pasante:', err);
            return res.status(500).send({ error: 'Error updating pasante' });
        }
        res.status(200).send({ message: 'Pasante updated successfully' });
    });
};


module.exports = {
    loginUser,
    getUserInfo,
    updateUserProfile,
    updateUserPassword,
    createUser,
    getUsuarios,
    getUserById,
    updateUsuario
};