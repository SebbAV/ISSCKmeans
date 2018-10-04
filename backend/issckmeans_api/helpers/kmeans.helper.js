var documentHelper = require('./document.helper');
var jsonToArrayHelper = require('./jsontoarray.helper');
//Gets the data from the DB (From the txt)
function getIrisData() {
    return documentHelper.getIrisDB().then((data) => {
        return data;
    }).catch((error) => {
        return undefined;
    });
}

//Creates n Number of Centroids
function kCentroidsRan(kNum, xMax, xMin, yMax, yMin) {
    var kCentArr = [];
    xMin = parseInt(xMin);
    yMin = parseInt(yMin);
    for (i = 0; i < kNum; i++) {
        var item1 = Math.floor((Math.random() * (xMax - xMin)) + xMin);
        var item2 = Math.floor((Math.random() * (yMax - yMin)) + yMin);
        var arrayCoords = [item1, item2];
        kCentArr.push(arrayCoords);
    }
    return kCentArr;
}

//Select n Number of Centroids
function kCentroidsRanFromArray(kNum, data) {
    var kCentArr = [];
    for (i = 0; i < kNum; i++) {
        var item1 = data[i][0];
        var item2 = data[i][1];
        var arrayCoords = [item1, item2];
        kCentArr.push(arrayCoords);
    }
    return kCentArr;
}

//Gets the max or min values of the column selected
function getMaxOrMin(data, maxMin, position) {
    var valor = data[0][position];
    if (maxMin == "max") {
        //Get the Max
        for (var i = 0; i < data.length; i++) {
            if (valor < data[i][position]) {
                valor = data[i][position];
            }
        }
    } else if (maxMin == "min") {
        //Get the Min
        for (var i = 0; i < data.length; i++) {
            if (valor > data[i][position]) {
                valor = data[i][position];
            }
        }
    } else {
        //Error when not selecting max or min
        valor = NaN;
    }
    return valor
}

//It gets the groups and change the centroid it represent with the average, returns an array of the new Centroids
function changeMeanOfGroup(solvedData, kCentR) {
    //Arrey of groups to get the mean
    var x = 0;
    var y = 0;
    var newKCentr = [];
    var first = false;
    for (var i = 0; i < kCentR.length; i++) {
        var tempCentr = [];
        for (var j = 0; j < solvedData.length; j++) {
            if (solvedData[j][2] == i) {
                if (first != true) {
                    x = solvedData[j][0];
                    y = solvedData[j][1];
                    first = true;
                } else {
                    x = (x + solvedData[j][0]) / 2;
                    y = (y + solvedData[j][1]) / 2;
                }
            }
        }
        tempCentr.push(x);
        tempCentr.push(y);
        newKCentr.push(tempCentr);
        x = 0;
        y = 0;
        first = false;
    }
    return newKCentr;
}

//It will change the group that belongs to the coords with the Centroid
function joinTheGroupItBelogs(data, kCentR) {
    var solvedData = [];
    for (var i = 0; i < data.length; i++) {
        var arrOfDist = [];
        var itemSolvedData = [];
        for (var j = 0; j < kCentR.length; j++) {
            dist = Math.sqrt((Math.pow(kCentR[j][0] - data[i][0], 2)) + (Math.pow(kCentR[j][1] - data[i][1], 2)));
            arrOfDist.push(dist);
        }
        var minVal = Math.min.apply(null, arrOfDist);
        var posMinVal = arrOfDist.indexOf(minVal);
        itemSolvedData.push(parseFloat(data[i][0]));
        itemSolvedData.push(parseFloat(data[i][1]));
        itemSolvedData.push(posMinVal);
        solvedData.push(itemSolvedData);
    }
    return solvedData;
}

//Get the distance of each point and assign it centroid
function solvedDataWithCentroids(kCentR, data) {
    var solvedData = [];
    //Get the distance between the data and the centroids and add the number of the centroid
    for (var i = 0; i < data.length; i++) {
        var arrOfDist = [];
        var itemSolvedData = [];
        for (var j = 0; j < kCentR.length; j++) {
            dist = Math.sqrt((Math.pow(kCentR[j][0] - data[i][0], 2)) + (Math.pow(kCentR[j][1] - data[i][1], 2)));
            arrOfDist.push(dist);
        }
        var minVal = Math.min.apply(null, arrOfDist);
        var posMinVal = arrOfDist.indexOf(minVal);
        itemSolvedData.push(parseFloat(data[i][0]));
        itemSolvedData.push(parseFloat(data[i][1]));
        itemSolvedData.push(posMinVal);
        solvedData.push(itemSolvedData);
    }
    for (var i = 0; i < 10; i++) {
        //Get the mean of all the items of the Data with the same Centroid to change the value of the Centroid
        kCentR = changeMeanOfGroup(solvedData, kCentR);
        //Change the group it belongs to with the new Centroids
        solvedData = joinTheGroupItBelogs(solvedData, kCentR);
    }
    solvedData.push(kCentR);

    return solvedData;
}

//Main fuction that gets all the data and returns the data grouped with their respective centroid
function kMeans(kNum) {
    //Use Promise in order to use .then() and .catch()...
    return new Promise((resolve, reject) => {
        // resolve(result) if ok
        // reject (error or message) if error
        getIrisData().then((data) => {
            data = jsonToArrayHelper.jsonToArray(data);
            if (kNum >= 0) {
                //This for random Centroids
                //var xMax = getMaxOrMin(data, "max", 0);
                //var xMin = getMaxOrMin(data, "min", 0);
                //var yMax = getMaxOrMin(data, "max", 1);
                //var yMin = getMaxOrMin(data, "min", 1);
                //var kCentR = kCentroidsRan(kNum, xMax, xMin, yMax, yMin);
                var kCentR = kCentroidsRanFromArray(kNum, data);
                var processedData = solvedDataWithCentroids(kCentR, data)
                resolve(processedData);
            } else {
                //Send error of not valid number of K's
                reject("numOfKsNotValid " + kNum)
            }
        }).catch((error) => {
            reject(error);
        });
    });
}
module.exports =
    {
        kmeansResolve: function (k) {
            return kMeans(k);
        }
    }