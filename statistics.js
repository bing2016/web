
var monthObject = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12}
function getDate(str) {
    var strs= new Array()
    strs=str.split(" ")
    var gavenDay = strs[5] + '-' + monthObject[strs[1]] + '-' + strs[2]
    return gavenDay
}


function getTime(str) {
    var strs= new Array()
    strs=str.split(" ")
    var time = strs[3]
    return time
}

function calculations(data) {
    var result = {}
    var strs = []
    var frequency = []
    var keywordslist = []
    var result = []
    var normalwords = ['RT','the', 'of', 'new', 'is', 'to']
    var frequency_recent = []

    for (i in data) {
        tweet = data[i].text
        strs = tweet.split(" ")
        //console.log(strs)
        for (key in strs) {
            keyword = strs[key]
            if (normalwords.indexOf(keyword) >= 0) {
                continue
            } 
            if (frequency.hasOwnProperty(keyword)) frequency[keyword] += 1
            else {
                frequency[keyword] = 0
                keywordslist.push(keyword)
            }
        }
    }


    //console.log(keywords)
    keysSorted = keywordslist.sort(function(a,b){return frequency[b]-frequency[a]})

    result.number = keywordslist.length
    result.list = ''
    for (i = 0; i<10; i++) {
        if (keysSorted.length > i) {
            break
        }
        result.list += keysSorted[i] + ':(' + frequency[keysSorted[i]] + '), '
    }

    return result
}

exports.getDate = getDate
exports.getTime = getTime
exports.calculations =calculations