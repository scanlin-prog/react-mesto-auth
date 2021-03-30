export const BASE_URL = 'http://localhost:3001';

function handleResponce(response) {
    if (response.ok) {
        return response.json();
    } else {
        console.log('_handleResponse rejection')
        return Promise.reject(response.statusText)
    }
}

export const register = (email, password, name, about, avatar) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name, about, avatar})
    })
        .then(handleResponce)
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(handleResponce)
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(handleResponce)
}