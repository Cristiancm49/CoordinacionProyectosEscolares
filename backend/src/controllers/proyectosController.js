const pool = require('../config/db');

const proyectoController = {
    getProyectos: async (req, res) => {
        try {

            const result = await pool.query(`SELECT * FROM proyecto`);
            res.json(result.rows);

        } catch (error) {
            console.error('Error al obtener proyectos:', error);
            res.status(500).json({ message: 'Error al obtener proyectos.' });
        }
    },
getProyectoById: async (req, res) => {
    
    const { id } = req.params;

    try {

        const result = await pool.query(`SELECT * FROM proyecto WHERE idproyecto = $1`, [id]);
        if(result.rows.length === 0) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error('Error al obtener proyecto por ID:', error);
        res.status(500).json({ message: 'Error al obtener proyecto por ID.' });
        
    }
},

    createProyecto: async (req, res) => {
        const {
            nombre,
            descripcion,
            objetivos,
            cronograma,
            observaciones,
            fechaInicio,
            fechaFin,
            idInstitucion,
        } = req.body;

        try {
            const result = await pool.query(
                'INSERT INTO proyecto (nombre, descripcion, objetivos, cronograma, observaciones, fechaInicio, fechaFin, idInstitucion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                [nombre, descripcion, objetivos, cronograma, observaciones, fechaInicio, fechaFin, idInstitucion]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error al crear proyecto:', error);
            res.status(500).json({ message: 'Error al crear proyecto.' });
        }
    },
    updateProyecto: async (req, res) => {
        const { id } = req.params;
        const {
            nombre,
            descripcion,
            objetivos,
            cronograma,
            observaciones,
            fechaInicio,
            fechaFin,
            idInstitucion,
        } = req.body;

        try {
            const result = await pool.query(
                'UPDATE proyecto SET nombre = $1, descripcion = $2, objetivos = $3, cronograma = $4, observaciones = $5, fechaInicio = $6, fechaFin = $7, idInstitucion = $8 WHERE idproyecto = $9 RETURNING *',
                [
                    nombre,
                    descripcion,
                    objetivos,
                    cronograma,
                    observaciones,
                    fechaInicio,
                    fechaFin,
                    idInstitucion,
                    id,
                ]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Proyecto no encontrado para actualizar.' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error al actualizar proyecto:', error);
            res.status(500).json({ message: 'Error al actualizar proyecto.' });
        }
    },
    getProyectosByInstitucion: async (req, res) => {
        const { idInstitucion } = req.params;
        try {
            const result = await pool.query('SELECT * FROM proyecto WHERE idInstitucion = $1', [idInstitucion]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No se encontraron proyectos para esta institución.' });
            }
            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener proyectos por institución:', error);
            res.status(500).json({ message: 'Error al obtener proyectos por institución.' });
        }
    },

    getProyectosByUsuario: async (req, res) => {
        const { idUsuario } = req.params;
        try {
            const result = await pool.query(
                `SELECT p.* FROM proyecto p
                 JOIN proyectoestudiantes pe ON p.idproyecto = pe.idproyecto
                 WHERE pe.idusuario = $1`,
                [idUsuario]
            );
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'No se encontraron proyectos para este usuario.' });
            }
            res.json(result.rows);
        } catch (error) {
            console.error('Error al obtener proyectos por usuario:', error);
            res.status(500).json({ message: 'Error al obtener proyectos por usuario.' });
        }
    },
};

module.exports = proyectoController;