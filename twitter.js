 var Twit = require('twit');
 var Statistics = require('./statistics');
 var client = new Twit({
    consumer_key: '8DagPRHVMdak39IlUuASw',
    consumer_secret: 'vqGnbAKvwnYGTmxZjxnPz7DD46iLpF1CC4OhZQXL0',
    access_token: '17390300-NWxo1S3S8ctPjTnoZTjbUmy2lbCmZs4lHLclGzRQg',
    access_token_secret: 'dfMzkmPDcBkuSpCS6YmXhjoJNati7hBBCpLWmywk',
});


/**
 * @param  {Array} tweets list
 * @return {Array} formated tweets list
 */
function formatData(data) {
    var tweets = [];

    for (var index in data.statuses) {
        var tweetOri = data.statuses[index];
        //get usesful information from data
        var tweet = {
            name:tweetOri.user.name, 
            icon:tweetOri.user.profile_image_url, 
            screen_name: tweetOri.user.screen_name, 
            date: Statistics.getDate(tweetOri.created_at), 
            time: Statistics.getTime(tweetOri.created_at), 
            link_id:tweetOri.id_str, 
            text:tweetOri.text,
            tweet_id:tweetOri.id
        };
        //add the geographical information
        if (tweetOri.geo != null) {
            tweet.coordinates1=tweetOri.geo.coordinates[0]
            tweet.coordinates2=tweetOri.geo.coordinates[1]
        } else {
            tweet.coordinates1=null
            tweet.coordinates2=null   
        }
        tweets[index] = tweet;
    }
    console.log('format ' + tweets.length + ' tweets')
    return tweets;
}


/**
 * @param  {string} query word
 * @param  {Array} the tweets list form DB
 * @param  {Array} the tweets list form API
 * @param  {int} max tweets id
 * @param  {int} min tweets id
 * @param  {int} query words id
 * @param  {string} whether only query in DB
 * @param  {int} the number of loop
 * @param  {Function}
 * @return {[type]}
 */
function getTweetsByAPI(str, dbData, result, max_id, min_id, key_id, api, i, callback) {
    if (api == 'on') {
        client.get('search/tweets', { q: str, count: 3, max_id: max_id, since_id:min_id},
            function (err, data, response) {
                //format the tweets
                var tweets = formatData(data);
                Array.prototype.push.apply(result, tweets);
                if (data.statuses !=null && data.statuses.length == 3 && i < 2) {
                    i += 1
                    // if there are more date call the API again till have 300 tweets
                    getTweetsByAPI(str, dbData, result, tweets[data.statuses.length-1].tweet_id-100, min_id, key_id, api, i, callback);

                } else { 
                    return callback(key_id, result, dbData);
                }
            });
    }
    else {
        return callback(key_id, [], dbData);
    }
}

/**
 * call API to get user information
 * @param  {string} query word
 * @param  {object} the information will send to view
 * @param  {Function}
 */
function getProfiles(query, resObject, callback) {
    var name = query.substring(1)
    client.get('users/show', { screen_name: name },
        function (err, data, response) {

            resObject.user.name = data.name
            resObject.user.icon = data.profile_image_url
            resObject.user.screen_name = data.screen_name
            //resObject.user.tweets_num = data.statuses_count

            return callback(resObject)

        })
}


exports.getTweetsByAPI = getTweetsByAPI
exports.getProfiles = getProfiles





