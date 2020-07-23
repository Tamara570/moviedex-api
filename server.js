require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const moviedex = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())


//make sure we have the API token in place
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }

  next()
})

app.get('/movie', function handleGetMovie(req, res) {
  let response = moviedex;

  //filter movies by genre
  if (req.query.genre) {
    response = response.filter(moviedex =>
      moviedex.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  //filter movies by country
  if (req.query.country) {
    response = response.filter(moviedex => 
      moviedex.country.toLowerCase().includes(req.query.country.toLowerCase())
      )
  }

  //filter movies by avg_vote
  if (req.query.avg_vote) {
    response = response.filter(moviedex => 
      Number(moviedex.avg_vote) >= Number(req.query.avg_vote)
      )
  }

  res.json(response)
})

app.listen(8000, () => {
  console.log("Server listening at http://localhost:8000")
})