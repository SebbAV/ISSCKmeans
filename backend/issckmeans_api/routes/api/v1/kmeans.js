var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');
var kmeansHelper = require('../../../helpers/kmeans.helper');
var pythonShellHelper = require('../../../helpers/pytonshell.helper');

router.post('/iris', function (req, res, next) {
    var param = req.body;
    if (!param.k || !param.opt) {
        responseHelper.respond(res, 400, "Error", "missing parameters");
        return;
    }
    switch (parseInt(param.opt)) {
        case 1:
            kmeansHelper.kmeansResolve(param.k).then((data) => {
                responseHelper.respond(res, 200, "iris data", data);
            }).catch((error) => {
                responseHelper.respond(res, 500, "error", error);
            });
            break;
        case 2:
            pythonShellHelper.resolveKmeansImage(param.k).then((data) => {
                responseHelper.respond(res, 200, "image data", data);
            }).catch((err) => {
                responseHelper.respond(res, 500, "error", err);
            })
            break;
    }

});

module.exports = router;