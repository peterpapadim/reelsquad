import React, { Component } from 'react';
import Logout from './Logout'
import TextBox from './TextBox'
import ResultsContainer from './ResultsContainer'
import { Grid } from 'semantic-ui-react'

class Home extends Component {

  constructor(){
    super();
    this.state = {
      input: ''
    }
  }

  setInput = (newInput) => {
    this.setState({
      input: newInput
    })
  }

  render(){
    return(
      <div>

        <div className='left-column'>
          <div className='featured-content'>
          </div>
          <div className='lists'>
          </div>
        </div>

        <div className='right-column'>
          <div className='search'>
            <div className='name-logout'><span>{this.props.loginStatus.firstName} {this.props.loginStatus.lastName}  <Logout /></span></div>
            <div className='search-box'><TextBox setInput={this.setInput}/></div>
          </div>
          <div className='results'>
            <ResultsContainer input={this.state.input}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Home;
