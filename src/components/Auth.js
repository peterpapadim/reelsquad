import React, { Component } from 'react';
import App from '../App';
import Login from './Login';
import UserAdapter from '../adapters/UserAdapter';


class Auth extends Component {

  constructor(){
    super();
    this.state = {
      loggedIn: false,
      accessToken: '',
      userID: '',
      expiresIn: 0,
      signedRequest: '',
      firstName: '',
      lastName: '',
      email: '',
      dataID: 0,
      profilePicURL: ''
    }
  }

  updateLoggedInState = (user) => {
    let url = '/me?fields=name,email';
      window.FB.api(url, (response) => {
        let firstName = response.name.split(' ')[0]
        let lastName = response.name.split(' ')[1]
        let email = response.email
        UserAdapter.create(firstName, lastName, email, user.authResponse.userID)
        .then(resp => resp.json())
        .then(json =>
          this.setState({
            loggedIn: true,
            accessToken: user.authResponse.accessToken,
            userID: user.authResponse.userID,
            expiresIn: user.authResponse.expiresIn,
            signedRequest: user.authResponse.signedRequest,
            firstName: firstName,
            lastName: lastName,
            email: email,
            dataID: json
          })
        )
        window.FB.api(
            `/${user.authResponse.userID}/picture`,
            (response) => {
              if (response && !response.error) {
                this.setState({ profilePicURL: response.data.url })
              }
            }
        );
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
      email: '',
      dataID: 0,
      profilePicURL: ''
    })
  }

  componentDidMount(){
    window.fbAsyncInit = () => {
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

      window.FB.getLoginStatus( (response) => {
        if (response.status === 'connected') {
          this.updateLoggedInState(response)
        } else{
          this.updateLoggedOutState()
        }
      });

    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }


  render() {
    console.log(this.state.loggedIn)
    return(
      <div>
      { this.state.loggedIn ? <App loginStatus={this.state}/> : <div className='login-screen'><Login loginStatus={this.state}/></div> }
    </div>
    )
  }

}

export default Auth;
