class ListAdapter {

  static all(userID){
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists`)
  }

  static create(userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/lists`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({userID, listName})
    })
  }

  static delete(userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}/lists/${listName}`, {
      method:"DELETE",
      headers: header,
      body: JSON.stringify({userID, listName})
    })
  }

}

export default ListAdapter;
