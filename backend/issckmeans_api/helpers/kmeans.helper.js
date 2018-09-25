var documentHelper = require('./document.helper');

function getIrisData() {
    return documentHelper.getIrisDB().then((data) => {
        return data;
    }).catch((error) => {
        return undefined;
    });
}
function kMeans() {
    //Use Promise in order to use .then() and .catch()... PLEASE :)
    return new Promise((resolve, reject) => {
        // resolve(result) if ok
        // reject (error or message) if error
        //Example of promise in document helper
        getIrisData().then(function (data) {
            //WORK HERE WITH DATA
        }).catch((error) => {
            reject(error);
        });
    });
}
module.exports =
    {
        kmeansResolve: function () {
            return kMeans();
        }
    }