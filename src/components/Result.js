import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'

class Result extends Component {

  getTitle = (currentMovieOrShow) => {
    if(Object.keys(currentMovieOrShow).includes('first_air_date')){
      return currentMovieOrShow.first_air_date.split('-')[0]
    } else {
      return currentMovieOrShow.release_date.split('-')[0]
    }
  }

  getYear = (currentMovieOrShow) => {
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

  render(){
    return(
      <Card >
        <Image src={this.getImageUrl(this.props.currentMovieOrShow.poster_path)} size='medium' />
        <Card.Content>
          <Card.Header>
            {this.getYear(this.props.currentMovieOrShow)}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {this.getTitle(this.props.currentMovieOrShow)}
            </span>
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  }
}

export default Result;

//<img src={this.getImageUrl(this.props.currentMovieOrShow.poster_path)}/>
