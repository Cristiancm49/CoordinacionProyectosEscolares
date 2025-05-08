const pool = require('../config/db');
const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');

const fonts = {
    Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    }
};

const pronter = new PdfPrinter(fonts);

const reporteController = {
    getReportes: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query(`SELECT p.*, i.nombre AS institucion
        FROM proyecto p
        JOIN institucion i ON p.idinstitucion = i.idinstitucion
        WHERE p.idproyecto = $1`, [id]);

        if(result.rows.length === 0){
            return res.status(404).json({ message: 'Proyecto no encontrado.' });

        }

        const proyecto = result.rows[0];

        const estudiantesResult = await pool.query(`SELECT u.nombre, u.apellidos
        FROM proyectoestudiantes pe
        JOIN usuario u ON pe.idusuario = u.idusuario
        WHERE pe.idproyecto = $1`, [id]);

        const estudiantes = estudiantesResult.rows;

        // crear el contenido del pdf
        const docDefinition = {
            content: [
              { text: 'Reporte del Proyecto Escolar', style: 'header' },
              { text: `Nombre: ${proyecto.nombre}`, margin: [0, 10, 0, 0] },
              { text: `Descripción: ${proyecto.descripcion}` },
              { text: `Objetivos: ${proyecto.objetivos}` },
              { text: `Cronograma: ${proyecto.cronograma}` },
              { text: `Institución: ${proyecto.institucion}` },
              { text: `Fechas: ${proyecto.fechainicio} a ${proyecto.fechafin}` },
              { text: 'Estudiantes vinculados:', style: 'subheader' },
              {
                ul: estudiantes.map(e => `${e.nombre} ${e.apellidos}`)
              },
              { text: `Generado el: ${new Date().toLocaleDateString()}`, margin: [0, 20, 0, 0] }
            ],
            styles: {
              header: { fontSize: 18, bold: true },
              subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] }
            }
          };

          const pdfDoc = pronter.createPdfKitDocument(docDefinition);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `inline; filename=reporte_proyecto_${id}.pdf`);
          pdfDoc.pipe(res);
          pdfDoc.end();
    


        } catch (error) {
            console.error('Error al obtener reportes:', error);
            res.status(500).json({ message: 'Error al obtener reportes.' });

        }
    }
}

module.exports = reporteController;