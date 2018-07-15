const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.static('home'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home/home.html')
})
app.get('/person/search', (req, res) => {
  res.json({
    name: 'Siobhan Wilson',
    twitter: 'https://twitter.com/siobhanisback'
  })
})
app.get('/person/:personId', (req, res) => {
  res.sendFile(__dirname + '/person/person.html')
})

const port = process.env.PORT || 5000
app.listen(port)
