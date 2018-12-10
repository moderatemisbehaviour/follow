const expressSession = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const configurationReader = require('../configuration-reader');

var configuration = configurationReader.read();

const TWITTER_CONSUMER_KEY = configuration['consumerKey'];
const TWITTER_CONSUMER_SECRET = configuration['consumerSecret'];

var user =
{
  name: 'Barry',
  id: 'bazza'
};

module.exports = function setup(app)
{
  app.use(expressSession({ secret: 'flappy doodle wotsit' }));
  app.use(passport.initialize());
  app.use(passport.session());

  setupPassportSerializationAndDeserialization();
  setupTwitterAuth();

  app.get('/login', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', passport.authenticate(
    'twitter', { failureRedirect: '/login' }),
    function(req, res)
    {
      console.log('Twitter authorisation successful.')
      res.redirect('/suggestions');
    }
  );
}

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
