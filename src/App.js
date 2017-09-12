import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import './App.css'

class App extends Component {

  constructor(){
    super();
    this.state = {
      loggedIn: false
    }
  }
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
  componentWillReceiveProps(nextProps){
    if(nextProps.loginStatus.loggedIn){
      this.setState({ loggedIn: true})
    } else{
      this.setState({ loggedIn: false })
    }
  }

  render() {
    return (
      <div className="App">
        <Home loginStatus={this.props.loginStatus}/>
      </div>
    )
  }
}

export default App;
