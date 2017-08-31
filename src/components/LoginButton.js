import React from 'react';
import { Button } from 'semantic-ui-react';

const LoginButton = (props) =>
  <Button color='teal' onClick={props.handleLoginClick}>Login With Facebook</Button>

export default LoginButton;
