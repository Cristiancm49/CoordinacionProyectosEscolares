const pool = require('../config/db');

const estudiantesController = {
    
    getEstudiantes: async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
            res.status(500).json({ message: 'Error al obtener estudiantes.' });
        }
    },

    
    getEstudianteById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = $1', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Estudiante no encontrado.' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error al obtener estudiante por ID:', error);
            res.status(500).json({ message: 'Error al obtener estudiante por ID.' });
        }
    },

    
    createEstudiante: async (req, res) => {
        const { nombre, apellidos, grado, email } = req.body;

        try {
            const result = await pool.query(
                'INSERT INTO estudiantes (nombre, apellidos, grado, email) VALUES ($1, $2, $3, $4) RETURNING *',
                [nombre, apellidos, grado, email]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error al crear estudiante:', error);
            res.status(500).json({ message: 'Error al crear estudiante.' });
        }
    },

    
    updateEstudiante: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellidos, grado, email } = req.body;

        try {
            const result = await pool.query(
                'UPDATE estudiantes SET nombre = $1, apellidos = $2, grado = $3, email = $4 WHERE idestudiante = $5 RETURNING *',
                [nombre, apellidos, grado, email, id]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Estudiante no encontrado para actualizar.' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error al actualizar estudiante:', error);
            res.status(500).json({ message: 'Error al actualizar estudiante.' });
        }
    },

    
    deleteEstudiante: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Estudiante no encontrado para eliminar.' });
            }
            res.json({ message: 'Estudiante eliminado correctamente.' });
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
            res.status(500).json({ message: 'Error al eliminar estudiante.' });
        }
    },
};

module.exports = estudiantesController;
