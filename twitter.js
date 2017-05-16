 var Twit = require('twit');
 var Statistics = require('./statistics');
 var client = new Twit({
    consumer_key: '8DagPRHVMdak39IlUuASw',
    consumer_secret: 'vqGnbAKvwnYGTmxZjxnPz7DD46iLpF1CC4OhZQXL0',
    access_token: '17390300-NWxo1S3S8ctPjTnoZTjbUmy2lbCmZs4lHLclGzRQg',
    access_token_secret: 'dfMzkmPDcBkuSpCS6YmXhjoJNati7hBBCpLWmywk',
});
            
function getTweets(query, res) {
    client.get('search/tweets', { q: query, count: 10 },
        function (err, data, response) {
            res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});

            // for (var indx in data.statuses) {
            //     var tweet = data.statuses[indx];
            //     console.log('on: ' + tweet.created_at + ' : @' + addslashes(tweet.user.screen_name) + ' : ' + addslashes(tweet.text) + '\n\n');
            // }

            res.end(JSON.stringify(data));
        });
}


function profiles(query, res) { 
    var reg = /^@/;
    var len = query.length
    res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : 'http://localhost:3000'});

    if (reg.test(query) && len <= 16) {
            console.log('on: ' + query.substring(1) + '\n\n');
            var name = query.substring(1);
            client.get('statuses/user_timeline', { screen_name: name  },
                function (err, data, response) {
                    var resObject = {nunberTweets:0, recentNunberTweets:0, geolist:[]};
                    Statistics.createCalendar();
                    for (var index in data) {
                        resObject.nunberTweets += 1;
                        if (Statistics.isRecent(data[index].created_at)) resObject.recentNunberTweets += 1;
                        resObject.geolist[index] = data[index].geo;
                    }

                    //data.push({statuses:{nunberTweets:nunberTweets, recentNunberTweets:recentNunberTweets}})
                    res.end(JSON.stringify(resObject));
                });
    } else {
        res.end();
    }

}

exports.getTweets = getTweets;
exports.profiles = profiles;
