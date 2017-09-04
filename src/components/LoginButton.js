import React from 'react';
import { Button } from 'semantic-ui-react';

const LoginButton = (props) =>
  <Button color='teal' onClick={props.handleLoginClick} scope='user_profile,email,friends_list'>Login With Facebook</Button>

export default LoginButton;
