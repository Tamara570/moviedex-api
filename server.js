require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const moviedex = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))

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
      Number(movie.avg_vote) >= Number(req.query.avg_vote)
      )
  }

  res.json(response)
})

app.listen(8000, () => {
  console.log("Server listening at http://localhost:8000")
})