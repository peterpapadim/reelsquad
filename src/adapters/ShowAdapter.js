class ShowAdapter {

  static create(title, refID, type, userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/shows`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({title, refID, type, userID, listName})
    })
  }

  static listShows(userID, listName){
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}/shows`)
  }
}

export default ShowAdapter;
