var Twitter = require('./twitter');

function newConnection() {
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host : '127.0.0.1', port : '3306', charset : 'utf8mb4',
        user : 'root', password : '', database : 'web',
        multipleStatements:true
    });
    console.log('lets start');
    return connection;
}


function add(data, callback) {

    queryString = 'insert into tb_tweets(key_id, name, screen_name, link_id, icon, date, time, text, tweet_id, coordinates) values ?'
    var valueslist = []
    for (i in data) {
        // queryString += '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())'
        valueslist.push([key_id, data[i].name, data[i].screen_name, data[i].link_id, data[i].icon, 
            data[i].date, data[i].time, data[i].text, data[i].tweet_id, data[i].coordinates])
    }
    connection.query(queryString, [valueslist],
        function(err, rows, fields) {
            if (err) throw err;
            console.log('add ' + data.length + ' tweets to db')
            return callback()
        });
    

}

function getRencentNum(key_id, days, callback) {
    console.log(key_id)
    queryString = 'select count(*) as num, (select count(*) from tb_tweets) as total from tb_tweets where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <=date and key_id = ?';
    connection.query(queryString, [key_id], 
        function(err, rows, fields) {
                if (err) throw err;
                console.log(rows)
                return callback([rows[0].num, rows[0].total]);
            });
}

// function getTweets(str, res) {
//     var queryString = 'select id from tb_keywords where keyword = ?'
//     connection.query(queryString, [str], 
//         function(err, rows, fields) {
//             if (err) throw err;
//             if (rows != null && rows.length > 0) {
//                 var queryString = 'SELECT * FROM tb_tweets WHERE key_id = ? order by tweet_id desc'
//                 var key_id = rows[0]['id']; 
//                 connection.query(queryString, [key_id], 
//                     function(err, rows, fields) {
//                         if (rows != null && rows.length > 0) {
//                             min_id = rows[0].tweet_id;
//                         } else {
//                             rows = [];
//                             min_id = 0;
//                         }

//                         Twitter.getTweets2(str, rows, [], res, 99999999999999999999, min_id, key_id);

//                     });
//             } else {
//                 var queryString = 'insert into tb_keywords (keyword, time) values (?, now())'
//                 connection.query(queryString, [str], 
//                     function(err, rows, fields) {
//                         if (err) throw err;
//                         getTweets(str, res);
//                         //console.log('add to keywords');
//                     });

//             }
//         });
// }



function callAPI (rows, str, key_id, api, callback) {
    if (rows != null && rows.length > 0) {
        min_id = rows[0].tweet_id;
    } else {
        rows = [];
        min_id = 0;
    }
    console.log('find ' + rows.length + ' tweets in db');

    Twitter.getTweetsByAPI(str, rows, [], 99999999999999999999, min_id, key_id, api, callback);

}

function addKeyword (str, api, callback) {
    var queryString = 'insert into tb_keywords (keyword, time) values (?, now())'
    connection.query(queryString, [str], 
        function(err, rows, fields) {
            if (err) throw err;
            console.log('add a new keyword : ' + str);
            isInDatabase(str, api, callback);
        });
}

function getTweetsByDB(rows, str, api, callback) {
    if (rows != null && rows.length > 0) {
        key_id = rows[0]['id']; 
        console.log('keyword_id : ' + key_id);

        var queryString = 'SELECT * FROM tb_tweets WHERE key_id = ? order by tweet_id desc'
        connection.query(queryString, [key_id], 
            function(err, rows, fields) {
                if (err) throw err;
                callAPI(rows, str, key_id, api, callback)
            });
        
    } else {
        console.log('keyword : ' + str + ' cannot find in db')
        addKeyword(str, api, callback);
    }
}

function isInDatabase(keyword, api, callback) {
    str = keyword;
    var queryString = 'select id from tb_keywords where keyword = ?';
    connection.query(queryString, [str], 
        function(err, rows, fields) {
            if (err) throw err;
            getTweetsByDB(rows, str, api, callback);
        });
}


var connection = newConnection()
connection.connect()
exports.isInDatabase = isInDatabase
exports.getRencentNum = getRencentNum
exports.add = add






