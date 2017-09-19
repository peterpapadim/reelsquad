import React, { Component } from 'react';
import { Card, Button, Icon} from 'semantic-ui-react'
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import ListAdapter from '../adapters/ListAdapter';
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
      updatedFriends: [],
      listFriendsImages: [],
      addUserClicked: false
    }
  }

  // setFriendImages = (friendID) => {
  //   window.FB.api(
  //       `/${friendID}/picture?height=1000`,
  //       (response) => {
  //         if (response && !response.error) {
  //           if(!this.state.listFriendsImages.includes(response.data.url)){
  //             this.setState({ listFriendsImages: [...this.state.listFriendsImages, response.data.url] })
  //           }
  //         }
  //       })
  // }

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
    else if(nextProps.resultsOnButtonClick.length > 0){
      // nextProps.listFriends.forEach(friend => this.setFriendImages(friend.fb_id))
      this.setState({searchResults: nextProps.resultsOnButtonClick})
    } else {
      // nextProps.listFriends.forEach(friend => this.setFriendImages(friend.fb_id))
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
        return <Result key={result.id} input={this.props.input} currentUser={this.props.currentUser} setListItemsAndUsers={this.props.setListItemsAndUsers} currentMovieOrShow={result} setSelectedItem={this.setSelectedItem} selectedList={this.props.selectedList}/>
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
      this.setState({ updatedFriends: [] })
    } else {
      this.setState({ addUserClicked: true })
    }
  }

  setUpdatedFriends = (friendIDs) => {
    this.setState({ updatedFriends: friendIDs })
  }

  addOrRemove = (friend, addOrRemove) => {
    if(addOrRemove){
      if(!this.state.updatedFriends.includes(friend.id)){
        this.setState({ updatedFriends: [...this.state.updatedFriends, friend.id] })
      }
    } else {
      if(this.state.updatedFriends.includes(friend.id)){
        let newUpdatedFriends = this.state.updatedFriends
        let index = newUpdatedFriends.indexOf(friend.id)
        newUpdatedFriends.splice(index, 1)
        this.setState({ updatedFriends: newUpdatedFriends })
      }
      // if(this.state.updatedFriends.includes(friend.id)){
      //   let filteredResults = this.state.updatedFriends.filter(friendID => friendID !== friend.id)
      //   this.setState({ updatedFriends: filteredResults})
      // }
    }
  }


  handleCancelClick = () => {
    this.setState({ addUserClicked: false })
    this.setState({ updatedFriends: [] })
  }

  handleSaveClick = () => {
    let userID = this.props.userID
    let updatedFriends = this.state.updatedFriends
    let listName = this.props.selectedList
    ListAdapter.updateUsers(userID, updatedFriends, listName)
    .then(resp => resp.json())
    .then(json => this.props.setListFriends(json))
    this.setState({ updatedFriends: [] })
    this.setState({ addUserClicked: false })
  }

  displayListFriends = () => {
    return this.props.listFriends.map(friend => {
      let initials = `${friend.first_name[0]}${friend.last_name[0]}`
      return <div className="list-friend">{initials}</div>
    })
  }


  render(){
    return(
      <div>
        {this.props.selectedList.length > 0 && this.props.input.length === 0 ? <div className='friends-in-list'>
          {this.displayListFriends()}
        </div> : null}
        {this.state.addUserClicked ?
          <div className='add-friend-list'>
            <div className='friend-list'>
              <AddFriendList friends={this.state.friends} listFriends={this.props.listFriends} updatedFriends={this.state.updatedFriends} setUpdatedFriends={this.setUpdatedFriends} addOrRemove={this.addOrRemove}/>
            </div>
            <div className='friend-list-buttons'>
              <div className='save'>
                <Button className="save-button" color='green' onClick={this.handleSaveClick}></Button>
             </div>
              <div className='cancel'>
                <Button className="cancel-button" color='red' onClick={this.handleCancelClick}></Button>
             </div>
           </div>
          </div> : null}
        <Card.Group>{this.displayResults()}</Card.Group>
        {this.state.selectedItem ? <Modal selectedItem={this.state.selectedItem} setSelectedItem={this.setSelectedItem} allLists={this.props.allLists} userID={this.props.userID} /> : null}
        <div className="delete-addfriend-container">{this.props.selectedList.length > 0 && this.props.input.length === 0 ? <div className="delete-addfriend"><div className="delete-list"><Button className="delete-list-button"negative onClick={this.props.handleListDelete}></Button></div><div className="addfriend"><Button className='add-user-button' onClick={this.handleAddUserClick}></Button></div></div> : null}</div>
      </div>
    )
  }
}

export default ResultsContainer;
