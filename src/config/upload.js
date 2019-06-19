const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v1');


module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(req, file, callback) {
            const [name, ext] = file.originalname.split('.');
            callback(null, `${uuid()}.${ext}`);
        }
    }),
};