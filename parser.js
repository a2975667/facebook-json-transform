/**
 * This Javascript file converts Facebook Friend JSON export into human
 * readable JSON file. Deals with encoding issues when meat with Chinese.
 * 
 */

const utf8 = require('utf8');
var fs = require('fs');

var args = process.argv.slice(2);
if (args.length != 2){
    console.log("Usage: node parser.js Filename Filename")
    process.exit()
}

fs.readFile(__dirname + '/' + args[0], function (err, data) {
    if (err) {
        throw err;
    }

    data = data.toString()
    json = JSON.parse(data)["friends"];

    for (var i = 0; i < json.length; i++) {
        var obj = json[i];
        json[i].name = utf8.decode(json[i].name)
        console.log();
    }

    json = JSON.stringify(json)

    fs.writeFile(args[1], json, function(err) {
        if (err) {
            console.log(err);
        }
    });
});