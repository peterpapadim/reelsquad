import React, { Component } from 'react';
import Login from './components/Login'
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
        <Login />
      </div>
    )
  }
}

export default App;
