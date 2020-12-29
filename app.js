const request = require('request')
const cheerio = require('cheerio')
const Calender = require('./modules/Calendar.js')
const Cinema = require('./modules/Cinema.js')
const Restaurant = require('./modules/Restaurant.js')
const fetch = require('node-fetch')

const array = []
const p = new Promise((resolve, reject) => {
  request('http://vhost3.lnu.se:20080/weekend', (err, response, html) => {
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
  .catch(() => console.log('Failed'))
