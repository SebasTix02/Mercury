const reportBuilder = require('../reports/xlsx_generator/xlsx_builder');

exports.getUpeReport = async (request, response) => {
    response.setHeader('Content-Disposition', 'attachment; filename="upe_report.xlsx"');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let xlsxReport;
    try{
        xlsxReport = await reportBuilder.generateUpeReport();
    }catch(error){
        console.log('Error al intentar ejecutar getUpeReport()', error);
        response.status(500).send(error);
    }
    response.send(xlsxReport);
}

exports.getComputersReport = async (request, response) => {
    response.setHeader('Content-Disposition', 'attachment; filename="computer_report.xlsx"');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let xlsxReport;
    try{
        xlsxReport = await reportBuilder.generateComputersReport(request.params.id);
    }catch(error){
        console.log('Error al intentar ejecutar getComputersReport()', error);
        response.status(500).send(error);
    }
    response.send(xlsxReport);
}

exports.getAgeReport = async (request, response) => {
    response.setHeader('Content-Disposition', 'attachment; filename="age_report.xlsx"');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let xlsxReport;
    try{
        xlsxReport = await reportBuilder.generateAgeReport();
    }catch(error){
        console.log('Error al intentar ejecutar getAgeReport()', error);
        response.status(500).send(error);
    }
    response.send(xlsxReport);
}

exports.getDependencyReport = async (request, response) => {
    response.setHeader('Content-Disposition', 'attachment; filename="dependency_report.xlsx"');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let xlsxReport;
    try{
        xlsxReport = await reportBuilder.generateDependencyReport(request.params.id);
    }catch(error){
        console.log('Error al intentar ejecutar getDependencyReport()', error);
        response.status(500).send(error);
    }
    response.send(xlsxReport);
}

exports.getLocationReport = async (request, response) => {
    response.setHeader('Content-Disposition', 'attachment; filename="location_report.xlsx"');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let xlsxReport;
    try{
        xlsxReport = await reportBuilder.generateLocationReport(request.params.id);
    }catch(error){
        console.log('Error al intentar ejecutar getLocationReport()', error);
        response.status(500).send(error);
    }
    response.send(xlsxReport);
}

exports.getSoftwareReport = async (request, response) => {
    response.setHeader('Content-Disposition', 'attachment; filename="software_report.xlsx"');
    response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    let xlsxReport;
    try{
        xlsxReport = await reportBuilder.generateSoftwareReport(request.params.type);
    }catch(error){
        console.log('Error al intentar ejecutar getSoftwareReport()', error);
        response.status(500).send(error);
    }
    response.send(xlsxReport);
}