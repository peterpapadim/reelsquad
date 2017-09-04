import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'

class Result extends Component {

  getYear = (currentMovieOrShow) => {
    if(Object.keys(currentMovieOrShow).includes('first_air_date')){
      return currentMovieOrShow.first_air_date.split('-')[0]
    } else if(currentMovieOrShow.media_type === undefined){
       let releaseDate = currentMovieOrShow.release_date.split('-')
       return `Release Date: ${releaseDate[1]}-${releaseDate[2]}-${releaseDate[0]}`
    } else {
      return currentMovieOrShow.release_date.split('-')[0]
    }
  }

  getTitle = (currentMovieOrShow) => {
    if(Object.keys(currentMovieOrShow).includes('original_name')){
      return currentMovieOrShow.original_name
    } else {
      return currentMovieOrShow.original_title
    }
  }

  getImageUrl = (posterPath) => {
    if(posterPath) {
      return `https://image.tmdb.org/t/p/w185/${posterPath}`
    } else {
      return 'no_image.jpg'
    }
  }

  handleCardClick = () => {
    this.props.setSelectedItem(this.props.currentMovieOrShow)
  }

  render(){
    return(
      <Card onClick={this.handleCardClick}>
        <Image src={this.getImageUrl(this.props.currentMovieOrShow.poster_path)} size='medium' />
        <Card.Content>
          <Card.Header>
            {this.getTitle(this.props.currentMovieOrShow)}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {this.getYear(this.props.currentMovieOrShow)}
            </span>
          </Card.Meta>
          <Card.Description>{this.props.currentMovieOrShow.media_type ? this.props.currentMovieOrShow.media_type.toUpperCase() : 'MOVIE'}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default Result;
