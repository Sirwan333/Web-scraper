const request = require('request')
const cheerio = require('cheerio')
const Calender = require('./Calendar.js')
const fetch = require('node-fetch')

module.exports = {
  getTheMovie: getTheMovie
}
let availableDays = []

async function fetchURL (url) {
  getDays()
  let response = await fetch(`${url}/check?day=${availableDays[0]}&movie=02`)
  let commits = await response.json()
  console.log(JSON.stringify(commits))
}

function getDays () {
  const d = Calender.retDay()
  d.forEach(element => {
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
  })
}

function getTheMovie (url1) {
  return new Promise((resolve, reject) => {
    resolve()
  }).then(() => fetchURL(url1))
}
