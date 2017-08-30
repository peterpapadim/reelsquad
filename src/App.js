import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'
import FacebookLoginButton from './components/FacebookLoginButton';

const Login = () => {
  return (
    <Router>
       <Route exact path="/" render={FacebookLoginButton} />
    </Router>
  );
};

class App extends Component {

  //this is to receive friends who also use your app!

  // componentWillReceiveProps(nextProps){
  //   setTimeout(function(){
  //     window.FB.api(
  //         `/me/friends`,
  //         function (response) {
  //           if (response && !response.error) {
  //             console.log(response)
  //           }
  //         }
  //     );
  //   }, 5000);
  //
  // }

  render() {
    return (
      <div className="App">
        <div className="login-logout-button">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
