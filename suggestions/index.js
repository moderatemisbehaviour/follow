var Suggestions = require('./suggestions.js');
const template = require('./suggestions.marko');
const configurationReader = require('../configuration-reader');

module.exports = function(app)
{
  app.get('/suggestions', function(req, res)
  {
    var suggestions = new Suggestions('twitter', configurationReader.read().userId);
    suggestions.get(function(friends)
    {
      var friends = friends;
      template.render(
        {
          friends: friends.users
        }, res);
    });
  })
}
