const fs = require('fs')

async function createPeople(databaseClient) {
  const numberOfPeople = 13
  const siobhan = JSON.parse(
    fs.readFileSync('cypress/fixtures/siobhan.json', 'utf8')
  )

  const siobhans = []
  for (let i = 1; i <= numberOfPeople; i++) {
    siobhans.push({
      ...siobhan,
      name: `${siobhan.name} ${i}`,
      popularity: i
    })
  }
  const result = await databaseClient.db
    .collection('people')
    .insertMany(siobhans)
  const people = result.ops

  return people
}

module.exports = createPeople
