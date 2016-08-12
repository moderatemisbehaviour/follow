const express = require('express');
require('marko/node-require').install();

var app = express();

require('./suggestions')(app);
require('./auth')(app);

app.get('/', function (req, res)
{
  res.send("Follow people, not platforms.");
})

app.get('/dashboard', function(req, res)
{
  res.send("Here you can see who you are following and which platforms you are following them on.")
})

app.listen(80, function()
{
  console.log("Server started.");
})
