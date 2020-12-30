const request = require('request')
const request1 = require('request-promise')
const cheerio = require('cheerio')

let location
let cookie
const availbleMovies = []
/**
 * It sends post request to the resturant login with crednitals and then a saves the cookie and location.
 *
 * @param {string} url url of the resturant
 * @returns {Promise} a new promise when scraping is done.
 */
async function submitLogin (url) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const options = {
      url: url + '/login',
      json: true,
      redirect: 'manual',
      simple: false,
      body: {
        username: 'zeke',
        password: 'coys',
        submit: 'login'
      }
    }
    await request1.post(options, (err, res, html) => {
      if (err) {
        return console.log(err)
      }
      location = res.headers.location
      cookie = res.headers['set-cookie'][0].split(';')[0]
    })
    resolve()
  }).then(() => getPage(cookie, location, url)).catch(() => console.log('Failed'))
}
/**
 * It sends post request to the resturant login with crednitals and then a saves the cookie and location.
 *
 * @param {object} cookie the cookie after login.
 * @param {object} location location of the next page after login.
 * @param {string} url url of the resturant
 * @returns {Promise} a new promise when scraping is done.
 */
function getPage (cookie, location, url) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const options1 = {
      url: url + '/' + location,
      headers: {
        cookie: cookie
      }
    }
    request.get(options1, async (err, res, html) => {
      if (err) {
        return console.log(err)
      }
      const $ = cheerio.load(html)
      const days = $('b')
      $(days).each((index, elm) => {
        const elemnt = $(elm).parent().parent().next().next().children()
        $(elemnt).each((i, el) => {
          if ($(el).text().replace(/\s\s+/g, '').charAt(7) === 'r') {
            availbleMovies.push({
              day: $(elm).text().replace(/\s\s+/g, ''),
              time: parseInt($(el).text().replace(/\s\s+/g, '').substring(0, 2))
            })
          }
        })
      })
      console.log('Scraping possible reservations...OK\n')
      resolve()
    })
  })
}
module.exports = {
  submitLogin: submitLogin,
  availbleMovies: availbleMovies
}
