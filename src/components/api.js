const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
  headers: {
    authorization: 'b0628161-c71c-4e52-9e26-a3e056174f00',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const updateUserInfo = (name, about) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .catch((err) => {
      console.log(err);
    });
}

export const addCard = (name, link) => {
  fetch(`${config.baseUrl}/cards`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .catch((err) => {
      console.log(err);
    });
}

export const removeCard = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE'
  })
    .catch((err) => {
      console.log(err);
    });
}

export const likeCard = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT'
  })
    .catch((err) => {
      console.log(err);
    });
}

export const unlikeCard = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE'
  })
    .catch((err) => {
      console.log(err);
    });
}

export const updateUserAvatar = (url) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(res => {
      if (res.ok) {
        return
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}