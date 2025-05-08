const pool = require('../config/db');
const bcrypt = require('bcrypt');


const usuarioControllers = {
    getUsuarios: async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM usuario`);
            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios.' });
        }
    },

    getUsuarioById: async (req, res) => {
        const { id } =  req.params;
        try {
            const result = await pool.query(`SELECT * FROM usuario WHERE idusuario = $1`, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener usuario por ID:', error);
            res.status(500).json({ message: 'Error al obtener usuario por ID.' });
        }
    },

    createUsuario: async (req, res) => {
        const { nombre, apellidos, contrasena, email, idRol } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const result = await pool.query(`
                INSERT INTO usuario (
                    nombre, 
                    apellidos, 
                    contrasena, 
                    email, 
                    idrol
                ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [nombre, apellidos, hashedPassword, email, idRol]);
                res.status(201).json({
                    mensaje: 'Usuario registrado exitosamente.',
                    usuario: result.rows[0]
                })
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Error al crear usuario.' });
        }
    },

    updateUsuario: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellidos, contrasena, email, idRol } = req.body;

        try{
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            const result = await pool.query(`
                UPDATE usuario
                SET nombre = $1,
                    apellidos = $2,
                    contrasena = $3,
                    email = $4,
                    idrol = $5
                WHERE idusuario = $6 RETURNING *`,
                [nombre, apellidos, hashedPassword, email, idRol, id]);
            res.json({
                mensaje: 'Usuario actualizado exitosamente.',
                usuario: result.rows[0]
            })

        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Error al actualizar usuario.' });
        }
    }
};

module.exports = usuarioControllers;