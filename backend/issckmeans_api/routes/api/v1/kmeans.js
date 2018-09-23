var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var documentHelper = require('../../../helpers/document.helper');

router.get('/', function (req, res, next) {
    documentHelper.getIrisDB().then(function (data) {
        responseHelper.respond(res, 200, "iris data", data);
    }).catch(function (error) {
        responseHelper.respond(res, 500, "Error", error);
    })
    
});

module.exports = router;