import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';

class TextBox extends Component {

  handleInput = (event) => {
    this.props.setInput(event.target.value)
  }

  render(){
    return(
      <div className='search-box-container'>
        <Input className='search-box' onChange={this.handleInput}
          placeholder='Search Movies or TV Shows...'/>
     </div>
    )
  }
}

export default TextBox;
