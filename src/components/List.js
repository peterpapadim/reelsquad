import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class List extends Component {
  render(){
    return(
      <div>
        <Button className="list-item" inverted color='grey' onClick={this.props.setListItems}>{this.props.name}</Button><br/>
      </div>
    )
  }
}

export default List;
