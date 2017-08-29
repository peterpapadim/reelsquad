import React, { Component } from 'react';
import FacebookLoginButton from './components/FacebookLoginButton';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      userID: null,
      accessToken: null
    }
  }

  checkIfLoggedIn = () => {
    setTimeout(function(){
      window.FB.getLoginStatus(function(response) {
        console.log(response)
        if (response.status === 'connected') {
          alert('You are now logged in')
        } else {
          alert('You are not logged in')
        }
      });
    }, 500);
  }

  componentDidMount(){
    this.checkIfLoggedIn()
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <FacebookLoginButton />
      </div>
    );
  }
}

export default App;
