var Twitter = require('twitter-js-client');

var api = new Twitter.Twitter(JSON.parse(fs.readFileSync('./creds.json')));

api.postTweet({
	"status":"test tweet please ignore punk"
}, function(error) {
	console.log(error);
}, function(success) {
	console.log('posted tweet');
});