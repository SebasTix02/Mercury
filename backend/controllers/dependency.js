const connection = require('../databaseConnection');

exports.getDependencies = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM DEPENDENCY');
        response.json(data);
    }catch(error){
        console.log('Error en "getDependencies()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener las dependencias'});
    }
}

exports.getDependencyById = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM DEPENDENCY WHERE ID = ?',[request.params.id]);
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getDependencyById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener la dependencia'});
    }
}

exports.insertDependency = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'INSERT INTO DEPENDENCY VALUES(NULL,?,CURDATE())',[request.body.name]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertDependency()" controller\n',error);
        response.status(500).json({error: 'Error al intentar insertar la dependencia'});
    }
}

exports.updateDependency = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'UPDATE DEPENDENCY SET NAME = ? WHERE ID = ?',[request.body.name,request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateDependency()" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar la dependencia'});
    }
}

exports.deleteDependency = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM DEPENDENCY WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteDependency()" controller\n',error);
        response.status(500).json({error: 'Error al intentar eliminar la dependencia'});
    }
}