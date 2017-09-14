import React, { Component } from 'react';
import AddFriendListItem from './AddFriendListItem';
import { List, Image, Checkbox } from 'semantic-ui-react';

class AddFriendList extends Component {

  // constructor(){
  //   super();
  //   this.state = {
  //     updatedFriends: []
  //   }
  // }

  // addOrRemove = (friend, addOrRemove) => {
  //   if(addOrRemove){
  //     this.setState({ updatedFriends: [...this.state.updatedFriends, friend.id] })
  //   } else {
  //     if(this.state.updatedFriends.includes(friend.id)){
  //       let filteredResults = this.state.updatedFriends.filter(friendID => friendID !== friend.id)
  //       this.setState({ updatedFriends: filteredResults})
  //     }
  //   }
  // }

  componentDidMount(){
    let friendIDs = this.props.listFriends.map(friend => friend.fb_id)
    this.props.setUpdatedFriends(friendIDs)
  }


  renderFriendsList = () => {
    return this.props.friends.map( friend => <AddFriendListItem key={friend.id} friend={friend} listFriends={this.props.listFriends} addOrRemove={this.props.addOrRemove} updatedFriends={this.props.updatedFriends}/>)
  }

  render(){
    return(
      <List className="list-container" divided verticalAlign='middle'>
        {this.renderFriendsList()}
      </List>
    )
  }
}

export default AddFriendList;
