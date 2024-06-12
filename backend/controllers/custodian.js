const connection = require('../databaseConnection');

exports.getCustodianAssets = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            `SELECT asset.ASSET_KEY AS ASSET_KEY, category.NAME AS CATEGORY, asset.NAME AS NAME, brand.NAME AS BRAND,
            asset.MODEL, asset.FEATURE, asset.SERIES, dependency.NAME AS ACQUISITION_DEPENDENCY, asset.ENTRY_DATE AS ENTRY_DATE,
            asset.CURRENT_CUSTODIAN AS CURRENT_CUSTODIAN, building.NAME AS BUILDING, location.NAME AS LOCATION, asset.POSITION,
            CASE
                WHEN asset.BORROWED = 1 THEN 'PRESTADO'
                ELSE NULL
            END AS BORROWED
            FROM ASSET AS asset
                LEFT JOIN CATEGORY AS category ON category.ID = asset.CATEGORY_ID
                LEFT JOIN BRAND AS brand ON brand.ID = asset.BRAND_ID
                LEFT JOIN DEPENDENCY AS dependency ON dependency.ID = asset.ACQUISITION_DEPENDENCY_ID
                LEFT JOIN LOCATION AS location ON location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID
            WHERE asset.CURRENT_CUSTODIAN = ?`,
            [request.body.currentCustodian]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "getCustodianAssets()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los Bienes asociados al Custodio'});
    }
}

exports.updateCustodian = async (request, response) => {
    try{
        const {newCustodian, assets} = request.body;
        const [dbResponse] = await connection.query(
            `UPDATE ASSET
            SET CURRENT_CUSTODIAN = ?
            WHERE ASSET_KEY IN (${assets.join()})`,
            [newCustodian]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateCustodian" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar el Custodio'});
    }
}