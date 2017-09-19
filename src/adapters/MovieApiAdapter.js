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

  static newReleases(page=null) {
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

  static getYear = (currentMovieOrShow) => {
    if(Object.keys(currentMovieOrShow).includes('first_air_date')){
      return currentMovieOrShow.first_air_date.split('-')[0]
    } else if(currentMovieOrShow.media_type === undefined){
       let releaseDate = currentMovieOrShow.release_date.split('-')
       return `Release Date: ${releaseDate[1]}-${releaseDate[2]}-${releaseDate[0]}`
    } else {
      return currentMovieOrShow.release_date.split('-')[0]
    }
  }

  static getTitle = (currentMovieOrShow) => {
    if(Object.keys(currentMovieOrShow).includes('original_name')){
      return currentMovieOrShow.original_name
    } else {
      return currentMovieOrShow.original_title
    }
  }

  static getImageUrl = (posterPath) => {
    if(posterPath) {
      return `https://image.tmdb.org/t/p/w780/${posterPath}`
    } else {
      return 'noposteravailable.svg'
    }
  }

  static getNameTypeID = (currentMovieOrShow) => {
    if(Object.keys(currentMovieOrShow).includes('original_name')){
      return {title: currentMovieOrShow.original_name, type: 'tv', id: currentMovieOrShow.id}
    } else {
      return {title: currentMovieOrShow.original_title, type: 'movie', id: currentMovieOrShow.id}
    }
  }

  static getMovieByID = (movieID) => {
    return fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=e5a611fc95f5e1b8c6b311447c94ee76&language=en-US`)
  }

  static getTVByID = (tvID) => {
    return fetch(`https://api.themoviedb.org/3/tv/${tvID}?api_key=e5a611fc95f5e1b8c6b311447c94ee76&language=en-US`)
  }

  static youtubeURL = (id) => {
    return `https://www.youtube.com/embed/${id}`
  }

  static getVideo = (selectedItem) => {
    if(Object.keys(selectedItem).includes('original_name')){
      return fetch(`https://api.themoviedb.org/3/tv/${selectedItem.id}/videos?api_key=e5a611fc95f5e1b8c6b311447c94ee76&language=en-US`)
    } else {
      return fetch(`https://api.themoviedb.org/3/movie/${selectedItem.id}/videos?api_key=e5a611fc95f5e1b8c6b311447c94ee76&language=en-US`)
    }
  }


}

export default MovieApiAdapter;
