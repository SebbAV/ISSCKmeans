var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var documentHelper = require('../../../helpers/document.helper');
var kmeansHelper = require('../../../helpers/kmeans.helper');

router.post('/iris', function (req, res, next) {
    var param = req.body;
    if (!param.k) {
        responseHelper.respond(res, 400, "Error", "missing parameters");
        return;
    }
    kmeansHelper.kmeansResolve(param.k).then((data) => {
        responseHelper.respond(res, 200, "iris data", data);
    }).catch((error) => {
        responseHelper.respond(res, 500, "error", error);
    });
});

module.exports = router;