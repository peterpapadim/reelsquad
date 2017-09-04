import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';

class Modal extends Component {

  constructor(){
    super();
    this.state = {
      currentVideo: null
    }
  }

  componentDidMount(){
    MovieApiAdapter.getVideo(this.props.selectedItem.id)
    .then(resp => resp.json())
    .then(json => {
      if(json.results.length > 0){
        this.setState({
          currentVideo: MovieApiAdapter.youtubeURL(json.results[0].key)
        })
      }
    })
  }

  clearSelectedItem = () => {
    this.props.setSelectedItem(null)
  }

  render(){
    console.log(this.state.currentVideo)
    return (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-content-poster">
              <img src={MovieApiAdapter.getImageUrl(this.props.selectedItem.poster_path)}/>
            </div>
            <div className="content-details">
              <h2>{MovieApiAdapter.getTitle(this.props.selectedItem)}</h2>
            </div>
            <div className="close" onClick={this.clearSelectedItem} >&times;</div>
            <div className="video-content">
              {this.state.currentVideo ? <iframe height="100%" width="100%" src={this.state.currentVideo}></iframe> : null }
            </div>
          </div>
        </div>
    )
  }

}

export default Modal;
