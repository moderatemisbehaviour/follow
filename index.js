const express = require('express')
const app = express()

app.use(express.static('public'))
app.get('/', (req, res) => res.send('Hello World!'))
const port = process.env.PORT || 5000
app.listen(port)
