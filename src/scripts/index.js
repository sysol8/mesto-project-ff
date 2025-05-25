import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

import "../styles/pages/index.css";
import { initialCards } from "./cards.js"
import { createCard } from "./card.js";
import { openDialog, closeDialog } from "./modal.js";

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

/* карточки */

const cardsContainer = ".places__list";
const cardTemplate = "#card-template";
const cardElement = ".card";
const cardImage = ".card__image";
const cardTitle = ".card__title";

(function initCards() {
    initialCards.forEach((card) => {
        createCard(cardsContainer, cardTemplate, cardElement, cardImage, cardTitle, card.link, card.name);
    })
}());

/* конец карточек */

const isOpened = "popup_is-opened";
const isAnimated = "popup_is-animated";

const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfilePopupButtonOpen = document.querySelector(".profile__edit-button");

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupButtonOpen = document.querySelector(".profile__add-button");

const editAvatarPopup = document.querySelector(".popup_type_image");
const editAvatarPopupButtonOpen = document.querySelector(".profile__image");

const dialogs = document.querySelectorAll(".popup");

(function() {
    dialogs.forEach(dialog => {
        dialog.classList.add(isAnimated);
    })
}());

editProfilePopupButtonOpen.addEventListener("click", () => {
    openDialog(editProfilePopup, isOpened);
})

addCardPopupButtonOpen.addEventListener("click", () => {
    openDialog(addCardPopup, isOpened);
})

editAvatarPopupButtonOpen.addEventListener("click", () => {
    openDialog(editAvatarPopup, isOpened);
})

const createCardForm = addCardPopup.querySelector(".popup__form");
createCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const placeName = createCardForm.elements["place-name"].value;
    const link = createCardForm.elements.link.value;

    createCard(cardsContainer, cardTemplate, cardElement, cardImage, cardTitle, placeName, link);
})
