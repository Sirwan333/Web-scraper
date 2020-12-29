const request = require('request')
const request1 = require('request-promise')
const cheerio = require('cheerio')

let location
let cookie
const availbleMovies = []

async function submitLogin (url) {
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
      /* const $ = cheerio.load(html)
      const elemnt = $('p') */
      console.log(`Status: ${res.statusCode}`)
      location = res.headers.location
      cookie = res.headers['set-cookie'][0].split(';')[0]
      console.log(location)
      console.log(cookie)
      // console.log(elemnt)
    })
    resolve()
  }).then(() => getPage(cookie, location, url)).catch(() => console.log('Failed'))
}

function getPage (cookie, location, url) {
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
          availbleMovies.push({
            day: $(elm).text(),
            time: $(el).text()
          })
        })
      })
      console.log(availbleMovies)
    })
    resolve()
  })
}
module.exports = {
  submitLogin: submitLogin,
  availbleMovies: availbleMovies
}
