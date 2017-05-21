var Database = require('./database')

function query(str, api, response) {
    res = response;
    console.log('start a tweets search');
    Database.isInDatabase(str, api, 
        function(key_id, result, dbData){
            if (result.length != 0) Database.add(result, function(){});
            result.unshift(0, 0);
            Array.prototype.splice.apply(dbData, result);
            res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
            console.log('send data to view');
            var resObject = {tweets:dbData};
            res.end(JSON.stringify(resObject));
        });
}

exports.query = query;


