const connection = require('../databaseConnection');

exports.getCategories = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM CATEGORY');
        response.json(data);
    }catch(error){
        console.log('Error en "getCategories()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener las categorias'});
    }
}

exports.getCategoryById = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM CATEGORY WHERE ID = ?',[request.params.id]);
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getCategoryById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener la categoría'});
    }
}

exports.insertCategory = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'INSERT INTO CATEGORY VALUES(NULL,?,CURDATE())',[request.body.name]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertCategory()" controller\n',error);
        response.status(500).json({error: 'Error al intentar insertar la categoría'});
    }
}

exports.updateCategory = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'UPDATE CATEGORY SET NAME = ? WHERE ID = ?',[request.body.name,request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateCategory()" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar la categoría'});
    }
}

exports.deleteCategory = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM CATEGORY WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteCategory()" controller\n',error);
        if(error.errno == 1451){
            response.status(500).json({error: 'No se puede eliminar el registro porque ya aparece en otras tablas'});
        } else {
            response.status(500).json({error: 'Error al intentar eliminar la categoría'});
        }
    }
}