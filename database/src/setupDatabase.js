const fs = require('fs')
const path = require('path')

module.exports = async function(db) {
  await db.createCollection('people')
  await db.command({
    collMod: 'people',
    validator: {
      $jsonSchema: {
        required: ['name', 'profiles'],
        properties: {
          name: {
            type: 'string',
            description: 'The name of the person.'
          },
          profiles: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1
            },
            minItems: 1,
            maxItems: 50,
            uniqueItems: true
          },
          photo: {
            type: 'string',
            description: 'A photo or avatar representing the person.'
          }
        }
      }
    }
  })
  const siobhan = JSON.parse(
    fs.readFileSync(
      path.resolve(`${__dirname}/../../cypress/fixtures/siobhan.json`),
      'utf8'
    )
  )
  const elon = JSON.parse(
    fs.readFileSync(
      path.resolve(`${__dirname}/../../cypress/fixtures/elon.json`),
      'utf8'
    )
  )
  await db.collection('people').insertMany([siobhan, elon])
}
