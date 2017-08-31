import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter'

class ResultsContainer extends Component {
  constructor(){
    super();
    this.state = {
      searchResults: [],
      selectedItem: null
    }
  }

  displayResults = () => {

  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.input !== ''){
      let inputURI = nextProps.input.split(' ').join('%20')
      MovieApiAdapter.searchResults(inputURI)
      .then(resp => resp.json())
      .then(json => {
        let filteredResults = json.results.filter((movie) => {return Object.keys(movie).includes('original_name')} )
        this.setState({searchResults: filteredResults})
      })
    }
  }

  render(){
    console.log(this.state.searchResults)
    return(
      <div>
        {this.state.searchResults.size > 0 ? this.displayResults() : null}
      </div>
    )
  }
}

export default ResultsContainer;
