import React, { Component } from 'react';
import App from '../App'
import UserAdapter from '../adapters/UserAdapter'

class Auth extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      accessToken: '',
      userID: '',
      expiresIn: 0,
      signedRequest: '',
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  updateLoggedInState = (user) => {
    let url = '/me?fields=name,email';
      window.FB.api(url, (response) => {
        let firstName = response.name.split(' ')[0]
        let lastName = response.name.split(' ')[1]
        let email = response.email
        this.setState({
          loggedIn: true,
          accessToken: user.authResponse.accessToken,
          userID: user.authResponse.userID,
          expiresIn: user.authResponse.expiresIn,
          signedRequest: user.authResponse.signedRequest,
          firstName: firstName,
          lastName: lastName,
          email: email
        })
      })
  }


  updateLoggedOutState = () => {
    this.setState({
      loggedIn: false,
      accessToken: '',
      userID: '',
      expiresIn: 0,
      signedRequest: '',
      firstName: '',
      lastName: '',
      email: ''
    })
  }

  componentDidMount(){
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : '459547347771719',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.1'
      });

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        if (response.authResponse) {
            this.updateLoggedInState(response)
        } else {
            this.updateLoggedOutState()
        }
      });
    }.bind(this);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  render() {
    return(
      <App loginStatus={this.state} />
    )
  }

}

export default Auth;
