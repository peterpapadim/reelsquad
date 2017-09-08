class UserAdapter {

  static create(firstName, lastName, email, userID){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users`, {
    return fetch(`http://localhost:3000/api/v1/users`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({firstName, lastName, email, userID})
    })
  }

  static show(userID){
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}`)
    return fetch(`http://localhost:3000/api/v1/users/${userID}`)
  }
}

export default UserAdapter;
