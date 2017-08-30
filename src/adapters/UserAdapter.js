class UserAdapter {

  static create(firstName, lastName, email){
    let header = new Headers
    header.set('Content-Type', 'application/json')
    return fetch(`http://localhost:3000/api/v1/users`, {
      method:"POST",
      headers: header,
      body: JSON.stringify({firstName, lastName, email})
    }).then(resp => resp.json())
      .then(json => {
        console.log(json)
      })
  }

}
