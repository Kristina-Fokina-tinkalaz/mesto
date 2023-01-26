export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}` + `/cards`, {
      headers: this._headers,
    }).then((res) => {
      return res.json();
    });
  }

  getUserData() {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log("Ошибка"));
  }

  saveEditData(dataName, dataAbout) {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: dataName,
        about: dataAbout,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log("Ошибка"));
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
      return res.json();
    });
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}` + `/cards/` + `${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => res.json());
  }
}
