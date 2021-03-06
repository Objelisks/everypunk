var fs = require('fs');
var Swagger = require('swagger-client');
var Twitter = require('twitter-js-client');
var creds = JSON.parse(fs.readFileSync('./creds.json'));

function post(tweet, callback) {
	var api = new Twitter.Twitter(creds.twitter);

    console.log('posting', tweet);

	api.postTweet({
		"status": tweet
	}, function(error) {
		console.log(error);
	}, function(success) {
		console.log(new Date() + ' posted tweet: ' + tweet);
		callback();
	});
}

var randomParams = {
    "includePartOfSpeech": "noun,adjective,verb,adverb,interjection,pronoun,verb-intransitive,verb-transitive",
    "hasDictionaryDef": "true",
    "minCorpusCount": 1,
    "maxCorpusCount": -1,
    "minDictionaryCount": 0,
    "maxDictionaryCount": -1,
    "minLength": 1,
    "maxLength": 130
};

function doThing() {
    var wordnik = new Swagger({
        url: 'http://api.wordnik.com/v4/resources.json',
        success: function() {
            wordnik.words.getRandomWord(randomParams, {responseContentType: 'application/json'}, function(res) {
                var word = res.obj.word + 'punk';
                post(word, function() { });
            });
        },
        authorizations: {
            'apiKey': new Swagger.ApiKeyAuthorization('api_key', creds.wordnik, 'query')
        }
    });
    console.log(wordnik);
}

doThing();
