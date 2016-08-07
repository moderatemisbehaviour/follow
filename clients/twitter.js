const Twitter = require('twitter');
const configurationReader = require('../configuration-reader');

var configuration = configurationReader.read();

var client = new Twitter(
{
  consumer_key: configuration.consumerKey,
  consumer_secret: configuration.consumerSecret,
  access_token_key: configuration.accessToken,
  access_token_secret: configuration.accessTokenSecret
});

var params =
{
  user_id: configuration.userId
}

exports.getFriends = function()
{
  return client.get('friends/list', params, function(error, friends, response)
  {
    logRequestsRemaining(response);
    if (!error)
    {
      // console.log(friends);
      return friends;
    }
  });
}

function logRequestsRemaining(response)
{
  var requestsRemaining = response['headers']['x-rate-limit-remaining'];
  console.log('REQUESTS REMAINING: ' + requestsRemaining);
  var rateLimitResetTimeInEpochSeconds = response['headers']['x-rate-limit-reset'];
  var rateLimitResetTime = new Date(0);
  rateLimitResetTime.setUTCSeconds(rateLimitResetTimeInEpochSeconds)
  console.log('RATE LIMIT RESETS AT: ' + rateLimitResetTime.toTimeString());
}
