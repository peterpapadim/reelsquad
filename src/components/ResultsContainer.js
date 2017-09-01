import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import Result from './Result';

class ResultsContainer extends Component {
  constructor(){
    super();
    this.state = {
      searchResults: [],
      selectedItem: null
    }
  }

  displayResults = () => {
    console.log('we are in!')
    return this.state.searchResults.map(movieOrShow => <Result key={movieOrShow.id} currentMovieOrShow={movieOrShow} />)
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.input !== ''){
      let inputURI = nextProps.input.split(' ').join('%20')
      MovieApiAdapter.searchResults(inputURI)
      .then(resp => resp.json())
      .then(json => {
        // API returns matching Shows, Movies, or People. Filter below removes people.
        let filteredResults = json.results.filter((movieOrShow) => {return movieOrShow.media_type !== 'person'} )
        this.setState({searchResults: filteredResults})
      })
    }
  }

  render(){
    console.log(this.state.searchResults)
    return(
      <div>
        <Card.Group>{this.displayResults()}</Card.Group>
      </div>
    )
  }
}

export default ResultsContainer;
