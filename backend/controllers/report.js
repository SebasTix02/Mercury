const dataAccess = require('../reports/data_access');
const assetConverter = require('../reports/asset_converter');
const reportBuilder = require('../reports/pdf_generator/report_builder');
const reader = require('../reports/pdf_generator/file_reader');
const pdf = require('html-pdf');
const { minify } = require('html-minifier-terser');
const puppeteer = require('puppeteer');

const cssFileDir = './reports/styles.css';
const getHeader = async () => {
    return `
        <head>
            <meta charset="UTF-8">
            <style>
                ${await reader.readCssStyles(cssFileDir)}
            </style>
        </head>
    `;
}


exports.getUpeReport = async (request, response) => {
    
    const data = await dataAccess.getUpeReportInfo();
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }
    const convertedAssets = assetConverter.getEntities(data);
    const htmlReport =
    `<!DOCTYPE html>
    <html lang="en">
        ${await getHeader()}
    <body>
        <h3>Universidad Técnica de Ambato</h3>
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Categoría</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Característica</th>
                    <th>Serie</th>
                    <th>Dependencia</th>
                    <th>Fecha Ingreso</th>
                    <th>Custodio Actual</th>
                    <th>Bloque</th>
                    <th>Ubicación</th>
                </tr>
            </thead>
            <tbody>
                ${reportBuilder.fillAssetTable(convertedAssets)}
            </tbody>
        </table>
    </body>
    </html>
    `;

    const minifiedHtml = await minify(htmlReport, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true
    });

    // generatePDF(minifiedHtml).then((pdfBuffer) => {
    //     response.setHeader('Content-Disposition', 'inline; filename=reporte.pdf');
    //     response.setHeader('Content-Type', 'application/pdf');
    //     response.send(pdfBuffer);
    // }).catch((err) => {
    //     console.log(err);
    //     response.status(500).json({error: 'Ha ocurrido un error al tratar de generar el PDF'});
    // });

    // Opciones para la generación del PDF en memoria
    const options = { 
        format: 'A4', 
        orientation: 'landscape',
        timeout: 60000,
        border: {
            top: '0.5cm',
            right: '0.5cm',
            bottom: '0.5cm',
            left: '0.5cm' 
        }
    };

    // Generar el PDF en memoria
    pdf.create(minifiedHtml, options).toBuffer((err, buffer) => {
        if (err) {
            console.error(err);
            response.status(500).json({error: 'Error al generar el archivo PDF.'});
        } else {
            // Establecer las cabeceras de la respuesta para enviar el archivo PDF
            response.setHeader('Content-Type', 'application/pdf');
            response.setHeader('Content-Disposition', 'inline; filename = UPE_REPORT.pdf');

            // Enviar el contenido del PDF como respuesta
            response.end(buffer);
        }
    });

}

async function generatePDF(html) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({ format: 'A4', landscape: true,  });
    await browser.close();
    return pdfBuffer;
}