import React, { Component } from 'react';
import AddFriendListItem from './AddFriendListItem';
import { List, Image, Checkbox } from 'semantic-ui-react';

class AddFriendList extends Component {

  renderFriendsList = () => {
    return this.props.friends.map( friend => <AddFriendListItem friend={friend}/>)
  }

  render(){
    return(
      <List selection verticalAlign='left'>
        {this.renderFriendsList()}
      </List>
    )
  }
}

export default AddFriendList;
