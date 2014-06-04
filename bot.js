var fs = require('fs');
var Twitter = require('twitter-js-client');
var progress = JSON.parse(fs.readFileSync('./progress.json'));

function post(tweet, callback) {
	var api = new Twitter.Twitter(JSON.parse(fs.readFileSync('./creds.json')));

	api.postTweet({
		"status": tweet
	}, function(error) {
		console.log(error);
	}, function(success) {
		console.log(new Date() + ' posted tweet: ' + tweet);
		callback();
	});
}

function doThing() {
	var dict = fs.readFileSync('./dict.txt', {encoding: 'utf8'}).split('\r\n');
	var word = dict[progress.next] + 'punk';

	post(word, function() {
		progress.lastWord = word;
		progress.next++;
		fs.writeFile('./progress.json', JSON.stringify(progress));
	});
}

// every 30 minutespunk
var interval = 1000 * 60 * 30;
doThing();
setInterval(doThing, interval);