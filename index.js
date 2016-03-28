const http = require('http');
const fs = require('fs');
const dispatcher = require('httpdispatcher');

const hostname = '127.0.0.1';
const port = 8080;

dispatcher.setStatic('client');

dispatcher.onGet('/', (req, res) =>
{
  res.writeHead(200, { 'Content-Type': 'text/html' });
  fs.readFile('client/index.html', (err, data) =>
  {
    if (err) throw err;
    res.write(data);
    res.end();
  });
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

http.createServer(handleRequest)
.listen(port, hostname, () =>
{
  console.log(`Server running at http://${hostname}:${port}/`);
});

function handleRequest(req, res)
{
  dispatcher.dispatch(req, res);
}
