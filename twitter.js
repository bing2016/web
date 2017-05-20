 var Twit = require('twit');
 var Statistics = require('./statistics');
 var client = new Twit({
    consumer_key: '8DagPRHVMdak39IlUuASw',
    consumer_secret: 'vqGnbAKvwnYGTmxZjxnPz7DD46iLpF1CC4OhZQXL0',
    access_token: '17390300-NWxo1S3S8ctPjTnoZTjbUmy2lbCmZs4lHLclGzRQg',
    access_token_secret: 'dfMzkmPDcBkuSpCS6YmXhjoJNati7hBBCpLWmywk',
});
//var Database = require('./database')


function formatData(data) {
    var tweets = [];
    for (var index in data.statuses) {
        var tweetOri = data.statuses[index];
        var tweet = {
            name:tweetOri.user.name, 
            icon:tweetOri.user.profile_image_url, 
            screen_name: tweetOri.user.screen_name, 
            date: Statistics.getDate(tweetOri.created_at), 
            time: Statistics.getTime(tweetOri.created_at), 
            link_id:tweetOri.id_str, 
            text:tweetOri.text,
            coordinates:tweetOri.text,
            tweet_id:tweetOri.id
        };
        tweets[index] = tweet;
    }
    console.log('format ' + tweets.length + ' tweets')
    return tweets;
}

function getTweetsByAPI(str, dbData, result, max_id, min_id, key_id, api, callback) {
    if ('on' == api) {
        client.get('search/tweets', { q: str, count: 3, max_id: max_id, since_id:min_id},
            function (err, data, response) {
                var tweets = formatData(data);
                Array.prototype.push.apply(result, tweets);
                if (data.statuses.length == 3 && max_id == 99999999999999999999) {
                    getTweetsByAPI(str, dbData, result, tweets[data.statuses.length-1].tweet_id-100, min_id, key_id, callback);

                } else { 
                    return callback(key_id, result, dbData);
                }
            });
    }
    else {
        return callback(key_id, [], dbData);
    }
}




// function getTweets2(query, dbData, result, res, max_id, min_id, key_id) {

//     client.get('search/tweets', { q: query, count: 3, max_id: max_id, since_id:min_id},
//         function (err, data, response) {

//                 var tweets = [];
//                 for (var index in data.statuses) {
//                     var tweetOri = data.statuses[index];
//                     var tweet = {name:tweetOri.user.name, 
//                                  icon:tweetOri.user.profile_image_url, 
//                                  screen_name: tweetOri.user.screen_name, 
//                                  date: Statistics.getDate(tweetOri.created_at), 
//                                  time: Statistics.getTime(tweetOri.created_at), 
//                                  link_id:tweetOri.id_str, 
//                                  text:tweetOri.text,
//                                  coordinates:tweetOri.text,
//                                  tweet_id:tweetOri.id};
//                     tweets[index] = tweet;
//                 }

//                 Array.prototype.push.apply(result, tweets);

//             if (data.statuses.length == 3 && max_id == 99999999999999999999) {
//                 //console.log(tweets);
//                 getTweets2(query, dbData, result, res, tweets[data.statuses.length-1].tweet_id-100, min_id, key_id);

//             } else {
//                 Database.add(query, key_id, result);
//                 result.unshift(0, 0);
//                 Array.prototype.splice.apply(dbData, result); 
//                 res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
//                 res.end(JSON.stringify(dbData));
//             }
//     });

// }



// function getTweets(query, res) {
//     client.get('search/tweets', { q: query, count: 3 },
//         function (err, data, response) {
//             res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});

//             for (var indx in data.statuses) {
//                 var tweet = data.statuses[indx];
//                 //console.log('on: ' + tweet.created_at + ' : @' + addslashes(tweet.user.screen_name) + ' : ' + addslashes(tweet.text) + '\n\n');
//                 console.log(JSON.stringify(tweet.id));
//             }
//             res.end(JSON.stringify(data));
//         });
// }



//exports.getTweets = getTweets;
//exports.profiles = profiles;
exports.getTweetsByAPI = getTweetsByAPI;
