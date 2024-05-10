const connection = require('../databaseConnection');

exports.getBrands = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM BRAND');
        response.json(data);
    }catch(error){
        console.log('Error en "getBrands()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener las marcas'});
    }
}

exports.getBrandById = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM BRAND WHERE ID = ?',[request.params.id]);
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getBrandById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener la marca'});
    }
}

exports.insertBrand = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'INSERT INTO BRAND VALUES(NULL,?,CURDATE())',[request.body.name]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertBrand()" controller\n',error);
        response.status(500).json({error: 'Error al intentar insertar la marca'});
    }
}

exports.updateBrand = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'UPDATE BRAND SET NAME = ? WHERE ID = ?',[request.body.name,request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateBrand()" controller\n',error);
        response.status(500).json({error: 'Error al intentar actualizar la marca'});
    }
}

exports.deleteBrand = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM BRAND WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteBrand()" controller\n',error);
        if(error.errno == 1451){
            response.status(500).json({error: 'No se puede eliminar el registro porque ya aparece en otras tablas'});
        } else {
            response.status(500).json({error: 'Error al intentar eliminar la marca'});
        }
    }
}