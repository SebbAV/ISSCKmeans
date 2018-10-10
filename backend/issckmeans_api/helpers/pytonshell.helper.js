var PythonShell = require('python-shell');
var opt =
{
    scriptPath: __dirname + "../../scripts/",
    args: []
}
function resolveKmeansImage(k) {
    opt.args.push(JSON.stringify(k));
    return new Promise((resolve, reject) => {
        PythonShell.run('kmeans.py', opt, (err, res) => {
            opt.args = []
            if (err) {
                reject(err);
            }
            else {
                console.log(res);
                resolve(res);
            }
        });
    });

}

module.exports =
    {
        resolveKmeansImage: function (k) {
            return resolveKmeansImage(k);
        }
    }