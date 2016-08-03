const http = require('http');
const https = require('https');
const dispatcher = require('httpdispatcher');
const express = require('express');
const auth = require('./auth/auth');

var app = express();

auth.setup(app);

app.get('/', function (req, res)
{
  res.send('Follow people, not platforms.');
})

app.get('/dashboard', function(req, res)
{
  res.send('Here you can see who you are following and which platforms you are following them on.')
})

app.listen(80, function() {
  console.log("Server started.");
})
