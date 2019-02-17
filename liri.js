require("dotenv").config();

// Initializing all Packages
var fs = require("fs");
var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify)

// User Inputs (ex: node liri.js <userChoice> <userQuery>)
var userChoice = process.argv[2];
var userQuery = process.argv[3];

//switch for reading the user input and running the appropiate function
switch (userChoice) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        logThis("Please enter a valid search term, such as {concert-this},");
        logThis("{spotify-this-song}, {movie-this}, or {do-what-it-says}");
        break;
}

// spotify-this-song Function
function spotifyThis() {

    // Catch empty input and outputs "the sign"
    if (!userQuery) {
        userQuery = "The Sign Ace of Base";
    }

    spotify.search({type: "track", query: userQuery}, function(err, data) {
        if (err) {
            logThis(err);
        }

        var userSong = data.tracks.items;
        //below logs into the log.txt
        logThis("Artist: " + userSong[0].artists[0].name);
        logThis("Song Name: " + userSong[0].name);
        logThis("Preview Link: " + userSong[0].preview_url);
        logThis("Album: " + userSong[0].album.name);
    });
};

// if user does a movie-this, movies function runs
function movies() {

    //if empty request, the default request is "mr nobody" and logs it  
    if (!userQuery) {
        userQuery = "Mr. Nobody";
        logThis("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
        logThis("It's on Netflix!");
    }
    // using axios to request omdb api ingo
    axios.get("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=" + keys.movies.id)
    .then(function(response) {
        //below logs into the log.txt
        logThis("Title: " + response.data.Title);
        logThis("Year Released: " + response.data.Year);
        logThis("IMDB rating: " + response.data.imdbRating);
        logThis("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        logThis("Country/Countries Produced: " + response.data.Country);
        logThis("Language: " + response.data.Language);
        logThis("Plot: " + response.data.Plot);
        logThis("Cast: " + response.data.Actors);
    });
};
// function runs if concert-this is in the user input
function concertThis() {
  //default input if none inputted 
    if (!userQuery) {
        userQuery = "Bruno Mars";
    }
    axios.get("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + keys.bands.id)
    .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            //afer axios has requested bandsintown api info, it logs in the log.txt
            logThis("Venue Name: "+ response.data[i].venue.name);
            logThis("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            logThis("Date of the Event: " + moment(response.data[i].datetime).format("L"));
        }
    });
}
//function to read from random.txt, and then it spotifies it through the spotify function
function doThis () {
    fs.readFile("random.txt", "utf8", function(err, data) {

        if (err) {
            logThis(err);
        }

        var readArray = data.split(",");

        userQuery = readArray[1];

        spotifyThis(userQuery);
    })
};

//logs various output into the log.txt file
function logThis (logQuery) {

    console.log(logQuery);

    fs.appendFile("log.txt", logQuery, function(err) {
        if (err) {
            return logThis("Error: " + err);
        }
    });
};