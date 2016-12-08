/**
 * Created by Jbt on 12/8/2016.
 */
var fs = require('fs');

function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        let fileData = [];
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) throw err;

            fileData = JSON.parse(data);
            resolve(fileData);
        });
    });
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, JSON.stringify(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = {readFile: readFile, writeToFile: writeToFile};
