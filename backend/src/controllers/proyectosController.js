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
    try {
        
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
        idInstitucion } = req.body;

    try {
        const result = await pool.query(`UPDATE proyecto SET`)
        


    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        res.status(500).json({ message: 'Error al actualizar proyecto.' });
    }
},
getProyectosByInstitucion: async (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error al obtener proyectos por institución:', error);
        res.status(500).json({ message: 'Error al obtener proyectos por institución.' });
    }
},
getProyectosByUsuario: async (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error al obtener proyectos por usuario:', error);
        res.status(500).json({ message: 'Error al obtener proyectos por usuario.' });
    }
}};
module.exports = proyectoController;