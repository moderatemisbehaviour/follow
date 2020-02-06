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
          image: {
            type: 'string',
            description: 'An image representing the person.'
          }
        }
      }
    }
  })
  await db.collection('people').createIndex('popularity', { unique: true })
}
