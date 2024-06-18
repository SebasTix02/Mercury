const connection = require('../databaseConnection');

exports.getComputers = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT asset.ASSET_KEY AS ASSET_KEY, computer.ID AS COMPUTER_ID, category.NAME AS CATEGORY, asset.NAME AS NAME, 
            building.NAME AS BUILDING, location.NAME AS LOCATION, asset.POSITION,
            CASE
                WHEN asset.BORROWED = 1 THEN 'PRESTADO'
                ELSE 'NO PRESTADO'
            END AS BORROWED,
            brand.NAME AS BRAND, asset.MODEL, computer.OPERATIVE_SYSTEM, computer.IP, GET_TOTAL_CAPACITY(computer.ID,'RAM') AS RAM_CAPACITY, 
            GET_TOTAL_CAPACITY(computer.ID,'DISCO') AS DISK_CAPACITY, GET_TOTAL_CAPACITY(computer.ID,'TARJETA GRÁFICA') AS GRAPH_CAPACITY, 
            asset.FEATURE, asset.SERIES, dependency.NAME AS ACQUISITION_DEPENDENCY, asset.ENTRY_DATE AS ENTRY_DATE,
            asset.CURRENT_CUSTODIAN AS CURRENT_CUSTODIAN
            FROM ASSET AS asset
                LEFT JOIN CATEGORY AS category ON category.ID = asset.CATEGORY_ID
                LEFT JOIN BRAND AS brand ON brand.ID = asset.BRAND_ID
                LEFT JOIN DEPENDENCY AS dependency ON dependency.ID = asset.ACQUISITION_DEPENDENCY_ID
                LEFT JOIN LOCATION AS location ON location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID
                INNER JOIN COMPUTER AS computer on computer.ASSET_KEY = asset.ASSET_KEY`
        );
        response.json(data);
    }catch(error){
        console.log('Error en "getComputers()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los computadores'});
    }
}

exports.getComputerById = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT asset.ASSET_KEY AS ASSET_KEY, computer.ID AS COMPUTER_ID, category.NAME AS CATEGORY, asset.NAME AS NAME, 
            building.NAME AS BUILDING, location.NAME AS LOCATION, asset.POSITION,
            CASE
                WHEN asset.BORROWED = 1 THEN 'PRESTADO'
                ELSE 'NO PRESTADO'
            END AS BORROWED,
            brand.NAME AS BRAND, asset.MODEL, computer.OPERATIVE_SYSTEM, computer.IP, GET_TOTAL_CAPACITY(computer.ID,'RAM') AS RAM_CAPACITY, 
            GET_TOTAL_CAPACITY(computer.ID,'DISCO') AS DISK_CAPACITY, GET_TOTAL_CAPACITY(computer.ID,'TARJETA GRÁFICA') AS GRAPH_CAPACITY, 
            asset.FEATURE, asset.SERIES, dependency.NAME AS ACQUISITION_DEPENDENCY, asset.ENTRY_DATE AS ENTRY_DATE,
            asset.CURRENT_CUSTODIAN AS CURRENT_CUSTODIAN
            FROM ASSET AS asset
                LEFT JOIN CATEGORY AS category ON category.ID = asset.CATEGORY_ID
                LEFT JOIN BRAND AS brand ON brand.ID = asset.BRAND_ID
                LEFT JOIN DEPENDENCY AS dependency ON dependency.ID = asset.ACQUISITION_DEPENDENCY_ID
                LEFT JOIN LOCATION AS location ON location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID
                INNER JOIN COMPUTER AS computer on computer.ASSET_KEY = asset.ASSET_KEY
            WHERE asset.ASSET_KEY = ?`
            ,[request.params.id]
        );
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getComputerById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el computador'});
    }
}

exports.insertComputer = async (request, response) => {
    try{
        const {assetKey, categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId, position, borrowed, ip, operativeSystem} = request.body;
        const [assetResponse] = await connection.query(
            'INSERT INTO ASSET VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())',
            [assetKey, categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId, position, borrowed]
        );
        const [computerResponse] = await connection.query(
            'INSERT INTO COMPUTER VALUES(NULL,?,?,?,CURDATE())',
            [assetKey,ip,operativeSystem]
        );
        response.json(computerResponse);
    }catch(error){
        console.log('Error en "insertComputer()" controller\n',error);
        if(error.errno == 1062){
            duplicateField = error.sqlMessage.split(' ');
            msg = duplicateField[5].includes('IP')
            ? `La ip ${duplicateField[2]} ya está asignada a otro dispositivo. Ingrese una diferente`
            : `El código de bien ${duplicateField[2]} ya existe. Ingrese uno diferente`

            response.status(500).json({error: msg});
        } else {
            response.status(500).json({error: 'Error al intentar insertar el computador'});
        }
    }
}

exports.updateComputer = async (request, response) => {
    try{
        const {categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId, position, borrowed, ip, operativeSystem} = request.body;
        const assetKey = request.params.id
        const [assetResponse]  = await connection.query(
            `UPDATE ASSET
                SET CATEGORY_ID = ?, NAME = ?, BRAND_ID = ?,
                MODEL = ?, FEATURE = ?, SERIES = ?, ACQUISITION_DEPENDENCY_ID = ?,
                ENTRY_DATE = ?, CURRENT_CUSTODIAN = ?, LOCATION_ID = ?,
                POSITION = ?, BORROWED = ?  
            WHERE ASSET_KEY = ?`,
            [categoryId, name, brandId, model, 
            feature, series, acquisitionDependencyId, entryDate, 
            currentCustodian, locationId, position, borrowed, assetKey]
        );
        const [computerComponentResponse]  = await connection.query(
            `UPDATE ASSET
                SET  LOCATION_ID = ?   
            WHERE ASSET_KEY IN (
                SELECT ASSET_KEY 
                FROM COMPUTER_COMPONENT
                WHERE ASSET_KEY IS NOT NULL
                AND COMPUTER_ID = (
                    SELECT ID 
                    FROM COMPUTER
                    WHERE ASSET_KEY = ?
                )
            )`,
            [locationId, assetKey]
        );
        const [computerResponse]  = await connection.query(
            `UPDATE COMPUTER
                SET IP = ?, OPERATIVE_SYSTEM = ?  
            WHERE ASSET_KEY = ?`,
            [ip, operativeSystem, assetKey]
        );
        response.json(computerResponse);
    }catch(error){
        console.log('Error en "updateComputer()" controller\n',error);
        if(error.errno == 1062){
            duplicateField = error.sqlMessage.split(' ');
            msg = duplicateField[5].includes('IP')
            ? `La ip ${duplicateField[2]} ya está asignada a otro dispositivo. Ingrese una diferente`
            : `El código de bien ${duplicateField[2]} ya existe. Ingrese uno diferente`

            response.status(500).json({error: msg});
        } else {
            response.status(500).json({error: 'Error al intentar actualizar el computador'});
        }
    }
}

exports.deleteComputer = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM ASSET WHERE ASSET_KEY = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteComputer()" controller\n',error);
        response.status(500).json({error: 'Error al intentar eliminar el computador'});
    }
}