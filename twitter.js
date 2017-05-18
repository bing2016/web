 var Twit = require('twit');
 var Statistics = require('./statistics');
 var client = new Twit({
    consumer_key: '8DagPRHVMdak39IlUuASw',
    consumer_secret: 'vqGnbAKvwnYGTmxZjxnPz7DD46iLpF1CC4OhZQXL0',
    access_token: '17390300-NWxo1S3S8ctPjTnoZTjbUmy2lbCmZs4lHLclGzRQg',
    access_token_secret: 'dfMzkmPDcBkuSpCS6YmXhjoJNati7hBBCpLWmywk',
});
var Database = require('./database')


function getTweets2(query, dbData, result, res, max_id, min_id, key_id) {

    client.get('search/tweets', { q: query, count: 3, max_id: max_id, since_id:min_id},
        function (err, data, response) {

                var tweets = [];
                for (var index in data.statuses) {
                    var tweetOri = data.statuses[index];
                    var tweet = {name:tweetOri.user.name, 
                                 icon:tweetOri.user.profile_image_url, 
                                 screen_name: tweetOri.user.screen_name, 
                                 time: tweetOri.created_at, 
                                 link_id:tweetOri.id_str, 
                                 text:tweetOri.text, 
                                 tweet_id:tweetOri.id};
                    tweets[index] = tweet;
                }
                console.log(tweets);
                console.log(max_id);
                console.log('@@@@@@@@@');

                Array.prototype.push.apply(result, tweets);

            if (data.statuses.length = 3 && max_id == 99999999999999999999) {
                getTweets2(query, dbData, result, res, tweets[data.statuses.length-1].id-1, min_id, key_id);

            } else {
                Database.add(query, key_id, result);
                result.unshift(0, 0);
                Array.prototype.splice.apply(dbData, result); 
                //res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
                //res.end(JSON.stringify(data));
            }
    });

}



function getTweets(query, res) {
    client.get('search/tweets', { q: query, count: 3 },
        function (err, data, response) {
            res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});

            for (var indx in data.statuses) {
                var tweet = data.statuses[indx];
                //console.log('on: ' + tweet.created_at + ' : @' + addslashes(tweet.user.screen_name) + ' : ' + addslashes(tweet.text) + '\n\n');
                console.log(JSON.stringify(tweet.id));
            }
            res.end(JSON.stringify(data));
        });
}


function profiles(query, res) { 
    var reg = /^@/;
    var len = query.length
    res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});

    if (reg.test(query) && len <= 16) {
            console.log('on: ' + query.substring(1) + '\n\n');
            var name = query.substring(1);
            client.get('statuses/user_timeline', { screen_name: name  },
                function (err, data, response) {
                    var resObject = {user:{}, tweets:[]};
                    resObject.user = {name:'', icon:'', screen_name:'', numberTweets:0, recentNumberTweets:0, coordinates:[]};

                    Statistics.createCalendar();
                    
                    if (data[0] == null) {
                        res.end()
                    } else {
                        resObject.user.name = data[0].user.name;
                        resObject.user.icon = data[0].user.profile_image_url;
                        resObject.user.screen_name = data[0].user.screen_name;
                        
                        for (var index in data) {
                            resObject.user.numberTweets += 1;
                            if (Statistics.isRecent(data[index].created_at)) resObject.user.recentNumberTweets += 1;
                            resObject.user.coordinates[index] = data[index].coordinates;

                            var tweet = {time:data[index].created_at, id:data[index].id_str, text:data[index].text}
                            resObject.tweets[index] = tweet;
                    }

                    //data.push({statuses:{numberTweets:numberTweets, recentNumberTweets:recentNumberTweets}})
                    //console.log(JSON.stringify(data));
                    res.end(JSON.stringify(resObject));
              }  });
    } else {
        res.end();
    }

}

exports.getTweets = getTweets;
exports.profiles = profiles;
exports.getTweets2 = getTweets2;
