const request = require('request')
const cheerio = require('cheerio')

module.exports = {
  getTheDay: getTheDay,
  retDay: retDay
}

const person1 = []
const person2 = []
const person3 = []
const array = []
const days = []
function getTheDay (url1) {
  return new Promise((resolve, reject) => {
    request(`${url1}`, (err, response, html) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const elemnt = $('ul').children('li')
        $(elemnt).each((i, el) => {
          const url = $(el).find('a').attr('href')
          array.push(`${url1}${url}`)
        })
        resolve()
      }
    })
  }).then(
    () => checkForAvailbilty(0, array[0]))
    .then(() => checkForAvailbilty(1, array[1]))
    .then(() => checkForAvailbilty(2, array[2]))
    .then(() => console.log(person3))
    .catch(() => console.log('Failed'))
}

function checkForAvailbilty (index, url) {
  return new Promise((resolve, reject) => {
    request(`${url}`, (err, response, html) => {
      if (!err && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const elemnt = $('td')
        $(elemnt).each((i, el) => {
          const url = $(el).text()
          if (index === 0) {
            person1.push(url)
          } else if (index === 1) {
            person2.push(url)
          } else if (index === 2) {
            person3.push(url)
          }
        })
        resolve()
      }
    })
  })
}

function retDay () {
  if (person1[0].toLowerCase() === 'ok' && person2[0].toLowerCase() === 'ok' && person3[0].toLowerCase() === 'ok') {
    days.push('Friday')
  }
  if (person1[1].toLowerCase() === 'ok' && person2[1].toLowerCase() === 'ok' && person3[1].toLowerCase() === 'ok') {
    days.push('Saturday')
  }
  if (person1[2].toLowerCase() === 'ok' && person2[2].toLowerCase() === 'ok' && person3[2].toLowerCase() === 'ok') {
    days.push('Sunday')
  }
  return days
}
