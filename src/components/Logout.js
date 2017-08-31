import React, { Component } from 'react';
import LogoutButton from './LogoutButton';

class Logout extends Component {

  handleLogoutClick = (event) => {
    window.FB.logout()
  }

  render(){
    return (
        <LogoutButton handleLogoutClick={this.handleLogoutClick}/>
    )
  }

}

export default Logout;
