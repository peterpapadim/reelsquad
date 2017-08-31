import React, { Component } from 'react';
import LoginButton from './LoginButton';

class Login extends Component {

  handleLoginClick = (event) => {
    window.FB.login()
  }

  render(){
    return (
      <div className='login-button'>
        <LoginButton handleLoginClick={this.handleLoginClick}/>
      </div>
    )
  }

}

export default Login;
