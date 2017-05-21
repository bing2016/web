var Database = require('./database')
var Statistics = require('./statistics')
var Twitter = require('./twitter')

var res;

/**
 * return the data to view
 * @param  {Array} the tweets list form API
 * @param  {Array} the tweets list form DB
 * @param  {object} the information will send to view
 * @param  {object} the respond of serve
 * @param  {int} the id of query word
 */
function resp(result, dbData, resObject, res, key_id) {
	result.unshift(0, 0);
	Array.prototype.splice.apply(dbData, result);

	//get the total statistics for chart
	var calculation = Statistics.calculations(dbData)
	resObject.keywords.number = calculation.number
	resObject.keywords.popular = calculation.list

	//add tweets to DB
	Database.getRecentTweets(key_id, 7, 
		function(row){
			//get the recent statistics for chart
			var calculation_rec = Statistics.calculations(row)
			resObject.keywords.recent = calculation.list	
			resObject.tweets = dbData;

			Database.getRencentNum(key_id, 5,
				function(stat){
					resObject.user.recentTweets_num = stat[0]
					resObject.user.tweets_num = stat[1]

					res.writeHead(200, { "Content-Type": "application/json", 'Access-Control-Allow-Origin' : '*'})
					console.log('send data to view')
					res.end(JSON.stringify(resObject))
				})	

		})
}

/**
 * start a profile query
 * @param  {string} query word
 * @param  {string} whether only query in DB
 * @param  {object} the respond of serve
 */
function profiles(query, api, response) { 
	// only query the word begin with '@' less 16
	var reg = /^@/
	var len = query.length
	res = response
	if (reg.test(query) && len <= 16) {
		console.log('on: ' + query.substring(1) + '\n\n')
		var resObject = {user:{}, keywords:{}};

		//call getProfiles function to get the frofiles
		Twitter.getProfiles(query, resObject,
			function(resObject) {
				Database.isInDatabase(query, api, function(key_id, result, dbData){
					//if no date from API, do not call add function
					if (result.length != 0) {
						Database.add(result, function() {
							resp(result, dbData, resObject, res, key_id)
						});
					} else {
						resp(result, dbData, resObject, res, key_id)
					}
				});
			})

	} else {
		res.end(JSON.stringify(resObject));
	}

}

exports.profiles = profiles;