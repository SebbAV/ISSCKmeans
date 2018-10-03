/**
 * This is an example of a new route, it includes a basic post
 */
var express = require('express');
var router = express.Router();
var responseHelper = require('../../../helpers/response.helper');

router.post('/', function (req, res) {
    var credentials = req.body;
    if (!credentials.email || !credentials.password || !credentials.nick) {
        responseHelper.respond(res, 400, 'Bad request. The request was missing some parameters.');
        return;
    }
    //insert promise...
    responseHelper.respond(res, 200, "Inserted Correctly", "Welcome to kmeans API");

});
router.get('/', function (req, res, next) {
    responseHelper.respond(res, 200, "Wohoo!", "Welcome to kmeans API");
});



module.exports = router;