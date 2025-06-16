import {
  deleteCard as apiDeleteCard,
  likeCard as apiLikeCard,
  unlikeCard as apiUnlikeCard,
} from './api';
const cardTemplate = document.querySelector('#card-template').content;
const isLiked = 'card__like-button_is-active';

export function likeCard(e) {
  const likeButton = e.currentTarget;
  const cardElement = e.currentTarget.closest('.card');
  const likesCounter = cardElement.querySelector('.likes-counter');
  const cardId = cardElement.dataset.id;

  const isCurrentlyLiked = likeButton.classList.contains(isLiked);

  const apiAction = isCurrentlyLiked ? apiUnlikeCard : apiLikeCard;

  apiAction(cardId)
    .then((result) => {
      likesCounter.textContent = result.likes.length;
      likeButton.classList.toggle(isLiked);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
}

export function removeCard(e) {
  const deleteButton = e.currentTarget ? e.currentTarget : e;
  const cardElement = deleteButton.closest('.card');
  const cardId = cardElement.dataset.id;

  return apiDeleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(`Ошибка при удалении карточки: ${error}`);
    });
}

export function createCard(
  cardData,
  userId,
  likeHandler,
  deleteHandler,
  imageClickHandler,
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.dataset.id = cardData._id;

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeHandler);

  const likesCounterElement = cardElement.querySelector('.likes-counter');
  const likes = cardData.likes.length;
  likesCounterElement.textContent = likes;
  const checkForLike = cardData.likes.some((like) => like._id === userId);
  if (checkForLike) {
    likeButton.classList.add(isLiked);
  }

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', deleteHandler);
  }
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardData.name;

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение места ${cardData.name}`;
  cardImage.addEventListener('click', () =>
    imageClickHandler(cardData.name, cardData.link),
  );

  return cardElement;
}
