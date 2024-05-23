const connection = require('../databaseConnection');

exports.getComputerComponents = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT computer_component.ID, computer_component.ASSET_KEY,
            CASE 
                WHEN computer_component.ASSET_KEY IS NOT NULL THEN (
                    SELECT NAME 
                    FROM ASSET 
                    WHERE ASSET_KEY = computer_component.ASSET_KEY
                )
                ELSE computer_component.NAME
            END AS NAME,
            building.NAME AS BUILDING, location.NAME AS LOCATION, computer_component.POSITION,
            CASE 
                WHEN computer_component.STATUS = 0 THEN 'INACTIVO'
                ELSE 'ACTIVO'
            END AS STATUS
            FROM COMPUTER_COMPONENT AS computer_component
                LEFT JOIN ASSET AS asset ON asset.ASSET_KEY = computer_component.ASSET_KEY
                LEFT JOIN LOCATION AS location ON location.ID = computer_component.LOCATION_ID 
                    OR location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID`
        );
        response.json(data);
    }catch(error){
        console.log('Error en "getComputerComponents()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los Componentes del Computador'});
    }
}

exports.getComputerComponentById = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT computer_component.ID, computer_component.ASSET_KEY,
            CASE 
                WHEN computer_component.ASSET_KEY IS NOT NULL THEN (
                    SELECT NAME 
                    FROM ASSET 
                    WHERE ASSET_KEY = computer_component.ASSET_KEY
                )
                ELSE computer_component.NAME
            END AS NAME,
            building.NAME AS BUILDING, location.NAME AS LOCATION, computer_component.POSITION,
            CASE 
                WHEN computer_component.STATUS = 0 THEN 'INACTIVO'
                ELSE 'ACTIVO'
            END AS STATUS
            FROM COMPUTER_COMPONENT AS computer_component
                LEFT JOIN ASSET AS asset ON asset.ASSET_KEY = computer_component.ASSET_KEY
                LEFT JOIN LOCATION AS location ON location.ID = computer_component.LOCATION_ID 
                    OR location.ID = asset.LOCATION_ID
                LEFT JOIN BUILDING AS building ON building.ID = location.BUILDING_ID
            WHERE computer_component.ID = ?`,
            [request.params.id]
        );
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getComputerComponentById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el Componente del Computador'});
    }
}

exports.insertComputerComponent = async (request, response) => {
    try{
        const{computerId, assetKey, name, isCase, locationId, position, status} = request.body;
        const [dbResponse] = await connection.query(
            'INSERT INTO COMPUTER_COMPONENT VALUES(NULL,?,?,?,?,?,?,?,CURDATE())',
            [computerId, assetKey, name, isCase, locationId, position, status]
        );
        response.json(dbResponse);
    }catch(error){
        if(error.errno == 1062){
            duplicateField = error.sqlMessage.split(' ');
            response.status(500).json({error: `El componente de código ${duplicateField[2]} ya está asignado a otro computador. Ingrese uno diferente`});
        } else {
            console.log('Error en "insertComputerComponent()" controller\n',error);
            response.status(500).json({error: 'Error al intentar insertar el Componente del Computador'});
        }
    }
}

exports.updateComputerComponent = async (request, response) => {
    try{
        const{assetKey, name, isCase, locationId, position, status} = request.body;
        const id = request.params.id;
        const [dbResponse] = await connection.query(
            `UPDATE COMPUTER_COMPONENT
                SET ASSET_KEY = ?, NAME = ?, IS_CASE = ?, LOCATION_ID = ?,
                POSITION = ?, STATUS = ?
             WHERE ID = ?`,
            [assetKey, name, isCase, locationId, position, status, id]
        );
        response.json(dbResponse);
    }catch(error){
        if(error.errno == 1062){
            duplicateField = error.sqlMessage.split(' ');
            response.status(500).json({error: `El componente de código ${duplicateField[2]} ya está asignado a otro computador. Ingrese uno diferente`});
        } else {
            console.log('Error en "updateComputerComponent()" controller\n',error);
            response.status(500).json({error: 'Error al intentar actualizar el Componente del Computador'});
        }
    }
}

exports.deleteComputerComponent = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM COMPUTER_COMPONENT WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteComputerComponent()" controller\n',error);
        response.status(500).json({error: 'Error al intentar eliminar el Componente del Computador'});
    }
}