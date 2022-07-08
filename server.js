'use strict';

var Twitter = require('twitter');
var express = require('express');
var generate = require('./lib/generate');
var app = express();

var http = require('http');

function keepAlive() {
    try {
        http.get('http://whispering-harbor-30111.heroku.com');
        console.log('GET request sent, kept alive');
    } catch (e) {
        console.log(e);
    }
}
setInterval(keepAlive, 600000);

var port = process.env.PORT || 3000;
var tweetInterval = process.env.TWEET_INTERVAL || 1800000; //1800000 tweet after every 30min

var tweet = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
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

