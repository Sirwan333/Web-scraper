const Cinema = require('./Cinema.js')
const Restaurant = require('./Restaurant.js')

async function seeRes () {
  return new Promise((resolve, reject) => {
    console.log('Recommendations')
    console.log('===============')
    for (const movie of Cinema.avMovie) {
      for (const table of Restaurant.availbleMovies) {
        if (movie.day === table.day) {
          if (movie.time < table.time) {
            console.log(`* On ${movie.day} you can watch the movie "${movie.movie}" which starts at ${movie.time} and then there is a free table between ${table.time}:00 - ${table.time + 2}:00`)
          }
        }
      }
    }
    resolve()
  })
}

module.exports = {
  seeRes: seeRes
}
