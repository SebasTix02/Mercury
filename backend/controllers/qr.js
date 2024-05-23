const connection = require('../databaseConnection');
const reader = require('../qr_generator/file_reader');
const qrGenerator = require('../qr_generator/qr_generator');
const pdf = require('html-pdf');
const { minify } = require('html-minifier-terser');

const cssFileDir = './qr_generator/styles.css'

exports.getAvailableAssets = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT asset.ASSET_KEY AS ASSET_KEY, computer.ID AS COMPUTER_ID, category.NAME AS CATEGORY, asset.NAME AS NAME, 
            brand.NAME AS BRAND,asset.MODEL, asset.FEATURE, asset.SERIES, dependency.NAME AS ACQUISITION_DEPENDENCY, 
            asset.ENTRY_DATE AS ENTRY_DATE, asset.CURRENT_CUSTODIAN AS CURRENT_CUSTODIAN, building.NAME AS BUILDING,
            location.NAME AS LOCATION
            FROM ASSET AS asset
                LEFT JOIN CATEGORY AS category ON category.ID = asset.CATEGORY_ID
                LEFT JOIN BRAND AS brand ON brand.ID = asset.BRAND_ID
                LEFT JOIN DEPENDENCY AS dependency ON dependency.ID = asset.ACQUISITION_DEPENDENCY_ID
                LEFT JOIN LOCATION AS location ON location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID
                LEFT JOIN COMPUTER AS computer ON computer.ASSET_KEY = asset.ASSET_KEY
            ORDER BY category.NAME`
        );
        response.json(data);
    }catch(error){
        console.log('Error en "getAvailableAssets()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los bienes'});
    }
}

exports.getQrTags = async (request, response) => {
    const htmlReport =
    `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                ${await reader.readCssStyles(cssFileDir)}
            </style>
        </head>
    <body>
        <div class="print-zone">
            ${await qrGenerator.embededQR(request.body)}
        </div>
    </body>
    </html>
    `;
    const minifiedHtml = await minify(htmlReport, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true
    });

    // Opciones para la generación del PDF en memoria
    const options = { 
        format: 'A4', 
        // orientation: 'landscape',
        timeout: 60000,
        border: {
            top: '0.2cm',
            right: '0.2cm',
            bottom: '0.2cm',
            left: '0.2cm' 
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
            response.setHeader('Content-Disposition', `inline; filename = qr_tags.pdf`);

            // Enviar el contenido del PDF como respuesta
            response.end(buffer);
        }
    });
}

