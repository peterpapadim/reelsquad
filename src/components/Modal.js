import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import { Dropdown, Button } from 'semantic-ui-react';

class Modal extends Component {

  constructor(){
    super();
    this.state = {
      currentVideo: null,
      selectedLists: []
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
    this.setState({ selectedLists: [] })
  }

  dropdownOptions = () => {
    let i = 1
    return this.props.allLists.map((listItem) => {
      let dropdownItem = { key: i, text: listItem.name, value: i }
      i += 1
      return dropdownItem
    })
  }

  handleSelectedListsChange = (event) => {
    if(event.target.outerHTML.includes('option')){
      this.setState({ selectedLists: [...this.state.selectedLists, event.target.innerText]})
    }
    if(event.target.outerHTML.includes('delete')){
      let currentLists = this.state.selectedLists
      this.state.selectedLists.forEach((list, index) => {
        if(list === event.target.previousSibling.previousSibling.textContent){
          currentLists.splice(index, 1)
        }
      this.setState({ selectedLists: [...currentLists] })
      })
    }
  }

  render(){
    console.log(this.state.selectedLists)
    return (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-content-poster">
              <img src={MovieApiAdapter.getImageUrl(this.props.selectedItem.poster_path)}/>
            </div>
            <div className="content-details">
              <h3>{MovieApiAdapter.getTitle(this.props.selectedItem)}</h3>
              <p>{this.props.selectedItem.overview}</p>
              <Dropdown multiple search selection onChange={this.handleSelectedListsChange} options={this.dropdownOptions()} placeholder='Add to...' /><br /><br />
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
