/**
 * Create userProFile block
 * @param  {Array} Array contains user's info
 * @param  {Array} Array contains keywords' info
 */
function init_UserProFile_Table (User, keywords) {

	var html = '<idv border=0>';

	html += '<div class=" w3-panel w3-light-grey w3-round w3-border" style="overflow:hidden">'

	html += '<a class="w3-btn" style="margin-top:1%" onclick="openpage(\'https://twitter.com/' + User.screen_name + ' \')" ><table><td><img style="height:50px" src="' + User.icon + 
	'"></td><td><div><font style="color: black" size="4"> ' + User.name + '</font><br><font class="w3-left" style="color: grey;" size="3">' + '  @' + User.screen_name + '. </font></div></td></table></a>'

	html += '<div id="map" style="width:90%;height:200px;margin-left:3%;margin-top:5px"></div>';

	html += '<p style="margin-left:3%;font-size:14px">Total number of Tweets: ' + User.tweets_num + '</p>';

	html += '<p style="margin-left:3%;font-size:14px">Number of Tweets in the last 5 days: ' + User.recentTweets_num + '</p>'

	html += '<p style="margin-left:3%;font-size:14px">Number of Keywords: ' + keywords.number + '</p>';

	html +=	'<p style="margin-left:3%;font-size:14px">10 Most popular Keywords:</p>';

	html += '<p style="margin-left:3%;font-size:14px">'+ keywords.popular +'</p>'

	html += '<p style="margin-left:3%;font-size:14px">Keywords in the last 7 days:</p>'

	html += '<p style="margin-left:3%;font-size:14px">' + keywords.recent +'</p><br>';

	html += '</div>'

	html += '</div>';

	$('#User_Profile').append(html);
	
	User_Profile_Opacity();
	Chart_Opacity_0();
}

/**
 * Create tweets block showing all tweets
 * @param  {Array} Array contains tweets' info
 */
function init_Tweets_Table (twit) {

	if(twit.length == 0) {
		var html = '<div class=" w3-panel w3-light-grey w3-round w3-border" style="overflow:hidden">';
		html += '<p>There is no suitable data.</p>'
		html += '</div>'
		console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		$('#TweetList').append(html);
	}
	else{

		var html = '';
		for(var i=0,l=twit.length;i<l;i++){
			var obj = twit[i];

			html += '<div class=" w3-panel w3-light-grey w3-round w3-border" onclick="openpage(\'https://twitter.com/' + obj.screen_name + '/status/' + obj.link_id + ' \')" style="overflow:hidden;padding:10px">'

			html += '<a class="w3-btn" style="margin-top:1%" onclick="openpage(\'https://twitter.com/' + obj.screen_name + ' \')" ><table><td><font style="color: black" size="4">Author: </font></td><td><img style="height:50px" src="' + obj.icon + 
			'"></td><td><div><font style="color: black" size="4"> ' + obj.name + '</font><br><font class="w3-left" style="color: grey;" size="3">' + '  @' + obj.screen_name + '. </font></div></td></table></a>'

			html += '<p style="margin-left:14px"><font style="color: black" size="3">Date: </font><font style="color: grey" size="3">' + obj.date + ' ' + obj.time + '</font></p>'

			html += '<p style="margin-left:14px"><font style="color: black" size="5"> Tweet: ' + obj.text + '</font></p>'

			html += '</div>'
		}
		html += '';

		$('#TweetList').append(html);
	}
}

