const pool = require('../config/db');

const estudiantesController = {
    // Obtener todos los estudiantes (usuarios con rol 'Estudiante')
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

    // Obtener estudiante por ID (usuario con rol 'Estudiante')
    getEstudianteById: async (req, res) => {
        const { id } = req.params;
        try {
            // Consulta para obtener un usuario por ID con el rol de 'Estudiante'
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
    },

    // Crear un nuevo estudiante (usuario con rol 'Estudiante')
    createEstudiante: async (req, res) => {
        const { nombre, apellidos, grado, email } = req.body;

        try {
            // Aquí se debe asumir que el rol de estudiante ya existe en la tabla ROL
            // y que su id es conocido (puedes manejar este valor de forma más dinámica si es necesario).
            const result = await pool.query(`
                INSERT INTO usuario (nombre, apellidos, grado, email, idrol)
                VALUES ($1, $2, $3, $4, (SELECT idrol FROM rol WHERE nombre = 'Estudiante')) 
                RETURNING *`, 
                [nombre, apellidos, grado, email]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error al crear estudiante:', error);
            res.status(500).json({ message: 'Error al crear estudiante.' });
        }
    },

    // Actualizar un estudiante (usuario con rol 'Estudiante')
    updateEstudiante: async (req, res) => {
        const { id } = req.params;
        const { nombre, apellidos, grado, email } = req.body;

        try {
            // Actualizar la información de un usuario con rol 'Estudiante'
            const result = await pool.query(`
                UPDATE usuario 
                SET nombre = $1, apellidos = $2, grado = $3, email = $4
                WHERE idusuario = $5 AND idrol = (SELECT idrol FROM rol WHERE nombre = 'Estudiante') 
                RETURNING *`,
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

    // Eliminar un estudiante (usuario con rol 'Estudiante')
    deleteEstudiante: async (req, res) => {
        const { id } = req.params;
        try {
            // Eliminar un usuario con rol 'Estudiante'
            const result = await pool.query(`
                DELETE FROM usuario 
                WHERE idusuario = $1 AND idrol = (SELECT idrol FROM rol WHERE nombre = 'Estudiante') 
                RETURNING *`, [id]);

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
