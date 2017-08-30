import React, { Component } from 'react';
import Auth from './components/Auth';
import FacebookLoginButton from './components/FacebookLoginButton';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Auth />
        <FacebookLoginButton />
      </div>
    );
  }
}

export default App;
