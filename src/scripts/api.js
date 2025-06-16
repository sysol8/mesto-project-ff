const token = process.env.TOKEN;
const id = process.env.ID;

const config = {
  baseURL: `https://nomoreparties.co/v1/${id}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  },
};

export const getUserData = () => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

export const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

export const editProfile = (nameInputValue, descriptionInputValue) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInputValue,
      about: descriptionInputValue,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

export const editAvatar = (avatarUrlInputValue) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrlInputValue,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

export const addCard = (cardName, imageLink) => {
  return fetch(`${config.baseURL}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: imageLink,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
};

//
