import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class List extends Component {
  render(){
    return(
      <div>
        <Button inverted color='grey' onClick={this.props.setListItems}>{this.props.name}</Button><br/>
      </div>
    )
  }
}

export default List;
