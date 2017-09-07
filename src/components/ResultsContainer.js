import React, { Component } from 'react';
import { Card, Button, Icon} from 'semantic-ui-react'
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import Result from './Result';
import Modal from './Modal';
import AddFriendList from './AddFriendList';

class ResultsContainer extends Component {
  constructor(){
    super();
    this.state = {
      searchResults: [],
      selectedItem: null,
      friends: [],
      addUserClicked: false
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

  componentDidMount(){
    window.FB.api(
        `/${this.props.userID}/friends`,
        (resp) => {
          if (resp && !resp.error) {
            resp.data.forEach((friend) => {
              window.FB.api(
                  `/${friend.id}/picture`,
                  (response) => {
                    if (response && !response.error) {
                      friend.url = response.data.url
                      this.setState({ friends: [...this.state.friends, friend]})
                    }
                  }
              );
            })
          }
        }
    );
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
      if (Object.keys(result).length === 2){
        return <Result key={result.id} friend={result} count={index}/>
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

  handleAddUserClick = () => {
    if(this.state.addUserClicked){
      this.setState({ addUserClicked: false })
    } else {
      this.setState({ addUserClicked: true })
    }
  }

  handleCancelClick = () => {
    this.setState({ addUserClicked: false })
  }

  render(){
    console.log(this.state.friends)
    return(
      <div>
        {this.state.addUserClicked ?
          <div className='add-friend-list'>
            <div className='friend-list'>
              <AddFriendList friends={this.state.friends}/>
            </div>
            <div className='friend-list-buttons'>
              <div className='save-friend-button'>
                <Button color='teal'>Add User(s)</Button>
             </div>
              <div className='cancel-button'>
                <Button color='red' onClick={this.handleCancelClick}>Cancel</Button>
             </div>
           </div>
          </div> : null}
        <Card.Group>{this.displayResults()}</Card.Group>
        {this.state.selectedItem ? <Modal selectedItem={this.state.selectedItem} setSelectedItem={this.setSelectedItem} allLists={this.props.allLists} userID={this.props.userID} /> : null}
        <div className="delete-list-button">{this.props.selectedList.length > 0 ? <div><div><Button negative onClick={this.props.handleListDelete}>Delete List</Button></div><div className='add-user-button'><Icon name='add user' size='big' color='teal' onClick={this.handleAddUserClick}/></div></div> : null}</div>
      </div>
    )
  }
}

export default ResultsContainer;
