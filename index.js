const http = require('http');
const https = require('https');
const fs = require('fs');
const dispatcher = require('httpdispatcher');

const hostname = '127.0.0.1';
const port = 8080;

getTweet();

function getTweet()
{
  const baseUriTwitterApi = 'https://api.twitter.com';
  const pathGetTweet = '1.1/statuses/show/';
  var baseUriTestApi = 'http://jsonplaceholder.typicode.com';
  var getTimeline = 'statuses/mentions_timeline.json'
  var getTweetUrl = buildGetTweetUrl(699139112276729856);
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

dispatcher.setStatic('client');

dispatcher.onGet('/', (req, res) =>
{
  res.writeHead(200, {'Content-Type': 'application/json'});
  // fs.readFile('client/index.html', (err, data) =>
  // {
  //   if (err) throw err;
  //   res.write(data);
  //   res.end();
  // });
  const baseUriTwitterApi = 'https://api.twitter.com';
  const pathGetTweet = '1.1/statuses/show/';
  var baseUriTestApi = 'http://jsonplaceholder.typicode.com';
  var getTimeline = 'statuses/mentions_timeline.json'
  var getTweetUrl = buildGetTweetUrl(699139112276729856);
  var authorizationHeaderValue = 'OAuth oauth_consumer_key="Uz0YyOZRvLx0BcclLv8v9iac0", oauth_nonce="f274af8ea86643341c86e344fed2a68f", oauth_signature="v2kjkBXkIJTy88fi64Z0GMmW6LM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1467748216", oauth_token="3003292276-64LyMFL1d8GBnxjjZjQClmEVtV5FWY9TOCRLfr8", oauth_version="1.0"';

  var req = https.request
  (
    {
      host: 'api.twitter.com',
      path: '1.1/statuses/show/699139112276729856.json',
      headers:
      {
          Authorization: 'OAuth oauth_consumer_key="Uz0YyOZRvLx0BcclLv8v9iac0", oauth_nonce="97b4a82751df1bc7249ee67875136011", oauth_signature="88ihMJAThfkYOPwpmTMpUD3K9GM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1467753123", oauth_token="3003292276-64LyMFL1d8GBnxjjZjQClmEVtV5FWY9TOCRLfr8", oauth_version="1.0"'
      }
    },
    (response) =>
    {
      res.write('hi');
      res.end();
    }
  );
  req.end();
  // res.end('hi');
});

dispatcher.onGet('/getTweet', (req, res) =>
{
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('getTweet');
})

dispatcher.onGet('/ping', (req, res) =>
{
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('pong');
})

// http.createServer(handleRequest)
// .listen(port, hostname, () =>
// {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

function handleRequest(req, res)
{
  dispatcher.dispatch(req, res);
}

function doSomething()
{
  alert('you called me.');
  var baseUriTestApi = 'http://jsonplaceholder.typicode.com';
  var getTimeline = 'statuses/mentions_timeline.json'
  var getTweetUrl = buildGetTweetUrl(699139112276729856);
  var authorizationHeaderValue = 'OAuth oauth_consumer_key="Uz0YyOZRvLx0BcclLv8v9iac0", oauth_nonce="f274af8ea86643341c86e344fed2a68f", oauth_signature="v2kjkBXkIJTy88fi64Z0GMmW6LM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1467748216", oauth_token="3003292276-64LyMFL1d8GBnxjjZjQClmEVtV5FWY9TOCRLfr8", oauth_version="1.0"';

  $('#request').text( JSON.stringify(getTweetUrl, null, 4) );

  $.ajax(
  {
    url: getTweetUrl,
    headers:
    {
      Authorization: authorizationHeaderValue,
      Host: 'api.twitter.com',
      'X-Target-URI': 'https://api.twitter.com',
      Connection: 'Keep-Alive'
    }
  })
  .then(function(data)
  {
    $('#response').text( JSON.stringify(data, null, 4) );
  })
}

function buildGetTweetUrl(id)
{
  const baseUriTwitterApi = 'https://api.twitter.com/1.1/';
  const pathGetTweet = 'statuses/show/';
  return baseUriTwitterApi + pathGetTweet + id + '.json';
}
