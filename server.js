 var protocol = require('http');
 var static = require('node-static');
 var url = require('url');
 var file = new (static.Server)();
 var portNo = 3000;
var Twitter = require('./twitter');
var Database = require('./database');

 function addslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
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

var app = protocol.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var body = '';
    if ((req.method == 'POST') && (pathname == '/postFile.html')) {

        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            body= JSON.parse(body);

            var query= body.query;

            //Twitter.getTweets(query, res);
            Database.getTweets(query, res);
                    

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
            Twitter.profiles(query, res);
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
