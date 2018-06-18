require('marko/node-require')

const express = require('express')
const markoExpress = require('marko/express')
const homeTemplate = require('./home/home.marko')

const app = express()
app.use(express.static('public'))
app.use(markoExpress())
app.get('/', (req, res) => {
  res.marko(homeTemplate, {})
})

const port = process.env.PORT || 5000
app.listen(port)
