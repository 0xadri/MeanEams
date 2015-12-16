var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: "mongodb://localhost/multivision",
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: "mongodb://adrien:test@ds053954.mongolab.com:53954/multivision",
        port: process.env.PORT || 80
    }
}