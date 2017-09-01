import React, { Component } from 'react';
import Logout from './Logout'
import TextBox from './TextBox'
import MovieTvFilter from './MovieTvFilter'
import ResultsContainer from './ResultsContainer'
import { Grid, Button, Segment } from 'semantic-ui-react'
import MovieApiAdapter from '../adapters/MovieApiAdapter';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      selectedFilter: '',
      resultsOnButtonClick: []
    }
  }

  setInput = (newInput) => {
    this.setState({
      input: newInput
    })
  }

  setSelectedFilter = (selected) => {
    this.setState({
      selectedFilter: selected
    })
  }

  setUpcomingReleases = () => {
    this.setState({input: ''})
    MovieApiAdapter.upcomingReleases()
    .then(resp => resp.json())
    .then(json => {
      this.setState({resultsOnButtonClick: json.results})
    })
  }

  render(){
    console.log(this.state.resultsOnButtonClick)
    return(
      <div>

        <div className='left-column'>
          <div className='featured-content'>
            <div className='logo-container'>
            </div>
            <div className='featured-links-container'>
              <h3>Featured</h3>
                <div>
                  <Segment inverted>
                    <Button inverted onClick={this.setUpcomingReleases}>Upcoming Releases</Button><br/>
                    <Button inverted>New Releases</Button><br/>
                    <Button inverted>Popular</Button><br/>
                    <Button inverted>Genres</Button><br/>
                    <Button inverted>Friends</Button><br/>
                  </Segment>
                </div>
            </div>
          </div>
          <div className='lists'>
          </div>
        </div>

        <div className='right-column'>
          <div className='search'>
            <span className='name-logout'>{this.props.loginStatus.firstName} {this.props.loginStatus.lastName}  <Logout /></span>
            <TextBox setInput={this.setInput}/>
            <MovieTvFilter setSelectedFilter={this.setSelectedFilter}/>
          </div>
          <div className='results'>
            <ResultsContainer input={this.state.input} selectedFilter={this.state.selectedFilter} resultsOnButtonClick={this.state.resultsOnButtonClick}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Home;
