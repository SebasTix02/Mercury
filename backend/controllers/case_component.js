const connection = require('../databaseConnection');

exports.getCaseComponents = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT case_component.ID, 
            CASE 
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.NAME
                ELSE case_component.NAME
            END AS NAME,
            brand.NAME AS BRAND,
            CASE
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.MODEL
                ELSE case_component.MODEL
            END AS MODEL,
            CASE
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.SERIES
                ELSE case_component.SERIES
            END AS SERIES,
            case_component.TYPE,
            CASE
                WHEN case_component.CAPACITY >= 1000 THEN CONCAT(CAST(ROUND(case_component.CAPACITY / 1000, 2) AS CHAR),' TB')
                ELSE CONCAT(CAST(case_component.CAPACITY AS CHAR),' GB')
            END AS CAPACITY,
            CASE
                WHEN case_component.STATUS = 1 THEN 'ACTIVO'
                ELSE 'BAJA'
            END AS STATUS,
            CASE
                WHEN case_component.IS_UPGRADE = 1 THEN 'SI'
                ELSE NULL
            END AS IS_UPGRADE,
            case_component.UPGRADE_DATE, case_component.UPGRADE_DETAIL
            FROM CASE_COMPONENT AS case_component
                LEFT JOIN ASSET AS asset ON asset.ASSET_KEY = case_component.ASSET_KEY
                LEFT JOIN BRAND AS brand ON brand.ID = case_component.BRAND_ID
                    OR brand.ID = asset.BRAND_ID`
        );
        response.json(data);
    }catch(error){
        console.log('Error en "getCaseComponents()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los Componentes del Gabinete'});
    }
}

exports.getCaseComponentById = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT case_component.ID, 
            CASE 
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.NAME
                ELSE case_component.NAME
            END AS NAME,
            brand.NAME AS BRAND,
            CASE
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.MODEL
                ELSE case_component.MODEL
            END AS MODEL,
            CASE
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.SERIES
                ELSE case_component.SERIES
            END AS SERIES,
            case_component.TYPE,
            CASE
                WHEN case_component.CAPACITY >= 1000 THEN CONCAT(CAST(ROUND(case_component.CAPACITY / 1000, 2) AS CHAR),' TB')
                ELSE CONCAT(CAST(case_component.CAPACITY AS CHAR),' GB')
            END AS CAPACITY,
            CASE
                WHEN case_component.STATUS = 1 THEN 'ACTIVO'
                ELSE 'BAJA'
            END AS STATUS,
            CASE
                WHEN case_component.IS_UPGRADE = 1 THEN 'SI'
                ELSE NULL
            END AS IS_UPGRADE,
            case_component.UPGRADE_DATE, case_component.UPGRADE_DETAIL
            FROM CASE_COMPONENT AS case_component
                LEFT JOIN ASSET AS asset ON asset.ASSET_KEY = case_component.ASSET_KEY
                LEFT JOIN BRAND AS brand ON brand.ID = case_component.BRAND_ID
                    OR brand.ID = asset.BRAND_ID
            WHERE case_component.ID = ?`,
            [request.params.id]
        );
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getCaseComponentById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el Componente del Gabinete'});
    }
}

exports.insertCaseComponent = async (request, response) => {
    try{
        const{caseId, assetKey, name, brandId, model, series, type, 
            capacity, status, isUpgrade, upgradeDate, upgradeDetail} = request.body;
        const [dbResponse] = await connection.query(
            'INSERT INTO CASE_COMPONENT VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())',
            [caseId, assetKey, name, brandId, model, series, type, 
            capacity, status, isUpgrade, upgradeDate, upgradeDetail]
        );
        response.json(dbResponse);
    }catch(error){
        if(error.errno == 1062){
            duplicateField = error.sqlMessage.split(' ');
            response.status(500).json({error: `El componente de código ${duplicateField[2]} ya está asignado a otro computador. Ingrese uno diferente`});
        } else {
            console.log('Error en "insertCaseComponent()" controller\n',error);
            response.status(500).json({error: 'Error al intentar insertar el Componente del Gabinete'});
        }
    }
}

exports.updateCaseComponent = async (request, response) => {
    try{
        const{assetKey, name, brandId, model, series, type, 
            capacity, status, isUpgrade, upgradeDate, upgradeDetail} = request.body;
        const id = request.params.id;
        const [dbResponse] = await connection.query(
            `UPDATE CASE_COMPONENT
                SET ASSET_KEY = ?, NAME = ?, BRAND_ID = ?, MODEL = ?,
                SERIES = ?, TYPE = ?, CAPACITY = ?, STATUS = ?,
                IS_UPGRADE = ?, UPGRADE_DATE = ?, UPGRADE_DETAIL = ?
             WHERE ID = ?`,
            [assetKey, name, brandId, model, series, type, capacity,
            status, isUpgrade, upgradeDate, upgradeDetail, id]
        );
        response.json(dbResponse);
    }catch(error){
        if(error.errno == 1062){
            duplicateField = error.sqlMessage.split(' ');
            response.status(500).json({error: `El componente de código ${duplicateField[2]} ya está asignado a otro computador. Ingrese uno diferente`});
        } else {
            console.log('Error en "updateCaseComponent()" controller\n',error);
            response.status(500).json({error: 'Error al intentar actualizar el Componente del Gabinete'});
        }
    }
}

exports.deleteCaseComponent = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM CASE_COMPONENT WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteCaseComponent()" controller\n',error);
        response.status(500).json({error: 'Error al intentar eliminar el Componente del Gabinete'});
    }
}

exports.unsubscribeCaseComponent = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'UPDATE CASE_COMPONENT SET STATUS = 0 WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "unsubscribeCaseComponent()" controller\n',error);
        response.status(500).json({error: 'Error al intentar dar de baja el Componente del Gabinete'});
    }
}

exports.getCaseComponentByCaseId = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT case_component.ID, 
            CASE 
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.NAME
                ELSE case_component.NAME
            END AS NAME,
            brand.NAME AS BRAND,
            CASE
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.MODEL
                ELSE case_component.MODEL
            END AS MODEL,
            CASE
                WHEN case_component.ASSET_KEY IS NOT NULL THEN asset.SERIES
                ELSE case_component.SERIES
            END AS SERIES,
            case_component.TYPE,
            CASE
                WHEN case_component.CAPACITY >= 1000 THEN CONCAT(CAST(ROUND(case_component.CAPACITY / 1000, 2) AS CHAR),' TB')
                ELSE CONCAT(CAST(case_component.CAPACITY AS CHAR),' GB')
            END AS CAPACITY,
            CASE
                WHEN case_component.STATUS = 1 THEN 'ACTIVO'
                ELSE 'BAJA'
            END AS STATUS,
            CASE
                WHEN case_component.IS_UPGRADE = 1 THEN 'SI'
                ELSE NULL
            END AS IS_UPGRADE,
            case_component.UPGRADE_DATE, case_component.UPGRADE_DETAIL
            FROM CASE_COMPONENT AS case_component
                LEFT JOIN ASSET AS asset ON asset.ASSET_KEY = case_component.ASSET_KEY
                LEFT JOIN BRAND AS brand ON brand.ID = case_component.BRAND_ID
                    OR brand.ID = asset.BRAND_ID
            WHERE case_component.CASE_ID = ?`,
            [request.params.id]
        );
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getCaseComponentByCaseId()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los componentes del Gabinete'});
    }
}