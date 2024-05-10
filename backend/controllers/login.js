const connection = require('../databaseConnection');

exports.validateCredentials = async (request, response) => {
    try{
        const {username, password} = request.body;
        const [data] = await connection.query(
            'SELECT ID_NUMBER, FIRST_NAME, LASTNAME FROM USER WHERE EMAIL = ? AND PASSWORD = ?',
            [username,password]);
        if(data.length == 0){
            response.status(500).json({error: 'Credenciales Incorrectas'});
        } else {
            response.json(data[0]);
        }
    }catch(error){
        console.log('Error en "validateCredentials()" controller\n',error);
        response.status(500).json({error: 'Error al intentar iniciar sesión'});
    }
}