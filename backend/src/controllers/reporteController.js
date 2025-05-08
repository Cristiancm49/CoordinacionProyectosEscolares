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
              { text: 'Reporte del Proyecto Escolar', style: 'title' },
              { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ] },
              
              { text: '\nInformación General', style: 'header' },
              {
                style: 'infoTable',
                table: {
                  widths: ['30%', '70%'],
                  body: [
                    ['Nombre del Proyecto:', proyecto.nombre],
                    ['Descripción:', proyecto.descripcion],
                    ['Objetivos:', proyecto.objetivos],
                    ['Cronograma:', proyecto.cronograma],
                    ['Observaciones:', proyecto.observaciones || 'N/A'],
                    ['Institución:', proyecto.institucion]
                  ]
                },
                layout: 'lightHorizontalLines'
              },
          
              { text: '\nFechas del Proyecto', style: 'header' },
              {
                columns: [
                  { text: `Inicio: ${proyecto.fechainicio}`, width: '50%' },
                  { text: `Fin: ${proyecto.fechafin}`, width: '50%' }
                ]
              },
          
              { text: '\nEstudiantes Vinculados', style: 'header' },
              {
                ul: estudiantes.length > 0
                  ? estudiantes.map(e => `${e.nombre} ${e.apellidos}`)
                  : ['Sin estudiantes asignados.']
              },
          
              { text: `\n\nGenerado el: ${new Date().toLocaleDateString()}`, style: 'footer' }
            ],
            styles: {
              title: {
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10]
              },
              header: {
                fontSize: 14,
                bold: true,
                color: '#336699',
                margin: [0, 15, 0, 5]
              },
              infoTable: {
                margin: [0, 5, 0, 15]
              },
              footer: {
                fontSize: 10,
                alignment: 'right',
                color: 'gray'
              }
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