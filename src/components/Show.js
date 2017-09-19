import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import ShowAdapter from '../adapters/ShowAdapter'
import { Card, Image } from 'semantic-ui-react';

class Show extends Component {

  constructor(){
    super();
    this.state = {
      cardHover: false
    }
  }

  handleCardClick = () => {
    this.props.setSelectedItem(this.props.currentMovieOrShow)
  }

  handleRemoveClick = () => {
    ShowAdapter.destroy(this.props.currentMovieOrShow.id, this.props.currentUser.userID, this.props.selectedList)
    .then(resp => this.props.setListItemsAndUsers(this.props.selectedList))
  }

  handleMouseOver = () => {
    if(!this.state.cardHover){
      this.setState({ cardHover: true })
    }
  }

  handleMouseOut = () => {
    if(this.state.cardHover){
        this.setState({ cardHover: false })
    }
  }

  render(){
    return(
      <Card className="card-content" centered="true" size="tiny">
        <div className="layover-container" onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseOut}>
          <Image centered="true" src={MovieApiAdapter.getImageUrl(this.props.currentMovieOrShow.poster_path)} size='small'/>
          {this.state.cardHover ?
            <div className="layover">
              <div className="layover-buttons">
                <input className="view-details-button" type="submit" value="" onClick={this.handleCardClick}/>
                { this.props.selectedList.length > 0 && this.props.input.length === 0 ? <div><input className="remove-from-list-button" type="submit" value="" onClick={this.handleRemoveClick}/></div> : null }
              </div>
            </div> : null}
        </div>
        <Card.Content>
          <Card.Header>
            {MovieApiAdapter.getTitle(this.props.currentMovieOrShow)}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {MovieApiAdapter.getYear(this.props.currentMovieOrShow)}
            </span>
          </Card.Meta>
          <Card.Description>{this.props.currentMovieOrShow.media_type ? this.props.currentMovieOrShow.media_type.toUpperCase() : 'MOVIE'}</Card.Description>
        </Card.Content>
      </Card>
    )
  }

}

export default Show;
