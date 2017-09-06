import React, { Component } from 'react';
// import { Card, Image } from 'semantic-ui-react';
// import MovieApiAdapter from '../adapters/MovieApiAdapter';
import Show from './Show';
import Friend from './Friend';


class Result extends Component {

  // handleCardClick = () => {
  //   this.props.setSelectedItem(this.props.currentMovieOrShow)
  // }


  render(){
    return(
      this.props.currentMovieOrShow ?
        <Show currentMovieOrShow={this.props.currentMovieOrShow} setSelectedItem={this.props.setSelectedItem}/>
          : <Friend friend={this.props.friend}/>
      // <Card onClick={this.handleCardClick}>
      //   <Image src={MovieApiAdapter.getImageUrl(this.props.currentMovieOrShow.poster_path)} size='medium' />
      //   <Card.Content>
      //     <Card.Header>
      //       {MovieApiAdapter.getTitle(this.props.currentMovieOrShow)}
      //     </Card.Header>
      //     <Card.Meta>
      //       <span className='date'>
      //         {MovieApiAdapter.getYear(this.props.currentMovieOrShow)}
      //       </span>
      //     </Card.Meta>
      //     <Card.Description>{this.props.currentMovieOrShow.media_type ? this.props.currentMovieOrShow.media_type.toUpperCase() : 'MOVIE'}</Card.Description>
      //   </Card.Content>
      // </Card>
    )
  }
}

export default Result;
