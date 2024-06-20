const connection = require('../databaseConnection');

exports.getSoftware = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM SOFTWARE');
        response.json(data);
    }catch(error){
        console.log('Error en "getSoftware()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el software'});
    }
}

exports.getSoftwareById = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM SOFTWARE WHERE ID = ?',[request.params.id]);
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getSoftwareById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el software'});
    }
}

exports.insertSoftware = async (request, response) => {
    try{
        const{name,version,license,licenseDuration,labType,description,entryDate} = request.body;
        const [dbResponse] = await connection.query(
            'INSERT INTO SOFTWARE VALUES(NULL,?,?,?,?,?,?,?,CURDATE())',
            [name,version,license,licenseDuration,labType,description,entryDate]
        );
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertSoftware()" controller\n',error);
        response.status(500).json({error: 'Error al intentar insertar el software'});
    }
}

exports.updateSoftware = async (request, response) => {
    try{
        const{name,version,license,licenseDuration,labType,description,entryDate} = request.body;
        const id = request.params.id;
        const [dbResponse] = await connection.query(
            `UPDATE SOFTWARE 
                SET NAME = ?, VERSION = ?, LICENSE = ?, LICENSE_DURATION = ?,
                LAB_TYPE = ?, DESCRIPTION = ?, ENTRY_DATE = ? 
             WHERE ID = ?`,
            [name,version,license,licenseDuration,labType,description,entryDate,id]
        );
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateSoftware()" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar el software'});
    }
}

exports.deleteSoftware = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM SOFTWARE WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteSoftware()" controller\n',error);
        response.status(500).json({error: 'Error al intentar eliminar el software'});
    }
}