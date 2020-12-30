const request = require('request')
const cheerio = require('cheerio')
const Calender = require('./modules/Calendar.js')
const Cinema = require('./modules/Cinema.js')
const Restaurant = require('./modules/Restaurant.js')
const Scraper = require('./modules/Scraper.js')
const fetch = require('node-fetch')

const array = []
const p = new Promise((resolve, reject) => {
  request('https://cscloud6-127.lnu.se/scraper-site-2', (err, response, html) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(html)
      const elemnt = $('ol').children('li')
      $(elemnt).each((i, el) => {
        const url = $(el).find('a').attr('href')
        array.push(url)
        resolve()
      })
    }
  })
}).then(() => Calender.getTheDay(array[0]))
  .then(() => Cinema.getTheMovie(array[1]))
  .then(() => Restaurant.submitLogin(array[2]))
  .then(() => Scraper.seeRes())
  .catch(() => console.log('Failed'))
