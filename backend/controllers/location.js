const connection = require('../databaseConnection');

exports.getLocations = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT location.ID AS ID, building.NAME AS NAME, location.NAME AS BUILDING
            FROM LOCATION AS location, BUILDING AS building
            WHERE location.BUILDING_ID = building.ID
            ORDER BY location.ID`
        );
        response.json(data);
    }catch(error){
        console.log('Error en "getLocations()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener las ubicaciones'});
    }
}

exports.getLocationById = async (request, response) => {
    try{
        const [data] = await connection.query(
            `SELECT location.ID AS ID, building.NAME AS NAME, location.NAME AS BUILDING
            FROM LOCATION AS location, BUILDING AS building
            WHERE location.BUILDING_ID = building.ID
            AND location.ID = ?`,
            [request.params.id]
        );
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getLocationById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener la ubicación'});
    }
}

exports.insertLocation = async (request, response) => {
    try{
        const {name, buildingId} = request.body;
        const [dbResponse] = await connection.query(
            'INSERT INTO LOCATION VALUES(NULL,?,?,CURDATE())',[name, buildingId]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertLocation()" controller\n',error);
        response.status(500).json({error: 'Error al intentar insertar la ubicación'});
    }
}

exports.updateLocation = async (request, response) => {
    try{
        const {name, buildingId} = request.body;
        const id = request.params.id;
        const [dbResponse] = await connection.query(
            'UPDATE LOCATION SET NAME = ?, BUILDING_ID = ? WHERE ID = ?',[name,buildingId,id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateLocation()" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar la ubicación'});
    }
}

exports.deleteLocation = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM LOCATION WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteLocation()" controller\n',error);
        if(error.errno == 1451){
            response.status(500).json({error: 'No se puede eliminar el registro porque ya aparece en otras tablas'});
        } else {
            response.status(500).json({error: 'Error al intentar eliminar la ubicación'});
        }
    }
}