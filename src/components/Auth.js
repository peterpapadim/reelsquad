import React, { Component } from 'react';

class Auth extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      accessToken: '',
      userID: '',
      expiresIn: 0,
      signedRequest: ''
    }
  }

  updateLoggedInState = (response) => {
    this.setState({
      loggedIn: true,
      accessToken: response.authResponse.accessToken,
      userID: response.authResponse.userID,
      expiresIn: response.authResponse.expiresIn,
      signedRequest: response.authResponse.signedRequest
    })
  }

  updateLoggedOutState = () => {
    this.setState({
      loggedIn: false,
      accessToken: '',
      userID: '',
      expiresIn: 0,
      signedRequest: ''
    })
  }

  componentDidMount(){
        // facebook signin  button render
        window.fbAsyncInit = function() {
          window.FB.init({
            appId      : '459547347771719',
            cookie     : true,  // enable cookies to allow the server to access
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.1' // use version 2.1
          });

          // login callback implementation goes inside the function() { ... } block
          window.FB.Event.subscribe('auth.statusChange', (response) => {
            if (response.authResponse) {
                this.updateLoggedInState(response)
            } else {
                this.updateLoggedOutState()
            }
          });
        }.bind(this);

        // Load the SDK asynchronously
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
      <div></div>
    )
  }

}

export default Auth;
