const fs = require('fs');

const configurationFile = 'configuration.json';

exports.read = function()
{
  return JSON.parse(fs.readFileSync(configurationFile));
}
