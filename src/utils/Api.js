class Api {
    constructor(options) {
        this._baseurl = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log('_handleResponse rejection')
            return Promise.reject(response.statusText)
        }
    }

    getProfileData() {
        return fetch(`${this._baseurl}/users/me`, { headers: this._headers })
            .then(this._handleResponse)
    }

    sendProfileData(data) {
        return fetch(`${this._baseurl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    getCardsData() {
        return fetch(`${this._baseurl}/cards`, { headers: this._headers })
            .then(this._handleResponse)
    }

    sendCardData(data) {
        return fetch(`${this._baseurl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    toggleLikeCard(id, like) {
        return fetch(`${this._baseurl}/cards/${id}/likes`, {
            headers: this._headers,
            method: like ? 'PUT' : 'DELETE'
        })
            .then(this._handleResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseurl}/cards/${id}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(this._handleResponse)
    }

    changeAvatar({link}) {
        return fetch(`${this._baseurl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._handleResponse)
    }
}

export const api = new Api({
    baseUrl: 'https://api.teut.students.nomoreparties.co',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
})
