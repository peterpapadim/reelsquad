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
               <p className="title">{MovieApiAdapter.getTitle(this.props.selectedItem)}</p>
               <p className="overview">{this.props.selectedItem.overview}</p>
               <Dropdown className="dropdown" placeholder='Add to...' search selection options={this.dropdownOptions()} onChange={this.handleSelectedListChange}/>
               <Button className="save" color='teal' onClick={this.handleSelectedListSubmit}>Save</Button>
               {this.state.contentSaved ? <p>Successfully Saved!</p> : null}
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
