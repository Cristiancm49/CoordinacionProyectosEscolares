const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { get } = require('../routes/authRoutes');

const usuarioController = {
    getUsuarios: async (req, res) => {
        try {
            const result = await pool.query(`SELECT * FROM usuario`);
            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios.' });
        }
    },

    getUsuariosById: async (req, res) => {
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
    }
}