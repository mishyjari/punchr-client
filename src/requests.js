const USER_ENDPOINT = 'http://localhost:3000/users/'
const SHIFT_ENDPOINT = 'http://localhost:3000/shifts/'

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
  return fetch(url, options).then( res => res.json() )
}

export const createShift = (shift) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(shift)
  }
  return fetch(SHIFT_ENDPOINT, options).then(res => res.json())
}

export const updateShift = (shift) => {
  const url = SHIFT_ENDPOINT + shift.id
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(shift)
  }
  return fetch(url, options).then(res => res.json())
}