import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

const Friend = (props) => {
  return(
    <Card>
      <Card.Content>
        <Card.Header>
          {props.friend.name}
        </Card.Header>
        <Card.Meta>
          <span>
            blah blah
          </span>
        </Card.Meta>
        <Card.Description>blahhhhhh</Card.Description>
      </Card.Content>
    </Card>
  )
}

export default Friend;
