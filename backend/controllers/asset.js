const connection = require('../databaseConnection');

exports.getAssets = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT asset.ASSET_KEY AS ASSET_KEY, category.NAME AS CATEGORY, asset.NAME AS NAME, brand.NAME AS BRAND,
            asset.MODEL, asset.FEATURE, asset.SERIES, dependency.NAME AS ACQUISITION_DEPENDENCY, asset.ENTRY_DATE AS ENTRY_DATE,
            asset.CURRENT_CUSTODIAN AS CURRENT_CUSTODIAN, building.NAME AS BUILDING, location.NAME AS LOCATION
            FROM ASSET AS asset
                LEFT JOIN CATEGORY AS category ON category.ID = asset.CATEGORY_ID
                LEFT JOIN BRAND AS brand ON brand.ID = asset.BRAND_ID
                LEFT JOIN DEPENDENCY AS dependency ON dependency.ID = asset.ACQUISITION_DEPENDENCY_ID
                LEFT JOIN LOCATION AS location ON location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID`
        );
        response.json(data);
    }catch(error){
        console.log('Error en "getAssets()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los bienes'});
    }
}

exports.getAssetById = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT asset.ASSET_KEY AS ASSET_KEY, category.NAME AS CATEGORY, asset.NAME AS NAME, brand.NAME AS BRAND,
            asset.MODEL, asset.FEATURE, asset.SERIES, dependency.NAME AS ACQUISITION_DEPENDENCY, asset.ENTRY_DATE AS ENTRY_DATE,
            asset.CURRENT_CUSTODIAN AS CURRENT_CUSTODIAN, building.NAME AS BUILDING, location.NAME AS LOCATION
            FROM ASSET AS asset
                LEFT JOIN CATEGORY AS category ON category.ID = asset.CATEGORY_ID
                LEFT JOIN BRAND AS brand ON brand.ID = asset.BRAND_ID
                LEFT JOIN DEPENDENCY AS dependency ON dependency.ID = asset.ACQUISITION_DEPENDENCY_ID
                LEFT JOIN LOCATION AS location ON location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID
            WHERE asset.ASSET_KEY = ?`
            ,[request.params.id]
        );
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getAssetById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el bien'});
    }
}

exports.insertAsset = async (request, response) => {
    try{
        const {assetKey, categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId} = request.body;
        const [dbResponse] = await connection.query(
            `INSERT INTO ASSET VALUES(?,?,?,?,?,?,?,?,?,?,?,CURDATE())`,
            [assetKey, categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId]
        );
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertAsset()" controller\n',error);
        response.status(500).json({error: 'Error al intentar insertar el bien'});
    }
}

exports.updateAsset = async (request, response) => {
    try{
        const {categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId} = request.body;
        const assetKey = request.params.id
        const [dbResponse] = await connection.query(
            `UPDATE ASSET 
                SET CATEGORY_ID = ?, NAME = ?, BRAND_ID = ?,
                MODEL = ?, FEATURE = ?, SERIES = ?, ACQUISITION_DEPENDENCY_ID = ?,
                ENTRY_DATE = ?, CURRENT_CUSTODIAN = ?, LOCATION_ID = ?   
            WHERE ASSET_KEY = ?`,
            [categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId,assetKey]
        );
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateAsset()" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar el bien'});
    }
}

exports.deleteAsset = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM ASSET WHERE ASSET_KEY = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteAsset()" controller\n',error);
        response.status(500).json({error: 'Error al intentar eliminar el bien'});
    }
}