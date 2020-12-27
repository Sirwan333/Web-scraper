const request = require('request')
const cheerio = require('cheerio')

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
})

p.then(() => {
  console.log(array[0])
}).then(() => {
  console.log(array[1])
}).then(() => {
  console.log(array[2])
}).catch(() => {
  console.log('Failed')
})
