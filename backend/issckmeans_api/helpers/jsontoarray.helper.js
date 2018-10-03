function numKeys(obj) {
    var count = 0;
    for (var prop in obj) {
        count++;
    }
    return count;
}
module.exports =
    {
        jsonToArray: function (object) {
            if (!object) {
                return object;
            } else {
                var cont = 0;
                object.map((obj) => {
                    object[cont] = Object.keys(obj).map((key) => {
                        return obj[key];
                    });
                    cont++;
                });
                return object;
            }
        }
    }