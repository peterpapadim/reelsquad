import React from 'react';
import { List, Image, Checkbox } from 'semantic-ui-react';

const AddFriendListItem = (props) => {
  return(
    <List.Item>
      <Image avatar src={props.friend.url} />
      <List.Content>
        <List.Header>{props.friend.name}</List.Header>
      </List.Content>
    </List.Item>
  )
}

export default AddFriendListItem;
