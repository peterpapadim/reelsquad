class UserAdapter {

  static create(firstName, lastName, email, userID){
    let header = new Headers
    header.set('Content-Type', 'application/json')
<<<<<<< HEAD
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users`, {
=======
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users`, {
    return fetch(`http://localhost:3000/api/v1/users`, {
>>>>>>> development
      method:"POST",
      headers: header,
      body: JSON.stringify({firstName, lastName, email, userID})
    })
  }

  static show(userID){
<<<<<<< HEAD
    return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}`)
=======
    // return fetch(`https://reelsquad-api.herokuapp.com/api/v1/users/${userID}`)
    return fetch(`http://localhost:3000/api/v1/users/${userID}`)
>>>>>>> development
  }
}

export default UserAdapter;
