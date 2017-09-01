import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class MovieTvFilter extends Component {

  handleFilterClick = (event) => {
    this.props.setSelectedFilter(event.target.value)
  }

  render(){
    return(
      <div className='filter-buttons'>
        <Button.Group onClick={this.handleFilterClick}>
          <Button value=''>All</Button>
          <Button.Or />
          <Button value='movies'>Movies</Button>
          <Button.Or />
          <Button value='tv'>TV Shows</Button>
        </Button.Group>
      </div>
    )
  }

}

export default MovieTvFilter;
