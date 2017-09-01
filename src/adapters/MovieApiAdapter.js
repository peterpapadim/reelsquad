class MovieApiAdapter {

  static searchResults(input){
    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=e5a611fc95f5e1b8c6b311447c94ee76&language=en&query=${input}&page=1&include_adult=false`)
  }

  static upcomingReleases() {
    let today = new Date()

    let startDD = today.getDate()
    let startMM = today.getMonth() + 1
    let startYYYY = today.getFullYear()
    let startDate = `${startYYYY}-${startMM}-${startDD}`

    let endDD = 22
    let endMM = startMM
    let endYYYY = startYYYY
      for(let i = 0; i < 3; i++){
        if(endMM < 12){
          endMM += 1
        } else {
          endMM = 1
          endYYYY += 1
        }
      }
    let endDate = `${endYYYY}-${endMM}-${endDD}`

    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&api_key=e5a611fc95f5e1b8c6b311447c94ee76`)
  }
}

export default MovieApiAdapter;
