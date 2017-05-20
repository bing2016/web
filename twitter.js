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
            coordinates:tweetOri.coordinates,
            tweet_id:tweetOri.id
        };
        tweets[index] = tweet;
    }
    console.log('format ' + tweets.length + ' tweets')
    return tweets;
}

function getTweetsByAPI(str, dbData, result, max_id, min_id, key_id, api, callback) {
    if (api == 'on') {
        console.log('aaaaa')
        client.get('search/tweets', { q: str, count: 3, max_id: max_id, since_id:min_id},
            function (err, data, response) {
                var tweets = formatData(data);
                Array.prototype.push.apply(result, tweets);
                if (data.statuses.length == 3 && max_id == 99999999999999999999) {
                    getTweetsByAPI(str, dbData, result, tweets[data.statuses.length-1].tweet_id-100, min_id, key_id, api, callback);

                } else { 
                    return callback(key_id, result, dbData);
                }
            });
    }
    else {
        console.log('bbbbbb')
        return callback(key_id, [], dbData);
    }
}

function getProfiles(query, resObject, callback) {
    var name = query.substring(1)
    client.get('users/show', { screen_name: name },
        function (err, data, response) {
            console.log(data)
            resObject.user.name = data.name
            resObject.user.icon = data.profile_image_url
            resObject.user.screen_name = data.screen_name
            //resObject.user.tweets_num = data.statuses_count

            return callback(resObject)

        })
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
exports.getTweetsByAPI = getTweetsByAPI
exports.getProfiles = getProfiles





