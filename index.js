const express = require('express');
require('marko/node-require').install();

var app = express();
app.use(express.static('public'));

require('./suggestions')(app);
require('./auth')(app);

app.get('/', function (req, res)
{
  var hasSession = false;
  var templatePath = hasSession ? './dashboard/dashboard.marko' : './home/home.marko'
  var template = require(templatePath);
  template.render({}, res);
})

app.get('/dashboard', function(req, res)
{
  var template = require('./dashboard/dashboard.marko');
  template.render({}, res);
})

app.listen(80, function()
{
  console.log("Server started.");
})
