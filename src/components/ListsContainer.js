import React, { Component } from 'react';
import { Button, Popup, Input, Header, Icon, Modal, Segment } from 'semantic-ui-react';
import ListAdapter from '../adapters/ListAdapter';
import List from './List';

class ListsContainer extends Component {
  constructor(){
    super();
    this.state = {
      // allLists: [],
      listNameInput: '',
      displayAddButton: true,
      displayInputAndSubmit: false
    }
  }

  componentDidMount(){
    ListAdapter.all(this.props.userID)
    .then(resp => resp.json())
    .then(json => this.props.setLists(json))
  }

  displayLists = () => {
    if(this.props.allLists.length > 0){
      return <Segment inverted> { this.props.allLists.map(listItem => <List key={listItem.id} name={listItem.name} setListItems={this.props.setListItems}/>) }</Segment>
    }
  }

  handleNewListClick = () => {
    this.setState({
      displayAddButton: false,
      displayInputAndSubmit: true
    })
  }

  handleNewListCancel = () => {
    this.setState({
      listNameInput: '',
      displayAddButton: true,
      displayInputAndSubmit: false
    })
  }

  handleNewListInput = (event) => {
    this.setState({
      listNameInput: event.target.value
    })
  }

  handleNewListSubmit = () => {
    if(this.state.listNameInput.length > 0){
      ListAdapter.create(this.props.userID, this.state.listNameInput)
      .then(resp => resp.json())
      .then(json => {
        this.props.setLists(json)
        this.setState({
        displayAddButton: true,
        displayInputAndSubmit: false
      })
    })
   }
  }

  render(){
    return(
      <div className="lists-container">
        <div className="add-list-button">
          {this.state.displayAddButton ?
            <Popup
              trigger={<Button onClick={this.handleNewListClick} icon='add' />}
              content="Create New List"
              basic
            /> :
            <div className="new-list-entry">
              <div className="new-list-input"><Input onChange={this.handleNewListInput} size='mini' placeholder='New List Name...' /></div>
              <div className="new-list-submit"><Button onClick={this.handleNewListSubmit} size='mini'>Create</Button><Button onClick={this.handleNewListCancel}size='mini'>Cancel</Button></div>
            </div>
          }
        </div>
        <div className="all-lists">
          {this.displayLists()}
        </div>
      </div>
    )
  }
}

export default ListsContainer;
