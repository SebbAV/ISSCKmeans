let Parser = require('text2json').Parser
var fs = require('fs');
function getIrisDB() {
    return new Promise((resolve, reject) => {
        fs.readFile('./resources/iris.txt', function (error, data) {
            if (error) {
                reject(error)
            } else {
                resolve(data.toString());
            }
        });
    });

}

function readIrisDB() {
    return new Promise((resolve, reject) => {
        getIrisDB().then(function (db) {
            let parse = new Parser({ hasHeader: true })
            parse.text2json(db, (err, data) => {
                if (err) {
                    reject(err)
                } else {

                    resolve(data)
                }
            });
        }).catch(function (error) {
            reject(error);
        })
    });
}
module.exports =
    {
        getIrisDB() {
            return readIrisDB();
        }
    }