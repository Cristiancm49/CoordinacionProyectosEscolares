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

    getUsuariosById: 6
}