import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class TextBox extends Component {

  handleInput = (event) => {
    this.props.setInput(event.target.value)
  }

  render(){
    return(
      <Form>
        <Form.Field>
          <div className='search-label'>Search:</div>
          <input onChange={this.handleInput}/>
        </Form.Field>
      </Form>
    )
  }
}

export default TextBox;
