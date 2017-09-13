class ListAdapter {

  static all(userID){
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists`)
    return fetch(`http://localhost:3000/api/v1/users/${userID}/lists`)
  }

  static create(userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/lists`, {
    return fetch(`http://localhost:3000/api/v1/lists`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({userID, listName})
    })
  }

  static delete(userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}`, {
    return fetch(`http://localhost:3000/api/v1/users/${userID}/lists/${listName}`, {
      method:"DELETE",
      headers: header,
      body: JSON.stringify({userID, listName})
    })
  }

  static listShowsUsers(userID, listName){
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}/shows-users`)
    return fetch(`http://localhost:3000/api/v1/users/${userID}/lists/${listName}/shows-users`)
  }

  static updateUsers(userID, updatedFriends, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}/users/update`, {
    return fetch(`http://localhost:3000/api/v1/users/${userID}/lists/${listName}/users/update`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({userID, updatedFriends, listName})
    })
  }

}

export default ListAdapter;
