import React from 'react';
import { Button } from 'semantic-ui-react';


const LoginButton = (props) =>

  <Button color='black' onClick={props.handleLoginClick} scope='user_profile,email,friends_list'>Login With Facebook</Button>
  // <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="true"></div>

export default LoginButton;
