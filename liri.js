require("dotenv").config();
var request = require('request');
var inquirer = require("inquirer");
var keys = require('./keys');
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var spotifyIn = "";
var omdbIn = "";

var songName = "";
var movieName = "";

function spotifyReq (userInput){
    inquirer.prompt([
        {
            type: "input",
            message: "What song would you like to search for?",
            name: "song"
        }
    ]).then(function(answer){
        songName = answer.song
        spotify.search(
            {
                type: "track",
                query: songName
            }, 
            function(err, data){
                if(err){
                    console.log(err);
                    console.log(" ");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log(" ");
                    console.log("Song not found search for another or something else?")
                    console.log(" ");
                    firstPrompt();
                }else{
                    console.log(data);
                    var song = data.tracks.items;
                    for(var i=0; i<song.length; i++){
                        console.log(" ");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log(" ");
                        console.log("song name: " + song[i].name);
                        console.log(" ");
                        console.log("artist(s): ");
                        console.log(" ");
                        console.log("album: " + song[i].album.name);
                        console.log(" ");
                        console.log("preview song: " + song[i].preview_url);
                        console.log(" ");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    };
                };
            }
        );
   
    });
}

function omdbReq (){
    request("http://www.omdbapi.com/?apikey= " + show, function(error, response, body) {
        var data = JSON.parse(body);
    })
}

var firstPrompt = function(prompt){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to search for?",
            choices: ["Song","Movie"],
            name: "selection",
        }
    ]).then(function(inquirerResponse){
        if(inquirerResponse.selection === "Song"){
            spotifyReq();
        }else{
            omdbReq();
        }
    });

};

firstPrompt();