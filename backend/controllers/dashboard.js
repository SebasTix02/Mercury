const connection = require('../databaseConnection');

exports.getDashboardInfo = async (request, response) => {
    dashboardInfo = {}
    try{
        dashboardInfo = {
            assetsCount: {
                title: "Total de Bienes",
                values: await getAssetsCount()
            },
            commonAssetsCount:{
                title: "Total Bienes Comunes",
                values: await getCommonAssetsCount()
            },
            computersCount:{
                title: "Total Computadores",
                values: await getComputersCount()
            },
            softwareCount:{
                title: "Total Software",
                values: await getSoftwareCount()
            },
            usersCount:{
                title: "Total Usuarios",
                values: await getUsersCount()
            },
            countByCategory:{
                title: "Total de Bienes por Categoría",
                values: await getCountByCategory()
            },
            countByBrand:{
                title: "Total de Bienes por Marca",
                values: await getCountByBrand()
            },
            countByLocation:{
                title: "Total de Bienes por Ubicación",
                values: await getCountByLocation()
            },
            countByBuilding:{
                title: "Total de Bienes por Bloque",
                values: await getCountByBuilding()
            },
            countByAge:{
                title: "Total de Bienes por Edad",
                values: await getCountByAge()
            },
            countByCaseComponent:{
                title: "Total de Bienes Componentes",
                values: await getCountByCaseComponent()
            },
            countByLicense:{
                title: "Total de Software por Licencia",
                values: await getCountByLicense()
            },
            countByCustodian:{
                title: "Bienes Asignados por Custodio",
                values: await getCountByCustodian()
            },
            countByDependency:{
                title: "Total de Bienes por Dependencia",
                values: await getCountByDependency()
            },
            countByYear:{
                title: "Bienes Adquiridos Anualmente",
                values: await getCountByYear()
            },
            countByMonth:{
                title: "Bienes Adquiridos este Año Mensualmente",
                values: await getCountByMonth()
            }
        }
        
    }catch(error){
        console.log("No se pudo crear el objeto respuesta.\nFinalizando Proceso");
        response.status(500).json({error: error.message});
        return
    }
    
    response.status(200).json(dashboardInfo);
}

async function getAssetsCount(){
    try{
        const [data] = await connection.query(
            `SELECT COUNT(ASSET_KEY) AS GENERAL_ASSETS_COUNT
            FROM ASSET;`
        );
        return data[0].GENERAL_ASSETS_COUNT
    }catch(error){
        console.error('Error en "getAssetsCount()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes');
    }
}

async function getCommonAssetsCount(){
    try{
        const [data] = await connection.query(
            `SELECT COUNT(ASSET_KEY) AS COMMON_ASSETS_COUNT
            FROM ASSET
            WHERE ASSET.ASSET_KEY NOT IN (
                SELECT ASSET_KEY
                FROM COMPUTER
            );`
        );
        return data[0].COMMON_ASSETS_COUNT
    }catch(error){
        console.error('Error en "getCommonAssetsCount()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes Comunes');
    }
}

async function getComputersCount(){
    try{
        const [data] = await connection.query(
            `SELECT COUNT(ASSET_KEY) AS COMPUTERS_COUNT
            FROM ASSET
            WHERE ASSET.ASSET_KEY IN (
                SELECT ASSET_KEY
                FROM COMPUTER
            );`
        );
        return data[0].COMPUTERS_COUNT
    }catch(error){
        console.error('Error en "getComputersCount()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Computadores');
    }
}

async function getSoftwareCount(){
    try{
        const [data] = await connection.query(
            `SELECT COUNT(ID) AS SOFTWARE_COUNT
            FROM SOFTWARE;`
        );
        return data[0].SOFTWARE_COUNT
    }catch(error){
        console.error('Error en "getSoftwareCount()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Software');
    }
}

async function getUsersCount(){
    try{
        const [data] = await connection.query(
            `SELECT COUNT(ID) AS USERS_COUNT
            FROM USER;`
        );
        return data[0].USERS_COUNT
    }catch(error){
        console.error('Error en "getUsersCount()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Usuarios');
    }
}

async function getCountByCategory(){
    try{
        const [data] = await connection.query(
            `SELECT category.NAME AS TAG, COUNT(asset.ASSET_KEY) AS COUNT
            FROM ASSET AS asset, CATEGORY AS category
            WHERE asset.CATEGORY_ID = category.ID
            GROUP BY asset.CATEGORY_ID
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByCategory()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Categoría');
    }
}

async function getCountByBrand(){
    try{
        const [data] = await connection.query(
            `SELECT brand.NAME AS TAG, COUNT(asset.ASSET_KEY) AS COUNT
            FROM ASSET AS asset, BRAND AS brand
            WHERE asset.BRAND_ID = brand.ID
            GROUP BY asset.BRAND_ID
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByBrand()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Marca');
    }
}

async function getCountByLocation(){
    try{
        const [data] = await connection.query(
            `SELECT location.NAME AS TAG, COUNT(asset.ASSET_KEY) AS COUNT
            FROM ASSET AS asset, LOCATION AS location
            WHERE asset.LOCATION_ID = location.ID
            GROUP BY asset.LOCATION_ID
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByLocation()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Ubicación');
    }
}

async function getCountByBuilding(){
    try{
        const [data] = await connection.query(
            `SELECT building.NAME AS TAG, COUNT(asset.ASSET_KEY) AS COUNT
            FROM ASSET AS asset, LOCATION AS location, BUILDING AS building
            WHERE asset.LOCATION_ID = location.ID
            AND location.BUILDING_ID = building.ID
            GROUP BY building.ID
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByBuilding()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Bloque');
    }
}

// La función devuelve el número de bienes cuya edad es mayor o igual a 5 años y menor o igual a 10
async function getCountByAge(){
    try{
        const [data] = await connection.query(
            `SELECT TIMESTAMPDIFF(YEAR, asset.ENTRY_DATE, CURDATE()) AS TAG, COUNT(ASSET_KEY) AS COUNT
            FROM ASSET
            WHERE TIMESTAMPDIFF(YEAR, asset.ENTRY_DATE, CURDATE()) >= 5 
            AND TIMESTAMPDIFF(YEAR, asset.ENTRY_DATE, CURDATE()) <= 10
            GROUP BY TAG
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByAge()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Antiguedad');
    }
}

async function getCountByCaseComponent(){
    try{
        const [data] = await connection.query(
            `SELECT NAME AS TAG, COUNT(ASSET_KEY) AS COUNT
            FROM ASSET
            WHERE NAME IN ('RAM','DISCO','PROCESADOR','TARJETA GRÁFICA')
            GROUP BY NAME
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByCaseComponent()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Componentes de Gabinete');
    }
}

async function getCountByLicense(){
    try{
        const [data] = await connection.query(
            `SELECT LICENSE AS TAG, COUNT(ID) AS COUNT
            FROM SOFTWARE
            GROUP BY LICENSE
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByLicense()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Software por Licencia');
    }
}

async function getCountByCustodian(){
    try{
        const [data] = await connection.query(
            `SELECT CURRENT_CUSTODIAN AS TAG, COUNT(ASSET_KEY) AS COUNT
            FROM ASSET
            GROUP BY CURRENT_CUSTODIAN
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByCustodian()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Custodio');
    }
}

async function getCountByDependency(){
    try{
        const [data] = await connection.query(
            `SELECT dependency.NAME AS TAG, COUNT(asset.ASSET_KEY) AS COUNT
            FROM ASSET AS asset, DEPENDENCY AS dependency
            WHERE asset.ACQUISITION_DEPENDENCY_ID = dependency.ID
            GROUP BY asset.ACQUISITION_DEPENDENCY_ID 
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByDependency()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Dependencia');
    }
}

// Número de Bienes Adquiridos por Año
async function getCountByYear(){
    try{
        const [data] = await connection.query(
            `SELECT YEAR(ENTRY_DATE) AS TAG, COUNT(ASSET_KEY) AS COUNT
            FROM ASSET
            GROUP BY TAG
            ORDER BY COUNT DESC;`
        );
        return data
    }catch(error){
        console.error('Error en "getCountByYear()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Año de Adquisición');
    }
}

// Número de Bienes Adquiridos por Mes en el Año Actual
async function getCountByMonth(){
    try{
        const [data] = await connection.query(
            `SET lc_time_names = 'es_ES'\;
            SELECT DATE_FORMAT(ENTRY_DATE, '%M')  AS TAG, COUNT(ASSET_KEY) AS COUNT
            FROM ASSET
            WHERE YEAR(ENTRY_DATE) = YEAR(CURDATE())
            GROUP BY TAG
            ORDER BY COUNT DESC;`
        );
        return data[1]
    }catch(error){
        console.error('Error en "getCountByMonth()" controller\n',error);
        throw new Error('Error al intentar obtener el total de Bienes por Mes de Adquisición');
    }
}