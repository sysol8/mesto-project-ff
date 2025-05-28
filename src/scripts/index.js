import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";
import "../styles/pages/index.css";

import { initialCards } from "./cards.js";
import { createCard, likeCard, deleteCard } from "./card.js";
import { openDialog, closeDialog, closeDialogByOverlayClick } from "./modal.js";

document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;
document.querySelector(".logo").src = logo;

const imageDialog = document.querySelector(".popup_type_image");
const dialogImage = imageDialog.querySelector(".popup__image");
const dialogCaption = imageDialog.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".places__list");

const cardDialog = document.querySelector(".popup_type_new-card");
const cardDialogButton = document.querySelector(".profile__add-button");

const createCardForm = cardDialog.querySelector(".popup__form");

const profileDialog = document.querySelector(".popup_type_edit");
const profileDialogButton = document.querySelector(".profile__edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = profileDialog.querySelector(".popup__form");

const dialogs = [imageDialog, cardDialog, profileDialog];

function openImageDialog(name, link) {
  return function (e) {
    if (!e.target.matches(".card__image")) return;
    dialogImage.src = link;
    dialogImage.alt = name;
    dialogCaption.textContent = name;
    openDialog(imageDialog);
  };
}

(function initCards() {
  initialCards.forEach((card) => {
    const handler = openImageDialog(card.name, card.link);
    const _card = createCard(
      card.name,
      card.link,
      likeCard,
      deleteCard,
      handler
    );
    cardsContainer.append(_card);
  });
})();

cardDialogButton.addEventListener("click", () => {
  createCardForm.reset();
  openDialog(cardDialog);
});

function handleCreateCardSubmit(e) {
  e.preventDefault();

  const placeName = createCardForm.elements["place-name"].value;
  const imageLink = createCardForm.elements["link"].value;

  const handler = openImageDialog(placeName, imageLink);

  const _card = createCard(placeName, imageLink, likeCard, deleteCard, handler);
  cardsContainer.prepend(_card);

  closeDialog(cardDialog);
  createCardForm.reset();
}

createCardForm.addEventListener("submit", handleCreateCardSubmit);

profileDialogButton.addEventListener("click", () => {
  openDialog(profileDialog);
  profileForm.elements.name.value = profileTitle.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
});

function handleProfileFormSubmit(e) {
  e.preventDefault();

  const name = profileForm.elements.name.value;
  const description = profileForm.elements.description.value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;

  closeDialog(profileDialog);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeDialog(dialog));

  dialog.addEventListener("click", closeDialogByOverlayClick(dialog));
});

/* строки 36, 37, 47, 67 осталось поправить */
