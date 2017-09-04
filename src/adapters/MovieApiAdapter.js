class MovieApiAdapter {

  static searchResults(input){
    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=e5a611fc95f5e1b8c6b311447c94ee76&language=en&query=${input}&page=1&include_adult=false`)
  }

  static upcomingReleases() {
    let today = new Date()
    let twoMonths = new Date(+new Date + 5184e6)

    let startDD = today.getDate()
    let startMM = today.getMonth() + 1
    let startYYYY = today.getFullYear()
    let startDate = `${startYYYY}-${startMM}-${startDD}`

    let endDD = twoMonths.getDate()
    let endMM = twoMonths.getMonth() + 1
    let endYYYY = twoMonths.getFullYear()
    let endDate = `${endYYYY}-${endMM}-${endDD}`

    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&api_key=e5a611fc95f5e1b8c6b311447c94ee76`)
  }

  static newReleases() {
    let twoWeeksAgo = new Date(+new Date - 12096e5)
    let today = new Date()

    let startDD = twoWeeksAgo.getDate()
    let startMM = twoWeeksAgo.getMonth() + 1
    let startYYYY = twoWeeksAgo.getFullYear()
    let startDate = `${startYYYY}-${startMM}-${startDD}`

    let endDD = today.getDate()
    let endMM = today.getMonth() + 1
    let endYYYY = today.getFullYear()
    let endDate = `${endYYYY}-${endMM}-${endDD}`

    return fetch(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&api_key=e5a611fc95f5e1b8c6b311447c94ee76`)
  }

  static popularMovies() {
    return fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e5a611fc95f5e1b8c6b311447c94ee76')
  }
}

export default MovieApiAdapter;
