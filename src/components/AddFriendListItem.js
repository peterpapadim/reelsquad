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
    <List.Item className="list-item-container">
      <div className="list-item-content">
        <div className="list-item-content-image">
          <Image avatar src={this.props.friend.url} />
        </div>
        <div className="list-item-content-name">
          <List.Content>
            {this.props.friend.name}
          </List.Content>
        </div>
        <div className="list-item-content-button">
          <List.Content>
            {this.state.added ? <Button className="remove" color='red' size='tiny' onClick={this.handleButtonClick}></Button>
          : <Button className="add" color='green' size='tiny' onClick={this.handleButtonClick}></Button>}
          </List.Content>
        </div>
      </div>
    </List.Item>
    )
  }
}

export default AddFriendListItem;
