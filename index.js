const http = require('http');
const https = require('https');
const dispatcher = require('httpdispatcher');
const express = require('express');
const auth = require('./auth/auth');
const Suggestions = require('./suggestions/suggestions');
const configurationReader = require('./configuration-reader');

var app = express();

auth.setup(app);

app.get('/', function (req, res)
{
  res.send("Follow people, not platforms.");
})

app.get('/suggestions', function(req, res)
{
  var suggestions = new Suggestions('twitter', configurationReader.read().userId);
  suggestions.get();
  res.send("Here are some suggestions based on your Twitter friends.");
})

app.get('/dashboard', function(req, res)
{
  res.send("Here you can see who you are following and which platforms you are following them on.")
})

app.listen(80, function() {
  console.log("Server started.");
})
