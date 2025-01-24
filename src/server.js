const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/api/persons', (req, res) => {
  params=req.body

  console.log(params['name'])
  if (!params['name'] || !params['id']) {
    res.sendStatus(400)
  } else {
    res.sendStatus(201)
  }
})

app.listen(port)
