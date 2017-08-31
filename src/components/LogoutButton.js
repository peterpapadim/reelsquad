import React from 'react';
import { Button } from 'semantic-ui-react';

const LogoutButton = (props) =>
  <Button color='teal' onClick={props.handleLogoutClick}>Logout</Button>

export default LogoutButton;
