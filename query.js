var Database = require('./database')

function resp(result, dbData, res, key_id) {
    Database.getStatic(key_id, 7, function(rows){
        var statictics = []
        for (i in rows) {
            var sta = {}
            sta.date = rows[i].date
            sta.value = rows[i].num
            statictics.push(sta)
            //statictics[rows[i].date] = rows[i].num
        }

        result.unshift(0, 0);
        Array.prototype.splice.apply(dbData, result);

        var resObject = {'tweets':dbData, 'statictics':statictics};
        res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
        res.end(JSON.stringify(resObject));
        console.log('send data to view');
    })
}

/**
 * start a query
 * @param  {string} query word
 * @param  {string} whether only query in DB
 * @param  {object} the respond of serve
 */
 function query(str, api, response) {
    res = response;
    console.log('start a tweets search');
    Database.isInDatabase(str, api, 
        function(key_id, result, dbData){
            //add tweets to DB
            if (result.length != 0) {
                Database.add(result, function(){
                    resp(result, dbData, res, key_id)
                });
            } else {
                resp(result, dbData, res, key_id)
            }
        });
}

exports.query = query;


