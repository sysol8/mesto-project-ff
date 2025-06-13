const token = process.env.TOKEN;
const id = process.env.ID;

const config = {
  baseURL: `https://nomoreparties.co/v1/${id}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

export function getUserData() {
  return fetch(`${config.baseURL}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
}

export function getInitialCards() {
  return fetch(`${config.baseURL}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
}
