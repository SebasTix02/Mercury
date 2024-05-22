const separator = require('./separator');

exports.fillAssetTable = (data,computerDescription) => {
    let filledRows = '';
    let lastCategory = null
    data.forEach(row => {
        if(lastCategory != row.category){
            filledRows += separator.setSeparator(row.category,12,'separator-first-level');
            lastCategory = row.category;
        }
        filledRows += 
        `<tr>
            <td>${row.assetKey}</td>
            <td>${row.category}</td>
            <td>${computerDescription ? fillComputer(row) : row.name}</td>
            <td>${row.brand}</td>
            <td>${row.model}</td>
            <td>${row.feature}</td>
            <td>${row.series}</td>
            <td>${row.acquisitionDependency}</td>
            <td>${row.entryDate.toLocaleDateString('es-ES')}</td>
            <td>${row.currentCustodian}</td>
            <td>${row.building}</td>
            <td>${row.location}</td>
        </tr>
        `;
    });
    return filledRows
}

exports.fillComputerTable = (data) => {
    let filledRows = '';
    let lastBuilding = null
    let lastLocation = null
    data.forEach(row => {
        if(lastBuilding != row.building){
            filledRows += separator.setSeparator(row.building,12,'separator-first-level');
            lastBuilding = row.building
        }
        if(lastLocation != row.location){
            filledRows += separator.setSeparator(row.location,12,'separator-second-level');
            lastLocation = row.location
        }
        filledRows += 
        `<tr>
            <td>${row.assetKey}</td>
            <td>${row.category}</td>
            <td>${fillComputer(row)}</td>
            <td>${row.brand}</td>
            <td>${row.model}</td>
            <td>${row.feature}</td>
            <td>${row.series}</td>
            <td>${row.acquisitionDependency}</td>
            <td>${row.entryDate.toLocaleDateString('es-ES')}</td>
            <td>${row.currentCustodian}</td>
            <td>${row.building}</td>
            <td>${row.location}</td>
        </tr>
        `;
    });
    return filledRows
}

exports.fillAgeTable = (data,computerDescription) => {
    let filledRows = '';
    data.forEach(row => {
        filledRows += 
        `<tr>
            <td>${row.assetKey}</td>
            <td>${row.category}</td>
            <td>${computerDescription ? fillComputer(row) : row.name}</td>
            <td>${row.brand}</td>
            <td>${row.model}</td>
            <td>${row.feature}</td>
            <td>${row.series}</td>
            <td>${row.acquisitionDependency}</td>
            <td>${row.entryDate.toLocaleDateString('es-ES')}</td>
            ${getAge(row.entryDate)}
            <td>${row.currentCustodian}</td>
            <td>${row.building}</td>
            <td>${row.location}</td>
        </tr>
        `;
    });
    return filledRows
}

exports.fillDependencyTable = (data) => {
    let filledRows = '';
    let lastDependency = null
    data.forEach(row => {
        if(lastDependency != row.acquisitionDependency){
            filledRows += separator.setSeparator(row.acquisitionDependency,12,'separator-first-level');
            lastDependency = row.acquisitionDependency;
        }
        filledRows += 
        `<tr>
            <td>${row.assetKey}</td>
            <td>${row.category}</td>
            <td>${row.name}</td>
            <td>${row.brand}</td>
            <td>${row.model}</td>
            <td>${row.feature}</td>
            <td>${row.series}</td>
            <td>${row.acquisitionDependency}</td>
            <td>${row.entryDate.toLocaleDateString('es-ES')}</td>
            <td>${row.currentCustodian}</td>
            <td>${row.building}</td>
            <td>${row.location}</td>
        </tr>
        `;
    });
    return filledRows
}

exports.fillLocationTable = (data) => {
    let filledRows = '';
    let lastBuilding = null
    let lastLocation = null
    data.forEach(row => {
        if(lastBuilding != row.building){
            filledRows += separator.setSeparator(row.building,12,'separator-first-level');
            lastBuilding = row.building
        }
        if(lastLocation != row.location){
            filledRows += separator.setSeparator(row.location,12,'separator-second-level');
            lastLocation = row.location
        }
        filledRows += 
        `<tr>
            <td>${row.assetKey}</td>
            <td>${row.category}</td>
            <td>${row.name}</td>
            <td>${row.brand}</td>
            <td>${row.model}</td>
            <td>${row.feature}</td>
            <td>${row.series}</td>
            <td>${row.acquisitionDependency}</td>
            <td>${row.entryDate.toLocaleDateString('es-ES')}</td>
            <td>${row.currentCustodian}</td>
            <td>${row.building}</td>
            <td>${row.location}</td>
        </tr>
        `;
    });
    return filledRows
}

exports.fillSoftwareTable = (data) => {
    let filledRows = '';
    let lastLabType = null
    data.forEach(row => {
        if(lastLabType != row.LAB_TYPE){
            filledRows += separator.setSeparator(row.LAB_TYPE,7,'separator-first-level-software');
            lastLabType = row.LAB_TYPE
        }
        filledRows += 
        `<tr>
            <td>${row.ID}</td>
            <td>${row.NAME}</td>
            <td>${row.VERSION}</td>
            <td>${row.LICENSE}</td>
            <td>${row.LICENSE_DURATION}</td>
            <td>${row.LAB_TYPE}</td>
            <td>${row.ENTRY_DATE.toLocaleDateString('es-ES')}</td>
        </tr>
        `;
    });
    return filledRows
}

function fillComputer(asset){
    let computerComponents = '';

    if(asset.hasOwnProperty('components')){
        let caseComponents = '';

        asset.components.forEach(component => {
            computerComponents += 
            `<tr>
                <td>${component.id}</td>
                <td>${component.assetKey}</td>
                <td>${component.name}</td>
                <td>${component.building}</td>
                <td>${component.location}</td>
                <td>${component.position}</td>
                <td>${component.status}</td>
            </tr>
            `
            if(component.hasOwnProperty('components')){

                component.components.forEach(csc => {
                    caseComponents += 
                    `<tr>
                        <td>${csc.id}</td>
                        <td>${csc.name}</td>
                        <td>${csc.brand}</td>
                        <td>${csc.model}</td>
                        <td>${csc.series}</td>
                        <td>${csc.type}</td>
                        <td>${csc.capacity}</td>
                        <td>${csc.status}</td>
                        <td>${csc.isUpgrade}</td>
                        <td>${csc.upgradeDate}</td>
                        <td>${csc.upgradeDetail}</td>
                    </tr>
                    `
                });
            }
        });
        return `${asset.name} / ${asset.operativeSystem}
        <h3>Componentes Computadora:</h3>
        <table class="inner-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Código Bien</th>
                    <th>Nombre</th>
                    <th>Bloque</th>
                    <th>Ubicación</th>
                    <th>Posición</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${computerComponents}
            </tbody>
        </table>

        <h3>Componentes Gabinete:</h3>
        <table class="inner-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Serie</th>
                    <th>Tipo</th>
                    <th>Capacidad</th>
                    <th>Estado</th>
                    <th>Repotencia</th>
                    <th>Fecha Repotencia</th>
                    <th>Detalle Repotencia</th>
                </tr>
            </thead>
            <tbody>
                ${caseComponents}
            </tbody>
        </table>
        `
    } 
        
    return asset.name;
}

function getAge(entryDate){
    age = new Date().getFullYear() - entryDate.getFullYear();
    fontColor = age >= 5 ? '#A31621' : 'black'
    return `<td style="color: ${fontColor};">${age} años</td>`
}


