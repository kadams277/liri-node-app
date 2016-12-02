var keys = require("./keys.js");

var Twitter = require("twitter");

var spotify = require('spotify');

var request = require('request');

var arg = process.argv[2];

if (arg === "my-tweets"){
	tweets();
} else if (arg === "spotify-this-song"){
	var songArg = process.argv[3];
	if (songArg === undefined){
		console.log("Didn't supply a song.");
	} else {
		spotifyFunction(songArg);
	}
} else if (arg === "movie-this"){
	var movieArg = process.argv[3];
	if (movieArg === undefined){
		console.log("Didn't supply a movie.");
	} else {
		movieFunction(movieArg);
	}
} else{
	console.log("Sorry, didn't work.");
};

/* =============== Twitter ================== */

function tweets(){
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});

	var params = {screen_name: 'kadams277'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < 20; i++){
	  		console.log(tweets[i].text);
	  		console.log(tweets[i].created_at);
	  	}
	  } else {
	  	console.log(error);
	  }
	});
};

/* =============== Spotify ================== */

function spotifyFunction(song) {

	spotify.search({ type: 'track', query: song}, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    } else {
	    	var info = data.tracks.items[0];
	    	console.log("Artist " + info.artists[0].name + "\nSong: " + info.name + "\nPreview Link: " + info.preview_url + "\nAlbum: " + info.album.name);
	    }   
	});
};

/* =============== OMDB ================== */

function movieFunction(movie){
 
	var options = {
	  url: 'http://www.omdbapi.com/?',
	  qs: movie
	};
	 
	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var info = JSON.parse(body);
	    console.log(response.Title);
	  }
	}
	 
	request(options, callback);
	
	// request.get({ url: 'http://www.omdbapi.com/?' qs: movie}, function (error, response, body) {
 //  		if (!error && response.statusCode == 200) {
 //    		console.log(body); 
 //  		} else {
 //  			console.log("Movie Title: " + response.Title + "\nRelease Date: " + response.Year + "\nIMDB Rating: " + response.imdbRating + "\nCountry: " + response.Country + "\nLanguage: " + response.Language + "\nPlot: " + response.Plot + "\nActors: " + response.Actors + "\nRotten Tomatoes Rating: " + _ + "\nRotten Tomatoes URL: " + _);
 //  		}
	// })

};