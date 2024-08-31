const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-21',
  headers: {
    authorization: 'b0628161-c71c-4e52-9e26-a3e056174f00',
    'Content-Type': 'application/json'
  }
};

const checkResponse = (res) => {
  if (!res.ok)
    return Promise.reject(`Ошибка: ${res.status}`);
  return res.json();
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => checkResponse(res))
    .catch(err => console.error(err));
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => checkResponse(res))
    .catch(err => console.error(err));
};

export const updateUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  })
    .catch(err => console.error(err));
};

export const updateUserAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(res => checkResponse(res))
    .catch(err => console.error(err));
};

export const addCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
    .then(res => checkResponse(res))
    .catch(err => console.error(err));
};

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkResponse(res))
    .catch(err => console.error(err));
};

export const requestLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => checkResponse(res))
    .catch(err => console.error(err));
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkResponse(res))
    .catch(err => console.error(err));
};

export const validateImageUrl = (url) => {
  return fetch(url, {
    method: 'HEAD'
  })
    .then(res => {
      if (!res.ok) {
        return false;
      }

      const contentType = res.headers.get('Content-Type');
      if (!contentType || !contentType.startsWith('image/')) {
        return false;
      }

      return true;
    })
    .catch(() => false);
};
