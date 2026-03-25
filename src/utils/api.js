import { getStoredToken } from "./auth.js";

// Chamadas s API Around (cartões, perfil).
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getHeaders() {
    const token = getStoredToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  // status 200 = ok; senão rejeita
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
  }

  // Algumas resposta
  _unwrapUser(data) {
    if (data && data.data !== undefined && typeof data.data === "object") {
      return data.data;
    }
    return data;
  }

  // --- Cartões ---
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  // --- Perfil nome, sobre, avatar
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    })
      .then((res) => this._checkResponse(res))
      .then((data) => this._unwrapUser(data));
  }

  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    })
      .then((res) => this._checkResponse(res))
      .then((resData) => this._unwrapUser(resData));
  }

  updateAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    })
      .then((res) => this._checkResponse(res))
      .then((resData) => this._unwrapUser(resData));
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then((res) => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }
}

// Uma instncia só para importar
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
});

export default api;
