/**
 * @author Bing
 * @version 1
 */

var Twitter = require('./twitter');

/**
 * bulid a link with DB
 * @return {object} link with DB
 */
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

/**
 * add the tweets to DB
 * @param {Array} the tweets arry list
 * @param {Function}
 */
function add(data, callback) {

    queryString = 'insert into tb_tweets(key_id, name, screen_name, link_id, icon, date, time, text, tweet_id, coordinates1, coordinates2) values ?'
    var valueslist = []
    //using Insert multiple records
    for (i in data) {

        valueslist.push([key_id, data[i].name, data[i].screen_name, data[i].link_id, data[i].icon, 
            data[i].date, data[i].time, data[i].text, data[i].tweet_id, data[i].coordinates1, data[i].coordinates2])
    }
    connection.query(queryString, [valueslist],
        function(err, rows, fields) {
            if (err) throw err;
            console.log('add  data tweets to db')
            return callback()
        });
}

/**
 * statistics of recent 7 days tweets
 * @param  {int} id of the keywords
 * @param  {int} days need
 * @param  {Function}
 * @return {[type]}
 */
function getStatic(key_id, days, callback) {
    queryString = 'select count(*) as num, DATE_FORMAT(date, ?) as date from tb_tweets where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <date and key_id = ? group by date';
    connection.query(queryString, ['%Y-%m-%d', key_id], 
        function(err, rows, fields) {
                if (err) throw err;
                return callback(rows);
            });
}

/**
 * get the tweets by id in recent 7 days
 * @param  {int} id of the keywords
 * @param  {int} days need
 * @param  {Function}
 * @return {[type]}
 */
function getRecentTweets(key_id, days, callback) {
 queryString = 'select * from tb_tweets where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <date and key_id = ?';
    connection.query(queryString, [key_id], 
        function(err, rows, fields) {
                if (err) throw err;
                return callback(rows);
            });
}

/**
 * get the number of tweets in recent 7 days
 * @param  {int} id of the keywords
 * @param  {int} days need
 * @param  {Function}
 * @return {[type]}
 */
function getRencentNum(key_id, days, callback) {
    queryString = 'select count(*) as num, (select count(*) from tb_tweets) as total from tb_tweets where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <date and key_id = ?';
    connection.query(queryString, [key_id], 
        function(err, rows, fields) {
                if (err) throw err;
                return callback([rows[0].num, rows[0].total]);
            });
}

/**
 * make the param for getTweetsByAPI 
 * @param  {Array} tweets in DB
 * @param  {string} query word
 * @param  {int} id of the keywords
 * @param  {string} whether only query in DB
 * @param  {Function}
 */
function callAPI (rows, str, key_id, api, callback) {
    if (rows != null && rows.length > 0) {
        min_id = rows[0].tweet_id;
    } else {
        rows = [];
        min_id = 0;
    }
    console.log('find ' + rows.length + ' tweets in db');
    Twitter.getTweetsByAPI(str, rows, [], 99999999999999999999, min_id, key_id, api, 0, callback);

}

/**
 * add query word to the DB
 * @param  {string} query word
 * @param  {string} whether only query in DB
 * @param {Function}
 */
function addKeyword (str, api, callback) {
    var queryString = 'insert into tb_keywords (keyword, time) values (?, now())'
    connection.query(queryString, [str], 
        function(err, rows, fields) {
            if (err) throw err;
            console.log('add a new keyword : ' + str);
            isInDatabase(str, api, callback);
        });
}

/**
 * get tweets from DB
 * @param  {Array} id from DB
 * @param  {string} query word
 * @param  {string} whether only query in DB
 * @param  {Function}
 */
function getTweetsByDB(rows, str, api, callback) {
    if (rows != null && rows.length > 0) {
        key_id = rows[0]['id']; 
        console.log('keyword_id : ' + key_id);

        //select tweets in DB by id
        var queryString = 'SELECT id, key_id, name, screen_name, icon, link_id, tweet_id, text, DATE_FORMAT(date, ?) as date, time, coordinates1, coordinates2 FROM tb_tweets WHERE key_id = ? order by tweet_id desc'
        connection.query(queryString, ['%Y-%m-%d', key_id], 
            function(err, rows, fields) {
                if (err) throw err;

                callAPI(rows, str, key_id, api, callback)
            });
        
    } else {
        console.log('keyword : ' + str + ' cannot find in db')
        addKeyword(str, api, callback);
    }
}

/**
 * check the query word whether in DB
 * @param  {string} query word
 * @param  {string} whether only query in DB
 * @param  {Function}
 */
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
exports.getRecentTweets = getRecentTweets
exports.add = add
exports.getStatic=getStatic






