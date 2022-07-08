'use strict';

var Twitter = require('twitter');
var express = require('express');
var generate = require('./lib/generate');
var app = express();
var port = 3000;
var tweetInterval = 5000; //1800000 tweet after every 30min

var tweet = new Twitter({
    consumer_key: '',
    consumer_secret:'',
    access_token_key:'',
    access_token_secret:''
});

function makeTweet() {
    var content = generate();
    tweet.post('statuses/update', {status:content}, function(error, tweet){
        if(error) {console.log(`Error: ${error}`);}
        console.log(`Posted tweet: \"${content}\"`);
    });
}

app.get('/', function (req,res) {
    res.send('Congratulations, you sent a GET request!!!');
    console.log("Recieved a GET request and sent a response!!!");
}); 

app.listen(port, function () {
    console.log('App now listening on port ', port);
});

makeTweet();
setInterval(makeTweet, tweetInterval);

