import React, { Component } from 'react';
import { List, Image, Button } from 'semantic-ui-react';

class AddFriendListItem extends Component {

  constructor(){
    super();
    this.state = {
      added: false
    }
  }

  componentDidMount(){
    let existing = this.props.listFriends.filter(listFriend => listFriend.fb_id === this.props.friend.id)
    if(existing.length > 0){
      this.setState({ added: true })
      // this.props.addOrRemove(this.props.friend, true)
    } else {
      this.setState({ added: false })
      // this.props.addOrRemove(this.props.friend, false)
    }
  }

  handleButtonClick = () => {
    if(this.state.added){
      this.setState({ added: false })
      this.props.addOrRemove(this.props.friend, false)
    } else {
      this.setState({ added: true })
      this.props.addOrRemove(this.props.friend, true)
    }
  }

  render(){
    return(
    <List.Item>
      <List.Content floated='right'>
        {this.state.added ? <Button color='red' size='tiny' onClick={this.handleButtonClick}>Remove</Button>
        : <Button color='green' size='tiny' onClick={this.handleButtonClick}>Add</Button>}
      </List.Content>
      <Image avatar src={this.props.friend.url} />
      <List.Content>
        {this.props.friend.name}
      </List.Content>
    </List.Item>
    )
  }
}

export default AddFriendListItem;
