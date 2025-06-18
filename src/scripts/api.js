const token = process.env.TOKEN;
const id = process.env.ID;

const config = {
  baseURL: `https://nomoreparties.co/v1/${id}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
};

function getResponseData(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
}

export const getUserData = () => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then(getResponseData);
};

export const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'GET',
    headers: config.headers,
  }).then(getResponseData);
};

export const editProfile = (nameInputValue, descriptionInputValue) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInputValue,
      about: descriptionInputValue,
    }),
  }).then(getResponseData);
};

export const editAvatar = (avatarUrlInputValue) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrlInputValue,
    }),
  }).then(getResponseData);
};

export const addCard = (cardName, imageLink) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: imageLink,
    }),
  }).then(getResponseData);
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(getResponseData);
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(getResponseData);
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(getResponseData);
};
