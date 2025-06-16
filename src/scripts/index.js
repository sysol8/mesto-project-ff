import logo from '../images/logo.svg';
import '../styles/pages/index.css';

import { createCard, likeCard, removeCard } from './card.js';
import { openDialog, closeDialog, closeDialogByOverlayClick } from './modal.js';
import {
  getUserData,
  getInitialCards,
  editProfile,
  editAvatar,
  addCard,
} from './api';
import { enableValidation, resetValidation } from './validation';

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_is-invalid',
  errorClass: 'error_is-visible',
};

const avatarElement = document.querySelector('.profile__image');
document.querySelector('.logo').src = logo;

const imageDialog = document.querySelector('.popup_type_image');
const dialogImage = imageDialog.querySelector('.popup__image');
const dialogCaption = imageDialog.querySelector('.popup__caption');

const cardsContainer = document.querySelector('.places__list');

const cardDialog = document.querySelector('.popup_type_new-card');
const cardDialogButton = document.querySelector('.profile__add-button');

const createCardForm = cardDialog.querySelector('.popup__form');
const createCardFormSubmitButton =
  createCardForm.querySelector('.popup__button');

const placeNameInput = createCardForm.elements['place-name'];
const imageLinkInput = createCardForm.elements['link'];

const profileDialog = document.querySelector('.popup_type_edit');
const profileDialogButton = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = profileDialog.querySelector('.popup__form');
const profileFormSubmitButton = profileForm.querySelector('.popup__button');

const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const avatarDialog = document.querySelector('.popup_type_edit-avatar');
const avatarDialogButton = document.querySelector(
  '.profile__edit-image-button',
);
const avatarForm = avatarDialog.querySelector('.popup__form');
const avatarUrlInput = avatarForm.querySelector('.popup__input');
const avatarFormSubmitButton = avatarForm.querySelector('.popup__button');

const cardDeleteDialog = document.querySelector('.popup_type_delete-card');
const cardDeleteForm = cardDeleteDialog.querySelector('.popup__form');
const cardDeleteFormSubmitButton =
  cardDeleteForm.querySelector('.popup__button');

const dialogs = [
  imageDialog,
  cardDialog,
  profileDialog,
  avatarDialog,
  cardDeleteDialog,
];

let cardToDeleteButton = null;

function openCardDeleteDialog(e) {
  cardToDeleteButton = e.currentTarget;
  openDialog(cardDeleteDialog);
}

cardDeleteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  setButtonLoading(cardDeleteFormSubmitButton, true);
  removeCard(cardToDeleteButton)
    .then(() => {
      closeDialog(cardDeleteDialog);
      cardToDeleteButton = null;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setButtonLoading(cardDeleteFormSubmitButton, false);
    });
});

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
      openCardDeleteDialog,
      openImageDialog,
    );
    cardsContainer.append(card);
  });
});

function setButtonLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.textContent = 'Сохранение...';
    button.classList.add('popup__button_disabled');
  } else {
    button.disabled = false;
    button.textContent = 'Сохранить';
    button.classList.remove('popup__button_disabled');
  }
}

function openImageDialog(name, link) {
  dialogImage.src = link;
  dialogImage.alt = name;
  dialogCaption.textContent = name;
  openDialog(imageDialog);
}

cardDialogButton.addEventListener('click', () => {
  createCardForm.reset();
  resetValidation(createCardForm, validationSettings);
  openDialog(cardDialog);
});

function handleCreateCardSubmit(e) {
  const name = placeNameInput.value;
  const link = imageLinkInput.value;
  setButtonLoading(createCardFormSubmitButton, true);
  addCard(name, link)
    .then((newCardData) => {
      const _card = createCard(
        newCardData,
        userId,
        likeCard,
        openCardDeleteDialog,
        openImageDialog,
      );

      cardsContainer.prepend(_card);
      closeDialog(cardDialog);
      createCardForm.reset();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setButtonLoading(createCardFormSubmitButton, false);
    });
}

createCardForm.addEventListener('submit', handleCreateCardSubmit);

profileDialogButton.addEventListener('click', () => {
  openDialog(profileDialog);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileForm, validationSettings);
});

function handleProfileFormSubmit(e) {
  const newName = profileNameInput.value;
  const newDescription = profileDescriptionInput.value;

  setButtonLoading(profileFormSubmitButton, true);
  editProfile(newName, newDescription)
    .then(() => {
      profileName.textContent = newName;
      profileDescription.textContent = newDescription;
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    })
    .finally(() => {
      setButtonLoading(profileFormSubmitButton, false);
    });

  closeDialog(profileDialog);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeDialog(dialog));

  dialog.addEventListener('click', closeDialogByOverlayClick(dialog));
});

avatarDialogButton.addEventListener('click', () => {
  avatarUrlInput.value = '';
  openDialog(avatarDialog);
  resetValidation(avatarForm, validationSettings);
});

function handleAvatarFormSubmit() {
  const newAvatar = avatarUrlInput.value;
  setButtonLoading(avatarFormSubmitButton, true);
  editAvatar(newAvatar)
    .then(() => {
      avatarElement.style.backgroundImage = `url(${newAvatar})`;
      closeDialog(avatarDialog);
      setTimeout(() => setButtonLoading(avatarFormSubmitButton, false), 600);
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
      setButtonLoading(avatarFormSubmitButton, false);
    });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

enableValidation(validationSettings);

/* Сделать рефакторинг, проверить названия переменных, поправить
код в хендлерах сабмита как в handleAvatarFormSubmit */
