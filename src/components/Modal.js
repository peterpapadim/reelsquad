import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';

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
            <div>
              <img src={MovieApiAdapter.getImageUrl(this.props.selectedItem.poster_path)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Modal;
