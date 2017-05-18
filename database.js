var Twitter = require('./twitter');

var monthObject = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12}
function displayDate(str) {
    var strs= new Array();
    strs=str.split(" ");
    var gavenDay = strs[5] + '-' + monthObject[strs[1]] + '-' + strs[2] + ' ' + strs[3];
    return gavenDay;
}


function add(str, key_id, data) {
    // var connection = newConnection();
    // var queryString = 'insert into tb_keywords (keyword, time) values (?, now())'
    //             connection.query(queryString, [str], 
    //                 function get (err, rows, fields) {
    //                     if (err) throw err;

    //                     queryString = 'select id from tb_keywords where keyword = ?'
    //                     connection.query(queryString, [str], 
    //                         function(err, rows, fields) {
    //                             if (err) throw err;
                                
                                for (i in data) {
                                    queryString = 'insert into tb_tweets (key_id, name, screen_name, link_id, icon, time, text, tweet_id, creat_at) '
                                    + 'values (?, ?, ?, ?, ?, ?, ?, ?, now())'

                                    connection.query(queryString, [key_id, data[i].name, data[i].screen_name, data[i].link_id, 
                                        data[i].icon, displayDate(data[i].time), data[i].text, data[i].tweet_id],
                                        function(err, rows, fields) {
                                            if (err) throw err;
                                            console.log('bbb');
                                        });
                                }
                                
                    //         })
                    // });
}


function getTweets(str, res) {
    var queryString = 'select id from tb_keywords where keyword = ?'
    connection.query(queryString, [str], 
        function(err, rows, fields) {
            if (err) throw err;
            if (rows != null && rows.length > 0) {
                var queryString = 'SELECT * FROM tb_tweets WHERE key_id = ? order by tweet_id desc'
                var key_id = rows[0]['id'];
                console.log(key_id);    
                connection.query(queryString, [key_id], 
                    function(err, rows, fields) {
                        if (rows != null && rows.length > 0) {
                            min_id = rows[0].tweet_id;
                        } else {
                            console.log('bb');
                            rows = [];
                            min_id = 0;
                        }
                        Twitter.getTweets2(str, rows, [], res, 99999999999999999999, min_id, key_id);

                    });
            } else {
                var queryString = 'insert into tb_keywords (keyword, time) values (?, now())'
                connection.query(queryString, [str], 
                    function(err, rows, fields) {
                        if (err) throw err;
                        getTweets(str, res);
                        //console.log('add to keywords');
                    });

            }
        });
}

function newConnection() {
    var mysql = require('mysql');

    var connection = mysql.createConnection({
        host : '127.0.0.1', port : '3306', charset : 'utf8mb4',
        user : 'root', password : '', database : 'web',
    });
    console.log('lets start');
    return connection;
}

var connection = newConnection();
connection.connect();
exports.add = add;
exports.getTweets = getTweets;





