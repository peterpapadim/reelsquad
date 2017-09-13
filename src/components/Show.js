import React, { Component } from 'react';
import MovieApiAdapter from '../adapters/MovieApiAdapter';
import { Card, Image } from 'semantic-ui-react';

class Show extends Component {

  handleCardClick = () => {
    this.props.setSelectedItem(this.props.currentMovieOrShow)
  }

  render(){
    return(
      <Card className="card-content" centered="true" onClick={this.handleCardClick} size="tiny">
          <Image centered="true" src={MovieApiAdapter.getImageUrl(this.props.currentMovieOrShow.poster_path)} size='small' />
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
