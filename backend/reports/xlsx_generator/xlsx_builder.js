const dataAccess = require('../data_access');
const assetConverter = require('../asset_converter');
const componentConverter = require('../component_converter');
const XlsxGenerator = require('xlsx-populate');

// async function exec(){
exports.generateUpeReport = async () => {
    const data = await dataAccess.getUpeReportInfo();
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }
    const convertedAssets = assetConverter.getEntities(data);
    componentConverter.simplifyCaseComponents(convertedAssets);

    const workbook = await XlsxGenerator.fromBlankAsync();

    const headers = ['Código', 'Categoría', 'Nombre', 'Marca', 'Modelo', 'Componentes',
    'Serie','Dependencia','Fecha Ingreso','Custodio Actual','Bloque','Ubicación'];

    const sheet = workbook.sheet(0);
    let columsWidth = [0,0,0,0,0,0,0,0,0,0,0,0]

    setHeaders(sheet,headers,columsWidth);

    for(let i = 0; i < convertedAssets.length; i++){
        let asset = convertedAssets[i];
        let assetInfo = [asset.assetKey, asset.category, asset.name, asset.brand, asset.model, asset.feature, 
            asset.series, asset.acquisitionDependency, asset.entryDate.toLocaleDateString('es-ES'), asset.currentCustodian,
            asset.building, asset.location];

        for(let j = 0; j < assetInfo.length; j++){
            fillCell(sheet,i + 1,j,assetInfo[j],columsWidth);
            if(j == 0 || j == 8){
                sheet.cell(getCellName(i + 1, j)).style({
                    horizontalAlignment: 'center'
                });
            }
        }
    }

    console.log("Archivo construido, exportando...");

    // return workbook.toFileAsync("./reports/xlsx_generator/output.xlsx");
    return workbook.outputAsync();
}

// async function exec(){
exports.generateAgeReport = async () => {
    const data = await dataAccess.getAgeInfo();
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }
    const convertedAssets = assetConverter.getEntities(data);
    componentConverter.simplifyCaseComponents(convertedAssets);

    const workbook = await XlsxGenerator.fromBlankAsync();

    const headers = ['Código', 'Categoría', 'Nombre', 'Marca', 'Modelo', 'Componentes',
    'Serie','Dependencia','Fecha Ingreso','Edad','Custodio Actual','Bloque','Ubicación'];
    const sheet = workbook.sheet(0);
    let columsWidth = [0,0,0,0,0,0,0,0,0,0,0,0,0]

    setHeaders(sheet,headers,columsWidth);

    for(let i = 0; i < convertedAssets.length; i++){
        let asset = convertedAssets[i];
        let assetAge = getAge(asset.entryDate);
        let assetInfo = [asset.assetKey, asset.category, asset.name, asset.brand, asset.model, asset.feature, 
            asset.series, asset.acquisitionDependency, asset.entryDate.toLocaleDateString('es-ES'), assetAge, 
            asset.currentCustodian, asset.building, asset.location];

        for(let j = 0; j < assetInfo.length; j++){
            fillCell(sheet,i + 1,j,assetInfo[j],columsWidth);
            if(j == 0 || j == 8 || j == 9){
                sheet.cell(getCellName(i + 1, j)).style({
                    horizontalAlignment: 'center'
                });
                if(j == 9){
                    sheet.cell(getCellName(i + 1, j)).style({
                        fontColor: assetAge >= 5 ? 'EE0000' : '000000'
                    });
                }
            }
        }
    }

    console.log("Archivo construido, exportando...");

    // return workbook.toFileAsync("./reports/xlsx_generator/output.xlsx");
    return workbook.outputAsync();
}

// async function exec(dependencyId){
exports.generateDependencyReport = async (dependencyId) => {
    const data = await dataAccess.getDependencyInfo(dependencyId);
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }
    const convertedAssets = assetConverter.getEntities(data);
    componentConverter.simplifyCaseComponents(convertedAssets);

    const workbook = await XlsxGenerator.fromBlankAsync();

    const headers = ['Código', 'Categoría', 'Nombre', 'Marca', 'Modelo', 'Componentes',
    'Serie','Dependencia','Fecha Ingreso','Custodio Actual','Bloque','Ubicación'];

    const sheet = workbook.sheet(0);
    let columsWidth = [0,0,0,0,0,0,0,0,0,0,0,0]

    setHeaders(sheet,headers,columsWidth);

    for(let i = 0; i < convertedAssets.length; i++){
        let asset = convertedAssets[i];
        let assetInfo = [asset.assetKey, asset.category, asset.name, asset.brand, asset.model, asset.feature, 
            asset.series, asset.acquisitionDependency, asset.entryDate.toLocaleDateString('es-ES'), asset.currentCustodian,
            asset.building, asset.location];

        for(let j = 0; j < assetInfo.length; j++){
            fillCell(sheet,i + 1,j,assetInfo[j],columsWidth);
            if(j == 0 || j == 8){
                sheet.cell(getCellName(i + 1, j)).style({
                    horizontalAlignment: 'center'
                });
            }
        }
    }

    console.log("Archivo construido, exportando...");

    // return workbook.toFileAsync("./reports/xlsx_generator/output.xlsx");
    return workbook.outputAsync();
}

// async function exec(locationId){
exports.generateLocationReport = async (locationId) => {
    const data = await dataAccess.getLocationInfo(locationId);
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }
    const convertedAssets = assetConverter.getEntities(data);
    componentConverter.simplifyCaseComponents(convertedAssets);

    const workbook = await XlsxGenerator.fromBlankAsync();

    const headers = ['Código', 'Categoría', 'Nombre', 'Marca', 'Modelo', 'Componentes',
    'Serie','Dependencia','Fecha Ingreso','Custodio Actual','Bloque','Ubicación'];

    const sheet = workbook.sheet(0);
    let columsWidth = [0,0,0,0,0,0,0,0,0,0,0,0]

    setHeaders(sheet,headers,columsWidth);

    for(let i = 0; i < convertedAssets.length; i++){
        let asset = convertedAssets[i];
        let assetInfo = [asset.assetKey, asset.category, asset.name, asset.brand, asset.model, asset.feature, 
            asset.series, asset.acquisitionDependency, asset.entryDate.toLocaleDateString('es-ES'), asset.currentCustodian,
            asset.building, asset.location];

        for(let j = 0; j < assetInfo.length; j++){
            fillCell(sheet,i + 1,j,assetInfo[j],columsWidth);
            if(j == 0 || j == 8){
                sheet.cell(getCellName(i + 1, j)).style({
                    horizontalAlignment: 'center'
                });
            }
        }
    }

    console.log("Archivo construido, exportando...");

    // return workbook.toFileAsync("./reports/xlsx_generator/output.xlsx");
    return workbook.outputAsync();
}

exports.generateSoftwareReport = async (labType) => {
    const data = await dataAccess.getSoftwareInfo(labType);
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }

    const workbook = await XlsxGenerator.fromBlankAsync();

    const headers = ['Id', 'Nombre', 'Versión', 'Licencia', 'Duración de la Licencia',
    'Tipo de Laboratorio', 'Descripción', 'Fecha de Adquisición'];

    const sheet = workbook.sheet(0);
    let columsWidth = [0,0,0,0,0,0,0,0];

    setHeaders(sheet,headers,columsWidth);

    for(let i = 0; i < data.length; i++){
        let software = data[i];
        let softwareInfo = [software.ID, software.NAME, software.VERSION, software.LICENSE, 
            software.LICENSE_DURATION, software.LAB_TYPE, software.DESCRIPTION, software.ENTRY_DATE.toLocaleDateString('es-ES')];

        for(let j = 0; j < softwareInfo.length; j++){
            fillCell(sheet,i + 1,j,softwareInfo[j],columsWidth);
            if(j % 2 == 0){
                sheet.cell(getCellName(i + 1, j)).style({
                    horizontalAlignment: 'center'
                });
            }
        }
    }

    console.log("Archivo construido, exportando...");

    // return workbook.toFileAsync("./reports/xlsx_generator/output.xlsx");
    return workbook.outputAsync();
}

// async function exec(locationId){
exports.generateComputersReport = async (locationId) => {
    const data = await dataAccess.getComputersInfo(locationId);
    if(data.hasOwnProperty('error')){
        response.status(500).json(data);
        return;
    }

    const convertedAssets = assetConverter.getEntities(data);
    componentConverter.simplifyCaseComponents(convertedAssets);

    const workbook = await XlsxGenerator.fromBlankAsync();

    const headers = ['Código', 'Categoría', 'Nombre', 'Nombre', 'Nombre','Nombre', 'Nombre', 'Nombre', 'Nombre', 
    'Nombre', 'Nombre', 'Nombre', 'Nombre', 'Marca', 'Modelo', 'Componentes',
    'Serie','Dependencia','Fecha Ingreso','Custodio Actual','Bloque','Ubicación'];

    const sheet = workbook.sheet(0);
    let columsWidth = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    setHeaders(sheet,headers,columsWidth);
    sheet.range("C1:M1").merged(true);

    let rowNumber = 0;
    let colNumber = 0;
    let assetInfo = [];
    let cComponentInfo = [];
    let csComponentInfo = [];
    let csComponentCount = 0;

    convertedAssets.forEach(asset => {
        colNumber = 0;
        assetInfo = [asset.assetKey, asset.category, asset.name, asset.brand, asset.model, asset.feature, 
            asset.series, asset.acquisitionDependency, asset.entryDate.toLocaleDateString('es-ES'), asset.currentCustodian,
            asset.building, asset.location];

        assetInfo.forEach( value => {

            fillCell(sheet,rowNumber + 1,colNumber,value,columsWidth);

            if(colNumber == 0 || colNumber == 18){
                sheet.cell(getCellName(rowNumber + 1, colNumber)).style({
                    horizontalAlignment: 'center'
                });
            }

            if(colNumber == 2){
                fillCell(sheet,rowNumber + 1, colNumber, `${value} / ${asset.operativeSystem}`, columsWidth);
                sheet.range(`C${rowNumber + 2}:M${rowNumber + 2}`).merged(true);
                rowNumber++;

                fillCell(sheet,rowNumber + 1, colNumber,'Componentes Computador:', columsWidth);
                sheet.cell(getCellName(rowNumber + 1, colNumber)).style({
                    bold: true
                });
                sheet.range(`C${rowNumber + 2}:M${rowNumber + 2}`).merged(true);
                rowNumber++;

                setSubheaders(sheet,
                    ['Id','Código Bien','Nombre', 'Edificio', 'Ubicación', 'Localización', 'Estado'], 
                    rowNumber + 1,colNumber, columsWidth);
                rowNumber++;

                asset.components.forEach(component => {
                    cComponentInfo = [component.id, component.assetKey, component.name, component.building,
                        component.location, component.position, component.status];
                        
                    for(let i = 0; i < cComponentInfo.length; i++){
                        fillCell(sheet, rowNumber + 1, colNumber, cComponentInfo[i], columsWidth);
                        colNumber++;
                    }

                    colNumber -= cComponentInfo.length;
                    rowNumber++;
                });

                fillCell(sheet,rowNumber + 1, colNumber, '', columsWidth);
                sheet.range(`C${rowNumber + 2}:M${rowNumber + 2}`).merged(true);
                rowNumber++;

                fillCell(sheet,rowNumber + 1, colNumber,'Componentes Gabinete:', columsWidth);
                sheet.cell(getCellName(rowNumber + 1, colNumber)).style({
                    bold: true
                });
                sheet.range(`C${rowNumber + 2}:M${rowNumber + 2}`).merged(true);
                rowNumber++;


                cCase = asset.components.find(component => component.name == 'GABINETE');
                csComponentCount = cCase.components.length;

                setSubheaders(sheet,
                    ['Id','Nombre','Marca', 'Modelo', 'Serie', 'Tipo', 'Capacidad',
                    'Estado','Repotencia','Fecha Repotencia','Detalle Repotencia'], 
                    rowNumber + 1,colNumber, columsWidth);
                rowNumber++;

                cCase.components.forEach(component => {
                    csComponentInfo = [component.id, component.name, component.brand,
                        component.model, component.series, component.type, component.capacity, component.status,
                        component.isUpgrade, component.upgradeDate, component.upgradeDetail];
                        
                    for(let i = 0; i < csComponentInfo.length; i++){
                        fillCell(sheet, rowNumber + 1, colNumber, csComponentInfo[i], columsWidth);
                        colNumber++;
                    }

                    colNumber -= csComponentInfo.length;
                    rowNumber++;
                });

                fillCell(sheet,rowNumber + 1, colNumber, '', columsWidth);
                sheet.range(`C${rowNumber + 2}:M${rowNumber + 2}`).merged(true);

                rowNumber -= asset.components.length + csComponentCount + 6;
                colNumber = 12;
                sheet.column('C').width(10);
            }

            colNumber++;
        });

        rowNumber += asset.components.length + csComponentCount + 7;
    });

    console.log("Archivo construido, exportando...");

    // return workbook.toFileAsync("./reports/xlsx_generator/output.xlsx");
    return workbook.outputAsync();
}

function setHeaders(sheet, headers, columsWidth){
    for(let i = 0; i < headers.length; i++){
        fillCell(sheet,0,i,headers[i],columsWidth);
        sheet.cell(getCellName(0,i)).style({
            horizontalAlignment: 'center',
            bold: true
        });
    }
}

function setSubheaders(sheet, headers, row, startCol, columsWidth){
    let idx = 0
    for(let i = startCol; i < (startCol + headers.length); i++){
        fillCell(sheet,row,i,headers[idx],columsWidth);
        sheet.cell(getCellName(row,i)).style({
            horizontalAlignment: 'center',
            bold: true
        });
        idx++;
    }
}

function fillCell(sheet, row, col, content, columsWidth){
    try{
        sheet.cell(getCellName(row,col)).value(content);
        columsWidth[col] = setColumnWidth(sheet,String.fromCharCode(65 + col),columsWidth[col],content.length);
    }catch(ex){
        console.log(`${col} /// ${row}`);
    }
}

function getCellName(row, col){
    return `${String.fromCharCode(65 + col)}${(row + 1)}`
}

function setColumnWidth(sheet, column, lastMaxWidth, inputWidth){
    if(inputWidth > lastMaxWidth){
        sheet.column(column).width(inputWidth + 5);
        return inputWidth + 5;
    }
    return lastMaxWidth;
}

function getAge(entryDate){
    return new Date().getFullYear() - entryDate.getFullYear();
}

// exec().then(() => {
//     console.log("Archivo Exportado");
// });