const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/api/persons', (req, res) => {
  params=req.body

  // Check for missing name or paramater
  if (!params['name'] || !params['id']) {
    console.log("Missing name or Id!")
    res.sendStatus(400)
  } else if(params['age'] < 0) {
    console.log("Invalid age!")
    res.sendStatus(400)
  } else {
    console.log("Successfully added person: ", params)
    res.sendStatus(201)
  }
})



app.listen(port)
