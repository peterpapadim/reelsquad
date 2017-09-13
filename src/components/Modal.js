import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import ShowAdapter from '../adapters/ShowAdapter';
import { Dropdown, Button } from 'semantic-ui-react';

class Modal extends Component {

  constructor(){
    super();
    this.state = {
      currentVideo: null,
      selectedList: '',
      contentSaved: false
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
    // this.setState({ selectedList: [] })
  }

  dropdownOptions = () => {
    let i = 1
    return this.props.allLists.map((listItem) => {
      let dropdownItem = { key: i, text: listItem.name, value: i }
      i += 1
      return dropdownItem
    })
  }

  handleSelectedListChange = (event) => {
    // if(event.target.outerHTML.includes('option')){
    //   let adjustedLists = [...this.state.selectedLists, event.target.innerText]
    //   this.setState({ selectedLists: adjustedLists})
    // }
    // if(event.target.outerHTML.includes('delete')){
    //   let currentLists = this.state.selectedLists
    //   this.state.selectedLists.forEach((list, index) => {
    //     if(list === event.target.previousSibling.previousSibling.textContent){
    //       currentLists.splice(index, 1)
    //     }
    //   this.setState({ selectedLists: [...currentLists] })
    //   })
    // }
    // this.setState({ selectedList: event.target.innerText })
    this.setState({ selectedList: event.target.innerText })

  }

  handleSelectedListSubmit = () => {
    let selectedItemDetails = MovieApiAdapter.getNameTypeID(this.props.selectedItem)
    ShowAdapter.create(selectedItemDetails.title, selectedItemDetails.id, selectedItemDetails.type, this.props.userID, this.state.selectedList)
    this.setState({ selectedList: '' })
    // this.props.setSelectedList('')
    this.setState({ contentSaved: true })
  }

  render(){
    return (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-content-poster-container">
              <img className="modal-poster" src={MovieApiAdapter.getImageUrl(this.props.selectedItem.poster_path)}/>
            </div>
            <div className="modal-content-details-container">
              <div className="modal-content-details">
               <div className="title-container"><div className="title">{MovieApiAdapter.getTitle(this.props.selectedItem)}</div></div>
               <div className="overview-container"><div className="overview">{this.props.selectedItem.overview}</div></div>
               <div className="dropdown-save-container">
                 <div className="dropdown-container"><div className="dropdown"><Dropdown placeholder='Add to list...' search selection options={this.dropdownOptions()} onChange={this.handleSelectedListChange}/></div></div>
                 <div className="save-container"><div className="save"><Button color='teal' onClick={this.handleSelectedListSubmit}>Save</Button></div></div>
                 <div className="saved-message">{this.state.contentSaved ? <p>Successfully Saved!</p> : null}</div>
              </div>
              </div>
            </div>
            <div className="close" onClick={this.clearSelectedItem} >&times;</div>
            <div className="video-content-container">
              <div className="video-content">{this.state.currentVideo ? <iframe height="100%" width="100%" src={this.state.currentVideo} allowFullScreen="allowFullScreen"></iframe> : <img src='no-video.jpg' alt="No Video" height="100%" width="100%"></img> }</div>
            </div>
          </div>
        </div>
    )
  }

}

export default Modal;
