import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import Result from './Result';
import Modal from './Modal';

class ResultsContainer extends Component {
  constructor(){
    super();
    this.state = {
      searchResults: [],
      selectedItem: null
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.input !== ''){
      // this.props.setSelectedList()
      let inputURI = nextProps.input.split(' ').join('%20')
      MovieApiAdapter.searchResults(inputURI)
      .then(resp => resp.json())
      .then(json => {
        // API returns matching Shows, Movies, or People. Filter below removes people.
        let filteredResults = json.results.filter((movieOrShow) => {return movieOrShow.media_type !== 'person'} )
        this.setState({searchResults: filteredResults})
      })
    }
    else if(nextProps.resultsOnButtonClick.length > 0){
      this.setState({searchResults: nextProps.resultsOnButtonClick})
    } else {
      this.setState({searchResults: [] })
    }
  }

  displayResults = () => {
    let filteredResults = this.state.searchResults
    if(this.props.selectedFilter === 'movies'){
      filteredResults = filteredResults.filter(movieOrShow => movieOrShow.media_type === 'movie')
    }
    if(this.props.selectedFilter === 'tv'){
      filteredResults = filteredResults.filter(movieOrShow => movieOrShow.media_type === 'tv')
    }
    return filteredResults.map((result, index) => {
      if (Object.keys(result).includes('name')){
        return <Result key={result.id} friend={result} />
      } else {
        return <Result key={result.id} currentMovieOrShow={result} setSelectedItem={this.setSelectedItem}/>
      }
    })
  }

  setSelectedItem = (item) => {
    this.setState({
      selectedItem: item
    })
  }

  render(){
    console.log(this.state.searchResults)
    return(
      <div>
        <Card.Group>{this.displayResults()}</Card.Group>
        {this.state.selectedItem ? <Modal selectedItem={this.state.selectedItem} setSelectedItem={this.setSelectedItem} allLists={this.props.allLists} userID={this.props.userID} /> : null}
        <div className="delete-list-button">{this.props.selectedList.length > 0 ? <Button negative onClick={this.props.handleListDelete}>Delete List</Button> : null}</div>
      </div>
    )
  }
}

export default ResultsContainer;
