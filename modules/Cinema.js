const request = require('request')
const cheerio = require('cheerio')
const Calender = require('./Calendar.js')
const fetch = require('node-fetch')

const availableDays = []
const movies = []
const avMovie = []
/**
 * It sends get request to the movies according to the available days.
 *
 * @param {string} url url of the cienma
 * @returns {Promise} a new promise when scraping is done.
 */
async function fetchURL (url) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    for await (const day of availableDays) {
      for await (const movie of movies) {
        const response = await fetch(`${url}/check?day=${day}&movie=${movie.value}`)
        const commits = await response.json()
        for await (const element of commits) {
          if (element.status !== 0) {
            if (day === '05') {
              avMovie.push({
                day: 'Friday',
                time: parseInt(element.time.substring(0, 2)),
                movie: movie.movie
              })
            } else if (day === '06') {
              avMovie.push({
                day: 'Saturday',
                time: parseInt(element.time.substring(0, 2)),
                movie: movie.movie
              })
            } else if (day === '07') {
              avMovie.push({
                day: 'Sunday',
                time: parseInt(element.time.substring(0, 2)),
                movie: movie.movie
              })
            }
          }
        }
      }
    }
    console.log('Scraping showtimes...OK')
    resolve()
  })
}
/**
 * It changes the available days to numbers to use them in the get rquest.
 *
 * @returns {Promise} a new promise when scraping is done.
 */
function getDays () {
  return new Promise((resolve, reject) => {
    const d = Calender.retDay()
    for (const element of d) {
      if (element === 'Friday') {
        const day = '05'
        availableDays.push(day)
      }
      if (element === 'Saturday') {
        const day = '06'
        availableDays.push(day)
      }
      if (element === 'Sunday') {
        const day = '07'
        availableDays.push(day)
      }
    }
    resolve()
  })
}
/**
 * It starts scraping the cienma page.
 *
 * @param {string} url1 the url of the cienma page.
 * @returns {Promise} a new promise when scraping is done.
 */
function getTheMovie (url1) {
  return new Promise((resolve, reject) => {
    resolve()
  }).then(() => getDays()).then(() => getAvailabeMovies(url1)).then(() => fetchURL(url1))
}
/**
 * It scrapes the movie page to get all available movies.
 *
 * @param {any} url the url of the movie
 * @returns {Promise} a new promise when scraping is done.
 */
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
