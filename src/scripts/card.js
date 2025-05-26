export function createCard(
  cardTemplate, 
  cardContainer, 
  imageContainer, 
  titleContainer, 
  cardImage, 
  cardTitle) {
  const template = document.querySelector(cardTemplate).content;
  const card = template.querySelector(cardContainer).cloneNode(true);

  const image = card.querySelector(imageContainer);
  image.src = cardImage;
  image.alt = `Изображение места ${cardTitle}`;

  const title = card.querySelector(titleContainer);
  title.textContent = cardTitle;
  
  console.log(card);
  return card;

  /* итого: проще возвращать карточку, а в нужном месте использовать append/prepend */
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

