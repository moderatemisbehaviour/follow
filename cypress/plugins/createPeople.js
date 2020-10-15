const fs = require('fs')

async function createPeople(databaseClient) {
  const numberOfPeople = 13
  const dan = JSON.parse(
    fs.readFileSync('cypress/fixtures/people/dan.json', 'utf8')
  )

  const dans = []
  for (let i = 1; i <= numberOfPeople; i++) {
    dans.push({
      ...dan,
      name: `${dan.name} ${i}`,
      popularity: i
    })
  }
  const result = await databaseClient.db.collection('people').insertMany(dans)
  const people = result.ops

  return people
}

module.exports = createPeople
