import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

import "../styles/pages/index.css";
import { initialCards } from "./cards.js"
import { createCard } from "./card.js";
import { openDialog, closeDialog } from "./modal.js";

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

/* карточки */

const cardsContainer = document.querySelector(".places__list");
const cardTemplate = "#card-template";
const cardElement = ".card";
const cardImage = ".card__image";
const cardTitle = ".card__title";

(function initCards() {
    initialCards.forEach((card) => {
        const _card = createCard(cardTemplate, cardElement, cardImage, cardTitle, card.link, card.name);
        cardsContainer.append(_card);
    })
}());

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupButtonOpen = document.querySelector(".profile__add-button");

const editAvatarPopup = document.querySelector(".popup_type_image");
const editAvatarPopupButtonOpen = document.querySelector(".profile__image");

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

editAvatarPopupButtonOpen.addEventListener("click", () => {
    openDialog(editAvatarPopup);
})

const createCardForm = addCardPopup.querySelector(".popup__form");
createCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const placeName = createCardForm.elements["place-name"].value;
    const imageLink = createCardForm.elements.link.value;

    const _card = createCard(cardTemplate, cardElement, cardImage, cardTitle, imageLink, placeName);
    cardsContainer.prepend(_card);

    closeDialog(addCardPopup);
    createCardForm.reset();
});

