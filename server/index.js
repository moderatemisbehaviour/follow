const express = require('express')
const app = express()

app.use(express.static('../client/build'))

app.get('/person/search', (req, res) => {
  let query = req.query.q
  let responseJson = []
  if (query) {
    responseJson = [
      {
        name: 'Siobhan Wilson',
        twitter: 'https://twitter.com/siobhanisback'
      },
      {
        name: 'Elon Musk',
        twitter: 'https://twitter.com/elonmusk'
      }
    ]
  }
  res.json(responseJson)
})

app.get('/person/:personId', (req, res) => {
  // Not yet implemented.
})

const port = process.env.PORT || 5000
app.listen(port)
