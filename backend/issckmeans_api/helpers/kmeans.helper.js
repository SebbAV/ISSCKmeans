
var documentHelper = require('./document.helper');
const kmeans = require('node-kmeans');
function getIrisData() {
    return documentHelper.getIrisDB().then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
}
function kMeans() {
    return new Promise((resolve, reject) => {
        getIrisData().then(function (data) {
            let vectors = new Array();
            for (let i = 0; i < data.length; i++) {
                vectors[i] = [data[i]['sepal_length'], data[i]['sepal_width'], data[i]['petal_length'], data[i]['petal_width']];
            }
            kmeans.clusterize(vectors, { k: 4 }, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
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