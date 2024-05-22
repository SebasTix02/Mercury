const connection = require('../databaseConnection');

const assetBaseQuery = 
`SELECT 
-- ASSET/COMPUTER
asset.ASSET_KEY AS ASSET_KEY, -- COUNT(asset.ASSET_KEY)
computer.ID AS COMPUTER_ID, category.NAME AS ASSET_CATEGORY, asset.NAME AS ASSET_NAME, asset_building.NAME AS ASSET_BUILDING, asset_location.NAME AS ASSET_LOCATION,
asset_brand.NAME AS ASSET_BRAND, asset.MODEL AS ASSET_MODEL,
computer.OPERATIVE_SYSTEM,  
asset.FEATURE, asset.SERIES AS ASSET_SERIES, dependency.NAME AS ACQUISITION_DEPENDENCY, asset.ENTRY_DATE AS ENTRY_DATE,
asset.CURRENT_CUSTODIAN AS CURRENT_CUSTODIAN,

-- COMPUTER_COMPONENT
computer_component.ID AS COMPUTER_COMPONENT_ID, computer_component.ASSET_KEY AS COMPUTER_COMPONENT_ASSET_KEY,
CASE 
    WHEN computer_component.ASSET_KEY IS NOT NULL THEN (
        SELECT NAME 
        FROM ASSET 
        WHERE ASSET_KEY = computer_component.ASSET_KEY
    )
    ELSE computer_component.NAME
END AS COMPUTER_COMPONENT_NAME,
cc_building.NAME AS COMPUTER_COMPONENT_BUILDING, cc_location.NAME AS COMPUTER_COMPONENT_LOCATION, computer_component.POSITION AS COMPUTER_COMPONENT_POSITION,
CASE 
    WHEN computer_component.STATUS = 0 THEN 'INACTIVO'
    WHEN computer_component.STATUS = 1 THEN 'ACTIVO'
END AS COMPUTER_COMPONENT_STATUS,

-- CASE_COMPONENT
case_component.ID AS CASE_COMPONENT_ID, 
CASE 
    WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.NAME
    WHEN case_component.ASSET_KEY IS NULL THEN case_component.NAME
END AS CASE_COMPONENT_NAME,
cc_brand.NAME AS CASE_COMPONENT_BRAND,
CASE
    WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.MODEL
    WHEN case_component.ASSET_KEY IS NULL THEN case_component.MODEL
END AS CASE_COMPONENT_MODEL,
CASE
    WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.SERIES
    WHEN case_component.ASSET_KEY IS NULL THEN case_component.SERIES
END AS CASE_COMPONENT_SERIES,
case_component.TYPE CASE_COMPONENT_TYPE,
CASE
    WHEN case_component.CAPACITY >= 1000 THEN CONCAT(CAST(ROUND(case_component.CAPACITY / 1000, 0) AS CHAR),' TB')
    ELSE CONCAT(CAST(case_component.CAPACITY AS CHAR),' GB')
END AS CASE_COMPONENT_CAPACITY,
CASE
    WHEN case_component.STATUS = 1 THEN 'ACTIVO'
    WHEN case_component.STATUS = 0 THEN 'BAJA'
END AS CASE_COMPONENT_STATUS,
CASE
    WHEN case_component.IS_UPGRADE = 1 THEN 'SI'
    ELSE NULL
END AS IS_UPGRADE,
case_component.UPGRADE_DATE, case_component.UPGRADE_DETAIL

FROM ASSET AS asset
    LEFT JOIN CATEGORY AS category ON category.ID = asset.CATEGORY_ID
    LEFT JOIN DEPENDENCY AS dependency ON dependency.ID = asset.ACQUISITION_DEPENDENCY_ID
    LEFT JOIN BRAND AS asset_brand ON asset_brand.ID = asset.BRAND_ID
    LEFT JOIN LOCATION AS asset_location ON asset_location.ID = asset.LOCATION_ID
    LEFT JOIN COMPUTER AS computer ON computer.ASSET_KEY = asset.ASSET_KEY
    LEFT JOIN COMPUTER_COMPONENT AS computer_component ON computer_component.COMPUTER_ID = computer.ID
    LEFT JOIN CASE_COMPONENT AS case_component ON case_component.CASE_ID = computer_component.ID
    LEFT JOIN BRAND AS cc_brand ON cc_brand.ID = case_component.BRAND_ID
    LEFT JOIN LOCATION AS cc_location ON cc_location.ID = computer_component.LOCATION_ID
    LEFT JOIN BUILDING AS asset_building ON asset_building.ID = asset_location.BUILDING_ID 
    LEFT JOIN BUILDING AS cc_building ON cc_building.ID = cc_location.BUILDING_ID
-- WHERE asset.ASSET_KEY = 1
-- WHERE computer.ID IS NOT NULL`

exports.getUpeReportInfo = async () => {
    try{
        const [data] = await connection.query(
            `${assetBaseQuery}
            ORDER BY category.NAME, asset.NAME, asset.ASSET_KEY, computer_component.ID`
        );
        if(data.length == 0){
            return JSON.parse(`{"error": "La fuente no devolvió datos en \\"getUpeReportInfo()\\""}`);
        } else {
            return data;
        }
    }catch(error){
        console.log('Error en "getUpeReportInfo()" controller\nError al intentar obtener la información del reporte UPE',error);
    }
}

exports.getComputersInfo = async (locationId) => {
    try{
        const [data] = await connection.query(
            `${assetBaseQuery}
            WHERE computer.ID IS NOT NULL ${locationId != undefined ? 'AND asset_location.ID = ' + locationId : '' }
            ORDER BY asset_building.ID, asset_location.ID, asset.ASSET_KEY, computer_component.NAME, case_component.NAME`
        );
        if(data.length == 0){
            return JSON.parse(`{"error": "La fuente no devolvió datos en \\"getComputersInfo()\\""}`);
        } else {
            return data;
        }
    }catch(error){
        console.log('Error en "getComputersInfo" controller\nError al intentar obtener la información de computadores.',error);
    }
}

exports.getAgeInfo = async () => {
    try{
        const [data] = await connection.query(
            `${assetBaseQuery}
            WHERE asset.CATEGORY_ID = 5
            ORDER BY category.NAME, asset.NAME, asset.ASSET_KEY, computer_component.ID`
        );
        if(data.length == 0){
            return JSON.parse(`{"error": "La fuente no devolvió datos en \\"getAgeInfo()\\""}`);
        } else {
            return data;
        }
    }catch(error){
        console.log('Error en "getAgeInfo" controller\nError al intentar obtener la información de bienes.',error);
    }
}

exports.getDependencyInfo = async (dependencyId) => {
    try{
        const [data] = await connection.query(
            `${assetBaseQuery}
            ${dependencyId != undefined ? 'WHERE asset.ACQUISITION_DEPENDENCY_ID = ' + dependencyId : '' }
            ORDER BY dependency.NAME, asset.ASSET_KEY, computer_component.NAME, case_component.NAME;`
        );
        if(data.length == 0){
            return JSON.parse(`{"error": "La fuente no devolvió datos en \\"getDependencyInfo()\\""}`);
        } else {
            return data;
        }
    }catch(error){
        console.log('Error en "getDependencyInfo" controller\nError al intentar obtener la información de bienes.',error);
    }
}

exports.getLocationInfo = async (locationId) => {
    try{
        const [data] = await connection.query(
            `${assetBaseQuery}
            ${locationId != undefined ? 'WHERE asset_location.ID = ' + locationId : '' }
            ORDER BY asset_building.ID, asset_location.ID, asset.ASSET_KEY`
        );
        if(data.length == 0){
            return JSON.parse(`{"error": "La fuente no devolvió datos en \\"getLabInfo()\\""}`);
        } else {
            return data;
        }
    }catch(error){
        console.log('Error en "getLabInfo" controller\nError al intentar obtener la información de bienes.',error);
    }
}

exports.getSoftwareInfo = async () => {
    try{
        const [data] = await connection.query('SELECT * FROM SOFTWARE');
        if(data.length == 0){
            return JSON.parse(`{"error": "La fuente no devolvió datos en \\"getSoftwareInfo()\\""}`);
        } else {
            return data;
        }
    }catch(error){
        console.log('Error en "getSoftwareInfo" controller\nError al intentar obtener la información de Software.',error);
    }
}

