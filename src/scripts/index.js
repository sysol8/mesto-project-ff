import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

import "../styles/pages/index.css";

import { initialCards } from "./cards.js"
import { createCard, likeCard, deleteCard } from "./card.js";
import { openDialog, closeDialog } from "./modal.js";

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

/* карточки */

const cardsContainer = document.querySelector(".places__list");

(function initCards() {
    initialCards.forEach((card) => {
        const _card = createCard(card.name, card.link, likeCard, deleteCard);
        cardsContainer.append(_card);
    })
}());

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupButtonOpen = document.querySelector(".profile__add-button");

/* редактирование профиля */

const editProfilePopup = document.querySelector(".popup_type_edit");
const editProfilePopupButtonOpen = document.querySelector(".profile__edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfieForm = editProfilePopup.querySelector(".popup__form");

editProfilePopupButtonOpen.addEventListener("click", () => {
    openDialog(editProfilePopup);
    editProfieForm.elements.name.value = profileTitle.textContent;
    editProfieForm.elements.description.value = profileDescription.textContent;
})

editProfieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = editProfieForm.elements.name.value;
    const description = editProfieForm.elements.description.value;

    profileTitle.textContent = name;
    profileDescription.textContent = description;

    closeDialog(editProfilePopup);
})

/* конец редактирования профиля */

addCardPopupButtonOpen.addEventListener("click", () => {
    openDialog(addCardPopup);
})

const createCardForm = addCardPopup.querySelector(".popup__form");

createCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const placeName = createCardForm.elements["place-name"].value;
    const imageLink = createCardForm.elements["link"].value;

    const _card = createCard(placeName, imageLink, likeCard, deleteCard);
    cardsContainer.prepend(_card);

    closeDialog(addCardPopup);
    createCardForm.reset();
});

