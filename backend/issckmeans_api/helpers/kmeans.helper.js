var documentHelper = require('./document.helper');

function getIrisData() {
    var irisdata = [];
    return documentHelper.getIrisDB().then((data) => {
        irisdata = data;
    }).catch((error) => {
        irisdata = undefined;
    });
}
function kMeans() {
    //Use Promise in order to use .then() and .catch()... PLEASE :)
    return new Promise((resolve, reject) => {
        var data = getIrisData();
        // resolve(result) if ok
        // reject (error or message) if error
        //Example of promise in document.helper
    });
}
module.exports =
    {
        kmeansResolve: function () {
            return kMeans();
        }
    }