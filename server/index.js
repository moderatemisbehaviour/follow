const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/person/search', (req, res) => {
  res.json([
    {
      name: 'Siobhan Wilson',
      twitter: 'https://twitter.com/siobhanisback'
    },
    {
      name: 'Elon Musk',
      twitter: 'https://twitter.com/elonmusk'
    }
  ])
})
app.get('/person/:personId', (req, res) => {
  // Not yet implemented.
})

const port = process.env.PORT || 5001
app.listen(port)
