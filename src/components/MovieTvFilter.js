import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class MovieTvFilter extends Component {

  handleFilterClick = (event) => {
    this.props.setSelectedFilter(event.target.value)
  }

  render(){
    return(
      <div className='filter-buttons-container'>
        <div className='filter-buttons'>
          <Button className='filter-button' value='' onClick={this.handleFilterClick}>All</Button>
          <Button className='filter-button' value='movies' onClick={this.handleFilterClick}>Movies</Button>
          <Button className='filter-button' value='tv' onClick={this.handleFilterClick}>TV Shows</Button>
        </div>
      </div>
    )
  }

}

export default MovieTvFilter;
