var monthObject = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12}

function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;
	var d = dd.getDate(); 
	return d+"."+m+"."+y; 
} 

var day1 = GetDateStr(0);
var day2 = GetDateStr(-1);
var day3 = GetDateStr(-2);
var day4 = GetDateStr(-3);
var day5 = GetDateStr(-4);
var day6 = GetDateStr(-5);
var day7 = GetDateStr(-6);

var tweetCount = new Array();
tweetCount[day1] = 0;
tweetCount[day2] = 0;
tweetCount[day3] = 0;
tweetCount[day4] = 0;
tweetCount[day5] = 0;
tweetCount[day6] = 0;
tweetCount[day7] = 0;

function addRecent(str) {
	var strs= new Array();
	strs=str.split(" ");
	var gavenDay = strs[2] + '.' + monthObject[strs[1]] + '.' + strs[5];
	if (tweetCount.hasOwnProperty(gavenDay)) {
		tweetCount[gavenDay] += 1;
	} 
}