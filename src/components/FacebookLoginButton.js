import React from 'react';

function FacebookLoginButton() {
  return(
    <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="true" scope='email,user_friends'></div>
  )
}

export default FacebookLoginButton;
