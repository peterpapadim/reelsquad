import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

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
        {this.props.loginStatus.loggedIn ? <Home loginStatus={this.props.loginStatus}/> : <Login />}
      </div>
    )
  }
}

export default App;
