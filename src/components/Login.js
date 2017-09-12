import React, { Component } from 'react';
import LoginButton from './LoginButton';

class Login extends Component {

  // constructor(){
  //   super();
  //   this.state = {
  //     loader: false
  //   }
  // }

  handleLoginClick = (event) => {
    window.FB.login(function(response) {}, {scope: 'email,user_friends'});
  }

  render(){
    return (
      <div className='login-screen'>
        <div className='splash-logo'>
        </div>
        <div className= 'login-button'>
          <LoginButton handleLoginClick={this.handleLoginClick}/>
        </div>
      </div>
    )
  }

}

export default Login;
