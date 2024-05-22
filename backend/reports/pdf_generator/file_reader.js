const fs = require('fs').promises;

exports.readCssStyles = async (cssFileDir) => {
    try {
        return await fs.readFile(cssFileDir, 'utf8');
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
    }
}