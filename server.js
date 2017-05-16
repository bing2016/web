 var protocol = require('http');
 var static = require('node-static');
 var url = require('url');
 var file = new (static.Server)();
 var portNo = 3000;

 var Twit = require('twit');
 var client = new Twit({
    consumer_key: '8DagPRHVMdak39IlUuASw',
    consumer_secret: 'vqGnbAKvwnYGTmxZjxnPz7DD46iLpF1CC4OhZQXL0',
    access_token: '17390300-NWxo1S3S8ctPjTnoZTjbUmy2lbCmZs4lHLclGzRQg',
    access_token_secret: 'dfMzkmPDcBkuSpCS6YmXhjoJNati7hBBCpLWmywk',
});


 var monthObject = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12}

function GetDateStr(AddDayCount) { 
    var dd = new Date(); 
    dd.setDate(dd.getDate()+AddDayCount);
    var y = dd.getFullYear(); 
    var m = dd.getMonth()+1;//获取当前月份的日期 
    var d = dd.getDate(); 
    return d+"."+m+"."+y; 
} 

var day1 = GetDateStr(0);
var day2 = GetDateStr(-1);
var day3 = GetDateStr(-2);
var day4 = GetDateStr(-3);
var day5 = GetDateStr(-4);
var day6 = GetDateStr(-5);
var day7 = GetDateStr(-6);

var tweetCount = new Array();
tweetCount[day1] = 0;
tweetCount[day2] = 0;
tweetCount[day3] = 0;
tweetCount[day4] = 0;
tweetCount[day5] = 0;
tweetCount[day6] = 0;
tweetCount[day6] = 0;


 function addslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function profiles(str) { 
    var reg = /^@/;
    var len = str.length

    if (reg.test(str) && len <= 16) {
            console.log('on: ' + str.substring(1) + '\n\n');
            var name = str.substring(1);
            client.get('statuses/user_timeline', { screen_name: name  },
                function (err, data, response) {
                    var nunberTweets = 0;
                    var recentNunberTweets = 0;
                    response.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : 'http://localhost:3000'});
                    for (var indx in data) {
                        nunberTweets += 1;
                        if (isRecent(str)) recentNunberTweets += 1;
                        var tweet = data[indx];
                        //response.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : 'http://localhost:3000'});
                        console.log('on: ' + tweet.name + '\n\n');
                        console.log('on: ' + JSON.stringify(tweet) + '\n\n');
                        //response.end(JSON.stringify(data));
                    }
                    response.end(JSON.stringify(data));
                });
    }

}

function addRecent(str) {
    var strs= new Array();
    strs=str.split(" ");
    var gavenDay = strs[2] + '.' + monthObject[strs[1]] + '.' + strs[5];
    if (tweetCount.hasOwnProperty(gavenDay)) {
        tweetCount[gavenDay] += 1;
    } 
}

function waitCallBack(param1, callback) {
    console.log('entering...');
    setTimeout(function () {
        if (callback && typeof(callback) === "function") {
            console.log('exiting...');
            callback();
        }
    }, param1);
}





// function addTweetsToDB() {

// }

// function getTweetsFromDB() {

// }

// function isInDatabase(str, connection) {
//     var queryString = 'SELECT id FROM tb_keywords WHERE keyword = ?';
//     connection.query(queryString, [str], 
//         function(err, rows, fields) {
//             if (err) throw err;
//             if (rows.length > 0) {
//                 rows[0]['id']
//                 var queryString2 = 'SELECT tweet FROM tb_tweets WHERE key_id = ?'
//                 connection.query(queryString,  rows[0]['id']);
//             }
//         });
//     connection.end();
// }

// function createConnectionWithDB() {
//     var mysql = require('mysql');

//     var connection = mysql.createConnection({
//         host : '127.0.0.1', port : '3306',
//         user : 'root', password : '', database : 'web',
//     });

//     console.log('lets start');
//     return connection.connect();
// }

var app = protocol.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var body = '';
    if ((req.method == 'POST') && (pathname == '/postFile.html')) {

        //var dataFin = {ok: 'ok'};
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            body= JSON.parse(body);

            var query= body.query;
            //profiles(query);
            client.get('search/tweets', { q: query, count: 3 },
                function (err, data, response) {
                    for (var indx in data.statuses) {
                        res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
                        var tweet = data.statuses[indx];
                        console.log('on: ' + tweet.created_at + ' : @' + addslashes(tweet.user.screen_name) + ' : ' + addslashes(tweet.text) + '\n\n');
                        //addRecent(tweet.created_at);
                        res.end(JSON.stringify(data));

                    }
                    
                // res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
                // var obj = {'statistics':{}};
                // for(var i in tweetCount) {
                //     obj['statistics'][i]=tweetCount[i]; 
                // } 
                // //res.end(JSON.stringify(obj));
                // //res.end(JSON.stringify(data));
                // console.log(JSON.stringify(obj));
            });






//            waitCallBack(5000, function () {
//                res.writeHead(200, {"Content-Type": "text/plain"});
//                console.log('body: ' + body);
//                res.end(JSON.stringify(body));
//            });
});
    }
    else if ((req.method == 'POST') && (pathname == '/postFile11.html')) {
         req.on('data', function (data) {

            body += data;
        });
        req.on('end', function () {
            body= JSON.parse(body);

            var query= body.query;
            
            console.log(JSON.stringify(query));
                        res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
                        res.end(JSON.stringify(query));
    });
    }
    else {
        file.serve(req, res, function (err, result) {
            if (err != null) {
                console.error('Error serving %s - %s', req.url, err.message);
                if (err.status === 404 || err.status === 500) {
                    file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
                } else {
                    res.writeHead(err.status, err.headers);
                    res.end();
                }
            } else {
                res.writeHead(200, {"Content-Type": "text/plain", 'Access-Control-Allow-Origin': '*'});

            }
        });
    }
}).listen(3000,'127.0.0.1');
