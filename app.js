const request = require('request')
const cheerio = require('cheerio')
const Calender = require('./modules/Calendar.js')
const Cinema = require('./modules/Cinema.js')
const Restaurant = require('./modules/Restaurant.js')
const Result = require('./modules/Result.js')

const array = []
/**
 * It scrapes the three links of the starting page.
 *
 * @param {string} url the start url from the command line
 * @returns {Promise} a new promise when scraping links is done and then moves to other promises
 */
async function startScraping (url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, html) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const elemnt = $('ol').children('li')
        $(elemnt).each((i, el) => {
          const url = $(el).find('a').attr('href')
          array.push(url)
        })
        console.log('Scraping links...OK')
        resolve()
      }
    })
  }).then(() => Calender.getTheDay(array[0]))
    .then(() => Cinema.getTheMovie(array[1]))
    .then(() => Restaurant.submitLogin(array[2]))
    .then(() => Result.seeRes())
    .catch(() => console.log('Failed'))
}

if (process.argv[2]) {
  startScraping(process.argv[2])
} else {
  console.log('Please make sure you have provided the url')
}
