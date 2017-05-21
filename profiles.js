var Database = require('./database')
var Statistics = require('./statistics')
var Twitter = require('./twitter')

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

var res

// function resp(key_id, result, dbData) {

// 		Database.add(result);
// 		result.unshift(0, 0);
// 		Array.prototype.splice.apply(dbData, result);
// 		resObject.tweets = dbData;

// 		resObject.keywords = Statistics.calculations(data);

// 		resObject.user.recentTweets_num = Database.getRencentNum(key_id, 5);


// 		res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'});
// 		console.log('send data to view');
// 		res.end(JSON.stringify(resObject));

// }


function profiles(query, api, response) { 
	var reg = /^@/
	var len = query.length
	res = response
	if (reg.test(query) && len <= 16) {
		console.log('on: ' + query.substring(1) + '\n\n')
		var resObject = {user:{}, keywords:{}};

		Twitter.getProfiles(query, resObject,
			function(resObject) {
				Database.isInDatabase(query, api, function(key_id, result, dbData){
					//console.log(result)
					Database.add(result, function() {

						result.unshift(0, 0);
						Array.prototype.splice.apply(dbData, result);
        
						var calculation = Statistics.calculations(dbData)
						resObject.keywords.number = calculation.number
						resObject.keywords.popular = calculation.list

						Database.getRecentTweets(key_id, 7, 
							function(row){
								var calculation_rec = Statistics.calculations(row)
								resObject.keywords.recent = calculation.list	
								resObject.tweets = dbData;

								Database.getRencentNum(key_id, 5,
									function(stat){
										resObject.user.recentTweets_num = stat[0]
										resObject.user.tweets_num = stat[1]

										res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'})
										console.log('send data to view')
										//console.log(resObject)
										res.end(JSON.stringify(resObject))
									})	

							})

					});

				});
			})

	} else {
		res.end(JSON.stringify(resObject));
	}

}

exports.profiles = profiles;