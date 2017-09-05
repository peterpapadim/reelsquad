import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import { Dropdown, Button } from 'semantic-ui-react';

class Modal extends Component {

  constructor(){
    super();
    this.state = {
      currentVideo: null
    }
  }

  componentDidMount(){
    MovieApiAdapter.getVideo(this.props.selectedItem)
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
              <h3>{MovieApiAdapter.getTitle(this.props.selectedItem)}</h3>
              <p>{this.props.selectedItem.overview}</p>
              <Dropdown multiple search selection options={[{ key: 1, text: 'List One', value: 1 }, { key: 2, text: 'List Two', value: 2 }, { key: 3, text: 'List Three', value: 3 }, { key: 4, text: 'List Four', value: 4 }, { key: 5, text: 'List Five', value: 5 }, { key: 6, text: 'List Six', value: 6 }]} placeholder='Add to...' /><br /><br />
              <Button color='teal'>Save</Button>
            </div>
            <div className="close" onClick={this.clearSelectedItem} >&times;</div>
            <div className="video-content">
              {this.state.currentVideo ? <iframe height="100%" width="100%" src={this.state.currentVideo} allowFullScreen="allowFullScreen"></iframe> : <img src='no-video.jpg' alt="No Video" height="100%" width="100%"></img> }
            </div>
          </div>
        </div>
    )
  }

}

export default Modal;
