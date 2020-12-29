const request = require('request')
const cheerio = require('cheerio')
const Calender = require('./Calendar.js')
const fetch = require('node-fetch')

let availableDays = []
let movies = []
let avMovie = []

async function fetchURL (url) {
  return new Promise(async (resolve, reject) => {
    for await (const day of availableDays) {
      for await (const movie of movies) {
        let response = await fetch(`${url}/check?day=${day}&movie=${movie.value}`)
        let commits = await response.json()
        for await (const element of commits) {
          if (element.status !== 0) {
            avMovie.push({
              day: day,
              time: parseInt(element.time.substring(0, 2)),
              movie: movie.movie
            })
          }
        }
      }
    }
    resolve()
  })
}

function getDays () {
  return new Promise((resolve, reject) => {
    const d = Calender.retDay()
    for (const element of d) {
      if (element === 'Friday') {
        let day = '05'
        availableDays.push(day)
      }
      if (element === 'Saturday') {
        let day = '06'
        availableDays.push(day)
      }
      if (element === 'Sunday') {
        let day = '07'
        availableDays.push(day)
      }
    }
    resolve()
  })
}

function getTheMovie (url1) {
  return new Promise((resolve, reject) => {
    resolve()
  }).then(() => getDays()).then(() => getAvailabeMovies(url1)).then(() => fetchURL(url1))
}

function getAvailabeMovies (url) {
  return new Promise((resolve, reject) => {
    request(`${url}`, (err, response, html) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const elemnt = $('#movie option')
        $(elemnt).each((i, el) => {
          if (i > 0) {
            movies.push({
              movie: $(el).text(),
              value: $(el).val()
            })
          }
        })
        resolve()
      }
    })
  })
}
module.exports = {
  getTheMovie: getTheMovie,
  avMovie: avMovie
}
