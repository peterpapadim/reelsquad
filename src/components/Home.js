import React, { Component } from 'react';
import Logout from './Logout'
import TextBox from './TextBox'
import MovieTvFilter from './MovieTvFilter'
import ResultsContainer from './ResultsContainer'
import ListsContainer from './ListsContainer'
import { Grid, Button, Segment } from 'semantic-ui-react'
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import ShowAdapter from '../adapters/ShowAdapter';
import ListAdapter from '../adapters/ListAdapter';

class Home extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      selectedFilter: '',
      selectedList: '',
      // selectedList: '',
      resultsOnButtonClick: [],
      allLists: []
    }
  }

  setLists = (lists) => {
    this.setState({ allLists: [...lists] })
  }

  setSelectedList = () => {
    this.setState({ selectedList: '' })
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
    this.setState({selectedList: ''})
    MovieApiAdapter.upcomingReleases()
    .then(resp => resp.json())
    .then(json => {
      this.setState({resultsOnButtonClick: json.results})
    })
  }

  setNewReleases = () => {
    this.setState({input: ''})
    this.setState({selectedList: ''})
    MovieApiAdapter.newReleases()
    .then(resp => resp.json())
    .then(json => {
      this.setState({resultsOnButtonClick: json.results})
    })
  }

  setPopularMovies = () => {
    this.setState({input: ''})
    this.setState({selectedList: ''})
    MovieApiAdapter.popularMovies()
    .then(resp => resp.json())
    .then(json => {
      this.setState({resultsOnButtonClick: json.results})
    })
  }

  setListItems = (event) => {
    this.setState({selectedList: event.target.innerText})
    this.setState({input: ''})
    this.setState({resultsOnButtonClick: []})
    // let selectedList = event.target.innerText

    ShowAdapter.listShows(this.props.loginStatus.userID, event.target.innerText)
    .then(resp => resp.json())
    .then(json => {
      json.map((show) => {
        if(show.show_type === 'tv'){
          MovieApiAdapter.getTVByID(show.reference_id)
          .then(resp => resp.json())
          .then(json => this.setState({ resultsOnButtonClick: [...this.state.resultsOnButtonClick, json] }))
        } else {
          MovieApiAdapter.getMovieByID(show.reference_id)
          .then(resp => resp.json())
          .then(json => this.setState({ resultsOnButtonClick: [...this.state.resultsOnButtonClick, json] }))
        }
      })
    })
  }

  handleListDelete = () => {
    console.log(this.state.selectedList)
    ListAdapter.delete(this.props.loginStatus.userID, this.state.selectedList)
    .then(resp => resp.json())
    .then(json => this.setLists(json))
    this.setNewReleases()
    // ListAdapter.all(this.props.loginStatus.userID)
    // .then(resp => resp.json())
    // .then(json => this.setLists(json))
  }

  componentDidMount(){
    this.setUpcomingReleases()
  }

  render(){
    console.log(this.state.selectedList)
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
                    <Button inverted color='grey' onClick={this.setUpcomingReleases}>Upcoming Movies</Button><br/>
                    <Button inverted color='grey' onClick={this.setNewReleases}>New Releases</Button><br/>
                    <Button inverted color='grey' onClick={this.setPopularMovies}>Popular</Button><br/>
                    <Button inverted color='grey'>Genres</Button><br/>
                    <Button inverted color='grey'>Friends</Button><br/>
                  </Segment>
                </div>
            </div>
          </div>
          <div className='lists-user'>
            <div className='lists'>
              <h3>My Lists</h3>
              <ListsContainer userID={this.props.loginStatus.userID} setLists={this.setLists} allLists={this.state.allLists} setListItems={this.setListItems}/>
            </div>
            <div className='user'>
              <p>{this.props.loginStatus.firstName} {this.props.loginStatus.lastName}</p>
              <p><Logout /></p>
            </div>
          </div>
        </div>

        <div className='right-column'>
          <div className='search'>
            <TextBox setInput={this.setInput}/>
            <MovieTvFilter setSelectedFilter={this.setSelectedFilter}/>
          </div>
          <div className='results'>
            <ResultsContainer input={this.state.input} selectedList={this.state.selectedList} selectedFilter={this.state.selectedFilter} resultsOnButtonClick={this.state.resultsOnButtonClick} allLists={this.state.allLists} userID={this.props.loginStatus.userID} handleListDelete={this.handleListDelete}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Home;
