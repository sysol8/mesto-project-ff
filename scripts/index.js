function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

const cardsContainer = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  cardsContainer.append(card);
});
