import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

import "../styles/pages/index.css";

import { initialCards } from "./cards.js"
import { createCard, likeCard, deleteCard } from "./card.js";
import { openDialog, closeDialog } from "./modal.js";

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

/* карточки */

const imageDialog = document.querySelector(".popup_type_image");
const dialogImage = imageDialog.querySelector(".popup__image");
const dialogCaption = imageDialog.querySelector(".popup__caption");

function openImageDialog(name, link) {
  return function (e) {
    if (!e.target.matches('.card__image')) return;
    dialogImage.src = link;
    dialogImage.alt = name;
    dialogCaption.textContent = name;
    openDialog(imageDialog);
  };
}

const cardsContainer = document.querySelector(".places__list");

(function initCards() {
    initialCards.forEach((card) => {
        const _card = createCard(card.name, card.link, likeCard, deleteCard);
        _card.addEventListener("click", openImageDialog(card.name, card.link));
        cardsContainer.append(_card);
    })
}()); 

const addCardDialog = document.querySelector(".popup_type_new-card");
const addCardDialogButtonOpen = document.querySelector(".profile__add-button");

/* редактирование профиля */

const editProfileDialog = document.querySelector(".popup_type_edit");
const editProfileDialogButtonOpen = document.querySelector(".profile__edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfieForm = editProfileDialog.querySelector(".popup__form");

editProfileDialogButtonOpen.addEventListener("click", () => {
    openDialog(editProfileDialog);
    editProfieForm.elements.name.value = profileTitle.textContent;
    editProfieForm.elements.description.value = profileDescription.textContent;
})

editProfieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = editProfieForm.elements.name.value;
    const description = editProfieForm.elements.description.value;

    profileTitle.textContent = name;
    profileDescription.textContent = description;

    closeDialog(editProfileDialog);
})

/* конец редактирования профиля */

addCardDialogButtonOpen.addEventListener("click", () => {
    openDialog(addCardDialog);
})

const createCardForm = addCardDialog.querySelector(".popup__form");

createCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const placeName = createCardForm.elements["place-name"].value;
    const imageLink = createCardForm.elements["link"].value;

    const _card = createCard(placeName, imageLink, likeCard, deleteCard);
    _card.addEventListener("click", openImageDialog(placeName, imageLink));
    cardsContainer.prepend(_card);

    closeDialog(addCardDialog);
    createCardForm.reset();
});

