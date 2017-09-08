class ShowAdapter {

  static create(title, refID, type, userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
<<<<<<< HEAD
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/shows`, {
=======
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/shows`, {
    return fetch(`http://localhost:3000/api/v1/shows`, {
>>>>>>> development
      method:"POST",
      headers: header,
      body: JSON.stringify({title, refID, type, userID, listName})
    })
  }

  static listShows(userID, listName){
<<<<<<< HEAD
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}/shows`)
=======
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}/shows`)
    return fetch(`http://localhost:3000/api/v1/users/${userID}/lists/${listName}/shows`)
>>>>>>> development
  }
}

export default ShowAdapter;
