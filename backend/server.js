const express = require('express');
const cors = require('cors');
const buildingRoutes = require('./routes/building');
const locationRoutes = require('./routes/location');
const brandRoutes = require('./routes/brand');
const categoryRoutes = require('./routes/category');
const dependencyRoutes = require('./routes/dependency');
const assetRoutes = require('./routes/asset');
const softwareRoutes = require('./routes/software');
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const computerRoutes = require('./routes/computer');
const computerComponentRoutes = require('./routes/computer_component');
const caseComponentRoutes = require('./routes/case_component');
const pdfReportRoutes = require('./routes/pdf_report');
const xlsxReportRoutes = require('./routes/xlsx_report');
const qrRoutes = require('./routes/qr');

const HTTP_SERVER = express();

// Ruta por defecto
HTTP_SERVER.get('/', (request, response) => {
    response.send("Saludos desde el servidor");
});

// Middleware
HTTP_SERVER.use(express.json());
HTTP_SERVER.use(cors());

// Rutas
HTTP_SERVER.use('/mercury/building', buildingRoutes);
HTTP_SERVER.use('/mercury/location', locationRoutes);
HTTP_SERVER.use('/mercury/brand', brandRoutes);
HTTP_SERVER.use('/mercury/category', categoryRoutes);
HTTP_SERVER.use('/mercury/dependency', dependencyRoutes);
HTTP_SERVER.use('/mercury/asset', assetRoutes);
HTTP_SERVER.use('/mercury/software', softwareRoutes);
HTTP_SERVER.use('/mercury/user', userRoutes);
HTTP_SERVER.use('/mercury/login', loginRoutes);
HTTP_SERVER.use('/mercury/computer', computerRoutes);
HTTP_SERVER.use('/mercury/computer_component', computerComponentRoutes);
HTTP_SERVER.use('/mercury/case_component', caseComponentRoutes);
HTTP_SERVER.use('/mercury/report/pdf', pdfReportRoutes);
HTTP_SERVER.use('/mercury/report/xlsx', xlsxReportRoutes);
HTTP_SERVER.use('/mercury/QR', qrRoutes);

// Arranque del servidor
HTTP_SERVER.listen(4000, () => {
    console.clear();
    console.log("Servidor HTTP escuchando en el puerto 4000");
});

