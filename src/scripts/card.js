const cardTemplate = document.querySelector("#card-template").content;

export function likeCard(e) {
  const likeButton = e.currentTarget;
  likeButton.classList.toggle("card__like-button_is-active");
};

export function deleteCard(e) {
  const cardElement = e.currentTarget.closest(".card");
  cardElement.remove();
}

export function createCard(name, link, likeHandler, deleteHandler, imageClickHandler) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeHandler);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteHandler);

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = name;
  
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = `Изображение места ${name}`;
  cardImage.addEventListener("click", imageClickHandler);

  return cardElement;
}

