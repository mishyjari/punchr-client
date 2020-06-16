const USER_ENDPOINT = 'http://localhost:3000/users/'

export const deleteUser = (user) => {
  const url = USER_ENDPOINT + user.id
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }
  return fetch(url, options).then(res => res.json())
}

export const getUsers = () => {
  return fetch(USER_ENDPOINT).then(res => res.json())
}

export const updateUser = (user) => {
  const url = USER_ENDPOINT + user.id 
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(user)
  }
  return fetch(url, options)
}