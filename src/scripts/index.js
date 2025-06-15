import logo from "../images/logo.svg";
import "../styles/pages/index.css";

import { createCard, likeCard, removeCard } from "./card.js";
import { openDialog, closeDialog, closeDialogByOverlayClick } from "./modal.js";
import {
  getUserData,
  getInitialCards,
  editProfile,
  editAvatar,
  addCard,
  deleteCard,
} from "./api";
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
const createCardFormSubmitButton =
  createCardForm.querySelector(".popup__button");

const placeNameInput = createCardForm.elements["place-name"];
const imageLinkInput = createCardForm.elements["link"];

const profileDialog = document.querySelector(".popup_type_edit");
const profileDialogButton = document.querySelector(".profile__edit-button");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileForm = profileDialog.querySelector(".popup__form");
const profileFormSubmitButton = profileForm.querySelector(".popup__button");

const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const avatarDialog = document.querySelector(".popup_type_edit-avatar");
const avatarDialogButton = document.querySelector(
  ".profile__edit-image-button",
);
const avatarForm = avatarDialog.querySelector(".popup__form");
const avatarUrlInput = avatarForm.querySelector(".popup__input");
const avatarFormSubmitButton = avatarForm.querySelector(".popup__button");

const dialogs = [imageDialog, cardDialog, profileDialog, avatarDialog];

let userId = null;

Promise.all([getUserData(), getInitialCards()]).then(([userData, cards]) => {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  avatarElement.style.backgroundImage = `url(${userData.avatar})`;

  userId = userData._id;

  cards.forEach((cardData) => {
    const card = createCard(
      cardData,
      userId,
      likeCard,
      removeCard,
      openImageDialog,
    );
    cardsContainer.append(card);
  });
});

function openImageDialog(name, link) {
  dialogImage.src = link;
  dialogImage.alt = name;
  dialogCaption.textContent = name;
  openDialog(imageDialog);
}

cardDialogButton.addEventListener("click", () => {
  createCardFormSubmitButton.textContent = "Сохранить";
  createCardForm.reset();
  resetValidation(createCardForm);
  openDialog(cardDialog);
});

function handleCreateCardSubmit(e) {
  e.preventDefault();

  const name = placeNameInput.value;
  const link = imageLinkInput.value;
  createCardFormSubmitButton.textContent = "Сохранение...";
  addCard(name, link).then((newCardData) => {
    const _card = createCard(
      newCardData,
      userId,
      likeCard,
      removeCard,
      openImageDialog,
    );

    cardsContainer.prepend(_card);
    closeDialog(cardDialog);
    createCardForm.reset();
  });
}

createCardForm.addEventListener("submit", handleCreateCardSubmit);

profileDialogButton.addEventListener("click", () => {
  profileFormSubmitButton.textContent = "Сохранить";
  openDialog(profileDialog);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileForm);
});

function handleProfileFormSubmit(e) {
  e.preventDefault();
  const newName = profileNameInput.value;
  const newDescription = profileDescriptionInput.value;

  profileFormSubmitButton.textContent = "Сохранение...";
  editProfile(newName, newDescription).then(() => {
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
  });

  closeDialog(profileDialog);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeDialog(dialog));

  dialog.addEventListener("click", closeDialogByOverlayClick(dialog));
});

avatarDialogButton.addEventListener("click", () => {
  avatarUrlInput.value = "";
  avatarFormSubmitButton.textContent = "Сохранить";
  openDialog(avatarDialog);
  resetValidation(avatarForm);
});

function handleAvatarFormSubmit(e) {
  e.preventDefault();
  const newAvatar = avatarUrlInput.value;
  avatarFormSubmitButton.textContent = "Сохранение...";
  editAvatar(newAvatar).then(() => {
    avatarElement.style.backgroundImage = `url(${newAvatar})`;
    closeDialog(avatarDialog);
  });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

enableValidation();

// 1. Проверить, все ли манипуляции с DOM происходят только после ответа от сервера;
// 2. Реализовать пункт 9 (лайк/анлайк);
// 3. Посмотреть, можно (и нужно ли) передавать объект настроек в функцию enableValidation, как написано в чек-листе
//    как написано в чек-листе;
// 4. Сделать попап удаления карточки;
// 5. Задеплоить на Github Pages;
