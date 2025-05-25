export function createCard(cardsContainer, cardTemplate, cardContainer, imageContainer, titleContainer, cardImage, cardTitle) {
  const container = document.querySelector(cardsContainer);
  const template = document.querySelector(cardTemplate).content;
  const card = template.querySelector(cardContainer).cloneNode(true);

  const image = card.querySelector(imageContainer);
  image.src = cardImage;
  image.alt = `Изображение места ${cardTitle}`;

  const title = card.querySelector(titleContainer);
  title.textContent = cardTitle;
  
  container.prepend(card);

  /* итого: проще возвращать карточку, а в нужном месте использовать append/prepend */
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

