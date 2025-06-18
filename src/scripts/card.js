import {
  deleteCard as apiDeleteCard,
  likeCard as apiLikeCard,
  unlikeCard as apiUnlikeCard,
} from './api';
const cardTemplate = document.querySelector('#card-template').content;
const isLiked = 'card__like-button_is-active';

export function likeCard(cardId, likeButton, likesCounter) {
  const isCurrentlyLiked = likeButton.classList.contains(isLiked);
  const apiAction = isCurrentlyLiked ? apiUnlikeCard : apiLikeCard;

  apiAction(cardId)
    .then((result) => {
      likesCounter.textContent = result.likes.length;
      likeButton.classList.toggle(isLiked);
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`);
    });
}

export function removeCard(cardId, deleteButton) {
  return apiDeleteCard(cardId)
    .then(() => {
      deleteButton.closest('.card').remove();
    })
    .catch((error) => {
      console.error(`Ошибка при удалении карточки: ${error}`);
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

  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCounterElement = cardElement.querySelector('.likes-counter');
  likesCounterElement.textContent = cardData.likes.length;

  const checkForLike = cardData.likes.some((like) => like._id === userId);
  if (checkForLike) {
    likeButton.classList.add(isLiked);
  }

  likeButton.addEventListener('click', () => {
    likeHandler(cardData._id, likeButton, likesCounterElement);
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      deleteHandler(cardData._id, deleteButton);
    });
  } else {
    deleteButton.style.display = 'none';
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
