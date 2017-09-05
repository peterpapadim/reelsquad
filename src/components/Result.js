import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';

class Result extends Component {

  handleCardClick = () => {
    this.props.setSelectedItem(this.props.currentMovieOrShow)
  }

  render(){
    return(
      <Card onClick={this.handleCardClick}>
        <Image src={MovieApiAdapter.getImageUrl(this.props.currentMovieOrShow.poster_path)} size='medium' />
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

export default Result;
