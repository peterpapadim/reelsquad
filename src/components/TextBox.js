import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';

class TextBox extends Component {

  handleInput = (event) => {
    this.props.setInput(event.target.value)
  }

  render(){
    return(
      <Input className='search-box' onChange={this.handleInput}
        icon={<Icon name='search' inverted circular link />}
        placeholder='Search Movies or TV Shows...'
      />
      // <Form>
      //   <Form.Field>
      //     <div className='search-label'>Search:</div>
      //     <input onChange={this.handleInput}/>
      //   </Form.Field>
      // </Form>
    )
  }
}

export default TextBox;
