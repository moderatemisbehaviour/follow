module.exports = async function (db) {
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
}
