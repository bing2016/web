
function init_UserProFile_Table (data) {
	var ret = JSON.stringify(data);
	var User = JSON.parse(ret).user;
	var html = '<table border=0>';

	html += '<div class=" w3-panel w3-light-grey w3-round w3-border" style="overflow:hidden">'

	html += '<p><div class="w3-btn" onclick="openpage(\'https://twitter.com/' + User.screen_name + ' \')"><img style="width:10%" src="' + User.icon + '"><font style="color: black" size="5"> ' + User.name + '</font><font style="color: grey" size="4">' + '@' + User.screen_name + '. </font></div></p>';

	html += '<div id="map" style="width:90%;height:300px;margin-left:5%"></div><br>';

	html += '<p style="margin-left:5%;font-size:18px">Total number of Tweets: ' + User.numberTweets + '</p>';

	html += '<p style="margin-left:5%;font-size:18px">Number of Keywords: 25</p>';

	html +=	'<p style="margin-left:5%;font-size:18px">10 Most popular Keywords:</p>';

	html += '<p style="margin-left:5%;font-size:18px">Congratulations (12), Reds (12), signed (10), Good (5), Luck (5) …</p>'

	html += '<p style="margin-left:5%;font-size:18px">Keywords in the last 7 days:</p>'

	html += '<p style="margin-left:5%;font-size:18px">Congratulations (3), Reds (3), hope (5) …</p><br>';

	html += '</div>'

	html += '</table>';

	$('#User_Profile').append(html);

	User_Profile_Opacity();
	Chart_Opacity_0();
}

function init_Tweets_Table_2 (data) {
	var html = '<table border=0>';
	var ret = JSON.stringify(data);
	var Tweets = JSON.parse(ret).tweets;
	var User = JSON.parse(ret).user;

	for(var i=0,l=Tweets.length;i<l;i++){
		var obj = Tweets[i];

		html += '<div class=" w3-panel w3-light-grey w3-round w3-border" onclick="openpage(\'https://twitter.com/' + User.screen_name + '/status/' + obj.link_id + ' \')" style="overflow:hidden">'

		html += '<p style="margin-left:14px"><font style="color: black" size="3">Date: </font><font style="color: grey" size="3">' + obj.time + '</font></p>';

		html += '<p style="margin-left:14px"><font style="color: black" size="5"> Tweet: ' + obj.text + '</font></p>'

		html += '</div>'
	}
	html += '</table>';

	$('#TweetList').append(html);
}

function init_Tweets_Table (data) {

	var ret = JSON.stringify(data);
	var twit = JSON.parse(ret).tweets;
	var html = '<table border=0>';
	for(var i=0,l=twit.length;i<l;i++){
		var obj = twit[i];
		addRecent(obj.time);

		html += '<div class=" w3-panel w3-light-grey w3-round w3-border" onclick="openpage(\'https://twitter.com/' + obj.screen_name + '/status/' + obj.link_id + ' \')" style="overflow:hidden;padding:10px">'

		html += '<a class="w3-btn" onclick="openpage(\'https://twitter.com/' + obj.screen_name + ' \')" ><font style="color: black" size="4">Author: </font><img style="height:50px" src="' + obj.icon + '"><font style="color: black" size="5"> ' + obj.name + '</font><font style="color: grey" size="4">' + '@' + obj.screen_name + '. </font></a></p>'

		html += '<p style="margin-left:14px"><font style="color: black" size="3">Date: </font><font style="color: grey" size="3">' + obj.date + ' ' + obj.time + '</font></p>'

		html += '<p style="margin-left:14px"><font style="color: black" size="5"> Tweet: ' + obj.text + '</font></p>'

		html += '</div>'
	}
	html += '</table>';

	$('#TweetList').append(html);
}

