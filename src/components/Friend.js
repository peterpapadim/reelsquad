import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import UserAdapter from '../adapters/UserAdapter'

class Friend extends Component {

  constructor(){
    super();
    this.state = {
      profilePicURL: '',
      memberSince: ''
    }
  }


  componentDidMount(){
    window.FB.api(
        `/${this.props.friend.id}/picture?height=1000`,
        (response) => {
          if (response && !response.error) {
            this.setState({ profilePicURL: response.data.url })
          }
        }
    );

    UserAdapter.show(this.props.friend.id)
    .then(resp => resp.json())
    .then(json => {
      let date = new Date(json.created_at)
      date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
      this.setState({ memberSince: date })
    })
  }


  render(){
    return(
      <Card className="friend-card-content" centered="true">
        <Image src={this.state.profilePicURL} size='small' centered="true" />
        <Card.Content>
          <Card.Header>
            {this.props.friend.name}
          </Card.Header>
          <Card.Meta>
            <span>
              {this.props.count + 1}
            </span>
          </Card.Meta>
          <Card.Description>Member Since: {this.state.memberSince}</Card.Description>
        </Card.Content>
      </Card>
    )
  }

}

export default Friend;
