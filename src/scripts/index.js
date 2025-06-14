import logo from "../images/logo.svg";
import "../styles/pages/index.css";

import { initialCards } from "./cards.js";
import { createCard, likeCard, deleteCard } from "./card.js";
import { openDialog, closeDialog, closeDialogByOverlayClick } from "./modal.js";
import { getUserData, getInitialCards, editProfile, addCard } from "./api";
import { enableValidation, resetValidation } from "./validation";

const avatarElement = document.querySelector(".profile__image");
document.querySelector(".logo").src = logo;

const imageDialog = document.querySelector(".popup_type_image");
const dialogImage = imageDialog.querySelector(".popup__image");
const dialogCaption = imageDialog.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".places__list");

const cardDialog = document.querySelector(".popup_type_new-card");
const cardDialogButton = document.querySelector(".profile__add-button");

const createCardForm = cardDialog.querySelector(".popup__form");

const placeNameInput = createCardForm.elements["place-name"];
const imageLinkInput = createCardForm.elements["link"];

const profileDialog = document.querySelector(".popup_type_edit");
const profileDialogButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = profileDialog.querySelector(".popup__form");

const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const dialogs = [imageDialog, cardDialog, profileDialog];

let userId = null;

Promise.all([getUserData(), getInitialCards()]).then(([userData, cards]) => {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  avatarElement.style.backgroundImage = `url(${userData.avatar})`

  userId = userData._id;

  cards.forEach(cardData => {
    const card = createCard(
      cardData,
      userId,
      likeCard,
      deleteCard,
      openImageDialog
    );
    cardsContainer.append(card);
  })
});

function openImageDialog(name, link) {
  dialogImage.src = link;
  dialogImage.alt = name;
  dialogCaption.textContent = name;
  openDialog(imageDialog);
}

cardDialogButton.addEventListener("click", () => {
  createCardForm.reset();
  resetValidation(createCardForm);
  openDialog(cardDialog);
});

function handleCreateCardSubmit(e) {
  e.preventDefault();

  const name = placeNameInput.value;
  const link = imageLinkInput.value;

  addCard(name, link).then((newCardData) => {
    const _card = createCard(
      newCardData,
      userId,
      likeCard,
      deleteCard,
      openImageDialog,
    );

    cardsContainer.prepend(_card);
    closeDialog(cardDialog);
    createCardForm.reset();
  })
}

createCardForm.addEventListener("submit", handleCreateCardSubmit);

profileDialogButton.addEventListener("click", () => {
  openDialog(profileDialog);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileForm);
});

function handleProfileFormSubmit(e) {
  e.preventDefault();
  const newName = profileNameInput.value;
  const newDescription = profileDescriptionInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  editProfile(newName, newDescription);

  closeDialog(profileDialog);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeDialog(dialog));

  dialog.addEventListener("click", closeDialogByOverlayClick(dialog));
});

enableValidation();
