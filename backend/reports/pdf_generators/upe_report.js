const dataAccess = require('../data_access');
const assetConverter = require('../asset_converter');

dataAccess.getUpeReportInfo()
.then((data) => {
    if(data.hasOwnProperty('error')){
        console.log("Error: ", data.error);
        return;
    }
    let assets = assetConverter.getEntities(data);
    console.log(assets);
    assets.forEach(cc => {
        console.log(cc);
        cc.components.forEach(casc => {
            console.log(casc);
        });
    });
    return;
})
.catch((error) => {
    console.error('Error al ejecutar la consulta:', error);
});

