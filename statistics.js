
var monthObject = {Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12}
function getDate(str) {
    var strs= new Array()
    strs=str.split(" ")
    var gavenDay = strs[5] + '-' + monthObject[strs[1]] + '-' + strs[2]
    return gavenDay
}

/**
 * @param  {[type]}
 * @return {[type]}
 */
function getTime(str) {
    var strs= new Array()
    strs=str.split(" ")
    var time = strs[3]
    return time
}

/**
 * @param  {Array} tweets list
 * @return {Array} keyword number and frequency
 */
function calculations(data) {
    var strs = [] //split the tweet text
    var frequency = [] //frequency of keywords 
    var keywordslist = [] //a list of keywords
    var result = [] //return list

    // the normal word which is not a keywords
    var normalwords = ['RT', 'the','a', 'his', 'The', 'of', 'new', 'is', 'to', 'for', 'and', 'by', 'list', 'I\'m',
                     'after', 'with', 'our', 'your', 'on', 'he', 'has', 'you', 'how', 'Be', 'en', 'years', 'last', 
                     'at', 'be', 'over', 'Year', 'from', 'been', 'You\’ve', 'my']

    for (i in data) {
        //sltp the text
        tweet = data[i].text
        strs = tweet.split(" ")

        for (key in strs) {
            keyword = strs[key]

            //remove normal words
            if (normalwords.indexOf(keyword) >= 0 || keyword.indexOf('http') >= 0) {
                continue
            } 

            //calculate frequency
            if (frequency.hasOwnProperty(keyword)) frequency[keyword] += 1
            else {
                frequency[keyword] = 1
                keywordslist.push(keyword)
            }
        }
    }

    //sort the keywords by frequency
    keysSorted = keywordslist.sort(function(a,b){return frequency[b]-frequency[a]})

    //get top 10 keywords
    result.number = keywordslist.length
    result.list = ''
    for (i = 0; i<10; i++) {
        if (keysSorted.length <= i) {
            break
        }
        result.list += keysSorted[i] + ':(' + frequency[keysSorted[i]] + '), '
    }

    return result
}

exports.getDate = getDate
exports.getTime = getTime
exports.calculations =calculations