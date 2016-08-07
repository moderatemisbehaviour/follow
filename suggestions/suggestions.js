const twitterClient = require('../clients/twitter');

function Suggestions(platform, userId)
{
  this.platform = platform;
  this.userId = userId;
}

Suggestions.prototype.get = function()
{
  return twitterClient.getFriends();
}

module.exports = Suggestions;
