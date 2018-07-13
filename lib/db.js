var settings = require("../etc/settings"),
    mysql = require("./mysql");
module.exports = mysql.createPool(settings.mysql);