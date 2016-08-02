const http = require('http');
const https = require('https');
const dispatcher = require('httpdispatcher');
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const configurationReader = require('./configuration-reader');

var configuration = configurationReader.read();
const TWITTER_CONSUMER_KEY = configuration['consumerKey'];
const TWITTER_CONSUMER_SECRET = configuration['consumerSecret'];

var app = express();
app.use(expressSession({ secret: 'flappy doodle wotsit' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res)
{
  res.send('Follow people, not platforms.');
})

app.get('/login', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate(
  'twitter', { failureRedirect: '/login' }),
  function(req, res)
  {
    console.log('Twitter authorisation successful.')
    res.redirect('/dashboard');
  });

app.get('/dashboard', function(req, res)
{
  res.send('Here you can see who you are following and which platforms you are following them on.')
})

var user =
{
  name: 'Barry',
  id: 'bazza'
};

setupPassportSerializationAndDeserialization();
setupTwitterAuth();

app.listen(80, function() {
  console.log("Server started.");
})

function setupTwitterAuth()
{
  passport.use(new TwitterStrategy
    ({
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, cb)
    {
      console.log("OAuth successful, now in verify callback.")
      var err = null;
      return cb(err, user);
    })
  );
}

function setupPassportSerializationAndDeserialization()
{
  passport.serializeUser(function(user, done)
  {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done)
  {
    var err = null;
    done(err, user);
  });
}

function getTweet()
{
  var getTimeline = 'statuses/mentions_timeline.json'
  var authorizationHeaderValue = 'OAuth oauth_consumer_key="Uz0YyOZRvLx0BcclLv8v9iac0", oauth_nonce="f274af8ea86643341c86e344fed2a68f", oauth_signature="v2kjkBXkIJTy88fi64Z0GMmW6LM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1467748216", oauth_token="3003292276-64LyMFL1d8GBnxjjZjQClmEVtV5FWY9TOCRLfr8", oauth_version="1.0"';

  var req = https.request
  (
    {
      host: 'api.twitter.com',
      path: '/1.1/statuses/show/699139112276729856.json',
      method: 'GET',
      headers:
      {
          Authorization: 'OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1467755804",oauth_nonce="2634415543",oauth_version="1.0",oauth_token="3003292276-in0AsnODNZZEgrHTP1SkmlpUOSjq7qp2EWB7Dar",oauth_signature="r6u7yMtAarCDlYrOxYvEi99cIlo%3D"'
      }
    },
    (res) =>
    {
      console.log(`STATUS: ${res.statusCode}`);
      console.log('\n');
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      console.log('\n');
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    }
  );
  req.end(); // Done with request, send it.
}
