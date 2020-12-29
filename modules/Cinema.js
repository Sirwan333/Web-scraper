const request = require('request')
const cheerio = require('cheerio')
const Calender = require('./Calendar.js')
const fetch = require('node-fetch')

module.exports = {
  getTheMovie: getTheMovie
}
let availableDays = []
let availableMovies = ['01', '02', '03']
let promises = []

async function fetchURL (url) {
  return new Promise(async (resolve, reject) => {
    for await (const day of availableDays) {
        for await (const movie of availableMovies)  {
        let response = await fetch(`${url}/check?day=${day}&movie=${movie}`)
        let commits = await response.json()
        console.log(JSON.stringify(commits))
        
      }
      resolve()
    }
  })
}

function getDays () {
  return new Promise((resolve, reject) => {
    const d = Calender.retDay()
    for  (const element of d) {
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
  }).then(() => getDays()).then(() => fetchURL(url1))
}
