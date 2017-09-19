class ShowAdapter {

  static create(title, refID, type, userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/shows`, {
    // return fetch(`http://localhost:3000/api/v1/shows`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({title, refID, type, userID, listName})
    })
  }

  static destroy(refID, userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}/shows/${refID}`, {
    // return fetch(`http://localhost:3000/api/v1/users/${userID}/lists/${listName}/shows/${refID}`, {
      method:"DELETE",
      headers: header,
      body: JSON.stringify({refID, userID, listName})
    })
  }
}

export default ShowAdapter;
