require("dotenv").config();

var command = process.argv[2];
var keyWord = process.argv[3];


var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



function spotifyThisSong() {
  if (!keyWord){
    keyWord = 'Ace of Base "The Sign"'
  }
  spotify.search({
      type: 'track',
      query: keyWord
    },
    function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      var results = data.tracks.items[0]
      // console.log(results);
      console.log("Artist: " + results.album.artists[0].name);
      console.log("Song: " + results.name);
      console.log("Preview: " + results.external_urls);
      console.log("Album: " + results.album.name);

    });
}

function displayTweets() {
  var params = {
    TessaWi16603960: 'nodejs'
  };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets[i].text.length; i++) {

        console.log("Tweet: " + tweets[i].text);
        console.log("Created on: " + tweets[i].created_at);
        console.log("-------------");
      }
    } else {
      console.log(error)
    }
  });
}


function movieThis() {
  if(!keyWord){
    keyWord = "Mr. Nobody"
  }
  var request = require("request");
request("http://www.omdbapi.com/?t=" + keyWord + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("The movie's rating is: " + body);
    console.log("---------------")
   
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
}

function doWhatItSays (){
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (!err){
      var doWhatItSaysResults = data.split(",");
       command = doWhatItSaysResults[0];
      // if(doWhatItSaysResults[0] === spotifyThisSong){
     
      keyWord = doWhatItSaysResults[1];
        spotifyThisSong(keyWord);
        
      // }
          
    }else{
      console.log(err);
  }
  });

}


if (command === "spotify-this-song") {
  spotifyThisSong();
} else if (command === "my-tweets") {
  displayTweets();
} else if (command === "movie-this"){
movieThis();
}else if (command === "do-what-it-says"){
  doWhatItSays();
}




