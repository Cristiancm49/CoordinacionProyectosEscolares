const pool = require('../config/db');

const estudiantesController = {

    getEstudiantes: async (req, res) => {
        try {
            // Consulta para obtener todos los usuarios con el rol de 'Estudiante'
            const result = await pool.query(`
                SELECT u.idusuario, u.nombre, u.apellidos, u.email, r.nombre as rol
                FROM usuario u
                JOIN rol r ON u.idrol = r.idrol
                WHERE r.nombre = 'Estudiante'
            `);
            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
            res.status(500).json({ message: 'Error al obtener estudiantes.' });
        }
    },


    getEstudianteById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query(`
                SELECT u.idusuario, u.nombre, u.apellidos, u.email, r.nombre as rol
                FROM usuario u
                JOIN rol r ON u.idrol = r.idrol
                WHERE r.nombre = 'Estudiante' AND u.idusuario = $1
            `, [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Estudiante no encontrado.' });
            }

            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener estudiante por ID:', error);
            res.status(500).json({ message: 'Error al obtener estudiante por ID.' });
        }
    }
};

module.exports = estudiantesController;
