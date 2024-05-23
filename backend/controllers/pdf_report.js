const dataAccess = require('../reports/data_access');
const assetConverter = require('../reports/asset_converter');
const reportBuilder = require('../reports/pdf_generator/report_builder');
const reader = require('../reports/pdf_generator/file_reader');
const pdf = require('html-pdf');
const { minify } = require('html-minifier-terser');

const cssFileDir = './reports/pdf_generator/styles.css';
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
        <table class="table">
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

    await sendPdf2Client(htmlReport,'upe_report',response);

}

exports.getComputersReport = async (request, response) => {
    
    const data = await dataAccess.getComputersInfo(request.params.id);
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
        <table class="table">
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
                ${reportBuilder.fillComputerTable(convertedAssets)}
            </tbody>
        </table>
    </body>
    </html>
    `;

    await sendPdf2Client(htmlReport,'computer_report',response);

}

exports.getAgeReport = async (request, response) => {
    
    const data = await dataAccess.getAgeInfo();
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
        <table class="table">
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
                    <th>Edad</th>
                    <th>Custodio Actual</th>
                    <th>Bloque</th>
                    <th>Ubicación</th>
                </tr>
            </thead>
            <tbody>
                ${reportBuilder.fillAgeTable(convertedAssets)}
            </tbody>
        </table>
    </body>
    </html>
    `;

    await sendPdf2Client(htmlReport,'age_report',response);

}

exports.getDependencyReport = async (request, response) => {
    
    const data = await dataAccess.getDependencyInfo(request.params.id);
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
        <table class="table">
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
                ${reportBuilder.fillDependencyTable(convertedAssets)}
            </tbody>
        </table>
    </body>
    </html>
    `;

    await sendPdf2Client(htmlReport,'dependency_report',response);

}

exports.getLocationReport = async (request, response) => {
    
    const data = await dataAccess.getLocationInfo(request.params.id);
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
        <table class="table">
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
                ${reportBuilder.fillLocationTable(convertedAssets)}
            </tbody>
        </table>
    </body>
    </html>
    `;

    await sendPdf2Client(htmlReport,'location_report',response);

}

exports.getSoftwareReport = async (request, response) => {
    
    const data = await dataAccess.getSoftwareInfo();
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }
    const htmlReport =
    `<!DOCTYPE html>
    <html lang="en">
        ${await getHeader()}
    <body>
        <h3>Universidad Técnica de Ambato</h3>
        <table class="software-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Versión</th>
                    <th>Licencia</th>
                    <th>Duración de la Licencia</th>
                    <th>Tipo de Laboratorio</th>
                    <th>Fecha de Adquisición</th>
                </tr>
            </thead>
            <tbody>
                ${reportBuilder.fillSoftwareTable(data)}
            </tbody>
        </table>
    </body>
    </html>
    `;

    await sendPdf2Client(htmlReport,'software_report',response);

}

async function sendPdf2Client(htmlReport, reportName, response){
    const minifiedHtml = await minify(htmlReport, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true
    });

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
            response.setHeader('Content-Disposition', `inline; filename = ${reportName}.pdf`);

            // Enviar el contenido del PDF como respuesta
            response.end(buffer);
        }
    });
}