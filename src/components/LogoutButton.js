import React from 'react';
import { Button } from 'semantic-ui-react';

const LogoutButton = (props) =>
  <Button className="logout" color='teal' onClick={props.handleLogoutClick}>LOGOUT</Button>

export default LogoutButton;
