var Database = require('./database')

var res;

function resp(key_id, result, dbData) {
    Database.add(result);
    result.unshift(0, 0);
    Array.prototype.splice.apply(dbData, result);
    res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
    console.log('send data to view');
    var resObject = {tweets:dbData};
    res.end(JSON.stringify(resObject));
}

function query(str, api, response) {
    res = response;
    console.log('start a tweets search');
    Database.isInDatabase(str, api, resp);
}

exports.query = query;


