const twitterClient = require('../clients/twitter');

function Suggestions(platform, userId)
{
  this.platform = platform;
  this.userId = userId;
}

Suggestions.prototype.get = function(callback)
{
  twitterClient.getFriends(callback);
}

module.exports = Suggestions;
