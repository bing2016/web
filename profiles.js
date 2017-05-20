var Database = require('./database')
var Statistics = require('./statistics')

var res;

// function resp(result, dbData) {
//     Database.add(result);
//     result.unshift(0, 0);
//     Array.prototype.splice.apply(dbData, result);
//     res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
//     console.log('send data to view');
//     res.end(JSON.stringify(dbData));
// }

// function profiles(str, response) {
//     res = response;
//     console.log('start a profiles search');
//     Database.isInDatabase(str, resp);
// }


function profiles(query, res) { 
    var reg = /^@/
    var len = query.length
    res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'})

    if (reg.test(query) && len <= 16) {
            console.log('on: ' + query.substring(1) + '\n\n')
            var name = query.substring(1)
            client.get('users/show', { screen_name: name },
            	function (err, data, response) {
            		var resObject = {user:{}, keywords:{}, tweets:[]};
            		// var resObject = {}
            		// var resObject.user = {}
            		resObject.user.name = data.name
            		resObject.user.icon = data.icon
            		resObject.user.screen_name = data.screen_name
            		resObject.user.tweets_num = data.statuses_count

            		Database.isInDatabase(query, 
            			function(key_id, result, dbData) {
            				Database.add(result);
            				result.unshift(0, 0);
            				Array.prototype.splice.apply(data, result);
            				resObject.tweets = data;

            				resObject.keywords = Statistics.calculations(data);

            				resObject.user.recentTweets_num = Database.getRencentNum(key_id, 5);




            				res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
            				console.log('send data to view');
            				res.end(JSON.stringify(resObject));
            			});





                    // Statistics.createCalendar();
                    
                    // if (data[0] == null) {
                    //     res.end(JSON.stringify(resObject))
                    // } else {
                    //     resObject.user.name = data[0].user.name;
                    //     resObject.user.icon = data[0].user.profile_image_url;
                    //     resObject.user.screen_name = data[0].user.screen_name;
                        
                    //     for (var index in data) {
                    //         resObject.user.numberTweets += 1;
                    //         if (Statistics.isRecent(data[index].created_at)) resObject.user.recentNumberTweets += 1;
                    //         resObject.user.coordinates[index] = data[index].coordinates;

                    //         var tweet = {time:data[index].created_at, id:data[index].link_id, text:data[index].text}
                    //         resObject.tweets[index] = tweet;
                    // }

                    // //data.push({statuses:{numberTweets:numberTweets, recentNumberTweets:recentNumberTweets}})
                    // //console.log(JSON.stringify(data));
                    // res.end(JSON.stringify(resObject));
              });
    } else {
        res.end(JSON.stringify(resObject));
    }

}

exports.profiles = profiles;