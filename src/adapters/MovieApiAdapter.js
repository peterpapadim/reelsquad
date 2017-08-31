class MovieApiAdapter {

  static searchResults(input){
    return fetch(`https://api.themoviedb.org/3/search/multi?api_key=e5a611fc95f5e1b8c6b311447c94ee76&language=en-US&query=${input}&page=1&include_adult=false`)
  }
}

export default MovieApiAdapter;
