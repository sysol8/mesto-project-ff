const cardTemplate = document.querySelector("#card-template").content;

export function likeCard(e) {
  const likeButton = e.currentTarget;
  likeButton.classList.toggle("card__like-button_is-active");
}

export function deleteCard(e) {
  const cardElement = e.currentTarget.closest(".card");
  cardElement.remove();
}

export function createCard(
  cardData,
  userId,
  likeHandler,
  deleteHandler,
  imageClickHandler
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeHandler);

  const likesCounterElement = cardElement.querySelector(".likes-counter");
  const likes = cardData.likes.length;
  likesCounterElement.textContent = likes;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", deleteHandler);
  }
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места ${cardData.name}`;
  cardImage.addEventListener("click", () => imageClickHandler(cardData.name, cardData.link));

  console.log('Card owner:', cardData.owner._id, 'Current user:', userId);

  return cardElement;
}
