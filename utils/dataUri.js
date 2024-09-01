const dataUri = require('datauri/parser');
const path = require('path');

const dUri = new dataUri();

const getDataUri = (file) => {
    const pathExt = path.extname(file.originalname).toString();
    return dUri.format(pathExt, file.buffer);

    
}


module.exports = getDataUri;