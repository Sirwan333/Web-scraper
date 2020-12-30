const Cinema = require('./Cinema.js')
const Restaurant = require('./Restaurant.js')

async function seeRes () {
  return new Promise((resolve, reject) => {
    for (const movie of Cinema.avMovie) {
      for (const table of Restaurant.availbleMovies) {
        if (movie.day === table.day) {
          if (movie.time < table.time) {
            console.log(movie.day, movie.time, movie.movie, table.time)
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
