const connection = require('../databaseConnection');

exports.getUsers = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM USER');
        response.json(data);
    }catch(error){
        console.log('Error en "getUsers()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener los usuarios'});
    }
}

exports.getUserById = async (request, response) => {
    try{
        const [data] = await connection.query('SELECT * FROM USER WHERE ID = ?',[request.params.id]);
        response.json(data[0]);
    }catch(error){
        console.log('Error en "getUserById()" controller\n',error);
        response.status(500).json({error: 'Error al intentar obtener el usuario'});
    }
}

exports.insertUser = async (request, response) => {
    try{
        const{idNumber,firstName,middleName,lastname,secondLastname,cellphone,email,password} = request.body;
        const [dbResponse] = await connection.query(
            'INSERT INTO USER VALUES(NULL,?,?,?,?,?,?,?,?,CURDATE())',
            [idNumber,firstName,middleName,lastname,secondLastname,cellphone,email,password]
        );
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "insertUser()" controller\n',error);
        if(error.errno == 1062){
            response.status(500).json({error: 'El correo electrónico proporcionado ya existe'});
        } else {
            response.status(500).json({error: 'Error al intentar insertar el usuario '});
        }
    }
}

exports.updateUser = async (request, response) => {
    try{
        const{idNumber,firstName,middleName,lastname,secondLastname,cellphone,email,password} = request.body;
        const id = request.params.id;
        const [dbResponse] = await connection.query(
            `UPDATE USER 
                SET ID_NUMBER = ?, FIRST_NAME = ?, MIDDLE_NAME = ?, LASTNAME = ?,
                SECOND_LASTNAME = ?, CELLPHONE = ?, EMAIL = ?, PASSWORD = ?
             WHERE ID = ?`,
            [idNumber,firstName,middleName,lastname,secondLastname,cellphone,email,password,id]
        );
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "updateUser()" controller\n',error);
        if(error.errno == 1062){
            response.status(500).json({error: 'El correo electrónico proporcionado ya existe'});
        } else {
            response.status(500).json({error: 'Error al intentar actualizar el usuario '});
        }
    }
}

exports.deleteUser = async (request, response) => {
    try{
        const [dbResponse] = await connection.query(
            'DELETE FROM USER WHERE ID = ?',[request.params.id]);
        response.json(dbResponse);
    }catch(error){
        console.log('Error en "deleteUser()" controller\n',error);
        response.status(500).json({error: 'Error al intentar eliminar el usuario'});
    }
}