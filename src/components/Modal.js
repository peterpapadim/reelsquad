import React, { Component } from 'react';

class Modal extends Component {

  clearSelectedItem = () => {
    this.props.setSelectedItem(null)
  }

  render(){
    return (
      <div>
        <div className="modal">
          <div className="modal-content">
            <span onClick={this.clearSelectedItem} className="close">&times;</span>
            <p>{this.props.selectedItem.title}</p>
          </div>
        </div>
      </div>
    )
  }

}

export default Modal;
