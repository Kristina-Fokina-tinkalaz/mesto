export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getResult(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(`Что-то пошло не так: ${data.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}` + `/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }

  getUserData() {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }

  saveEditData(dataName, dataAbout) {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: dataName,
        about: dataAbout,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }
  addNewCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}` + `/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}` + `/cards/` + `${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }
  addLike(cardId) {
    return fetch(`${this._baseUrl}` + `/cards/` + `${cardId}` + `/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}` + `/cards/` + `${cardId}` + `/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._getResult(res);
    });
  }
  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}` + `/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._getResult(res);
    });
  }
}
