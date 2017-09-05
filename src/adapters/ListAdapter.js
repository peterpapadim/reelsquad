class ListAdapter {

  static all(userID){
    return fetch(`http://localhost:3000/api/v1/users/${userID}/lists`)
  }

  static create(userID, listName){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    return fetch(`http://localhost:3000/api/v1/lists`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({userID, listName})
    })
  }
}

export default ListAdapter;
