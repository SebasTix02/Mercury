const connection = require('../databaseConnection');

exports.getBuildings = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM BUILDING');
        response.json(data);
    }catch(error){
        console.log('Error en "getBuildings()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los bloques'});
    }
}

exports.getBuildingById = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM BUILDING WHERE ID = ?',[request.params.id]);
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getBuildingById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el bloque'});
    }
}

exports.insertBuilding = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'INSERT INTO BUILDING VALUES(NULL,?,CURDATE())',[request.body.name]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertBuilding()" controller\n',error);
        response.status(500).json({error: 'Error al intentar insertar el bloque'});
    }
}

exports.updateBuilding = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'UPDATE BUILDING SET NAME = ? WHERE ID = ?',[request.body.name,request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateBuilding()" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar el bloque'});
    }
}

exports.deleteBuilding = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM BUILDING WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteBuilding()" controller\n',error);
        if(error.errno == 1451){
            response.status(500).json({error: 'No se puede eliminar el registro porque ya aparece en otras tablas'});
        } else {
            response.status(500).json({error: 'Error al intentar eliminar el bloque'});
        }
    }
}