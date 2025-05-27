import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

import "../styles/pages/index.css";

import { initialCards } from "./cards.js"
import { createCard, likeCard, deleteCard } from "./card.js";
import { openDialog, closeDialog } from "./modal.js";

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

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
        const handler = openImageDialog(card.name, card.link);
        const _card = createCard(card.name, card.link, likeCard, deleteCard, handler);
        cardsContainer.append(_card);
    })
}()); 

const cardDialog = document.querySelector(".popup_type_new-card");
const cardDialogButton = document.querySelector(".profile__add-button");

const cardDialogInputs = cardDialog.querySelectorAll(".popup__input");

cardDialogButton.addEventListener("click", () => {
    cardDialogInputs.forEach((input) => {
        input.value = ''
    });
    openDialog(cardDialog);
})

const createCardForm = cardDialog.querySelector(".popup__form");

function createCardFormHandler(e) {
    e.preventDefault();

    const placeName = createCardForm.elements["place-name"].value;
    const imageLink = createCardForm.elements["link"].value;

    const _card = createCard(placeName, imageLink, likeCard, deleteCard);
    _card.addEventListener("click", openImageDialog(placeName, imageLink));
    cardsContainer.prepend(_card);

    closeDialog(cardDialog);
    createCardForm.reset();
}

createCardForm.addEventListener("submit", createCardFormHandler);

/*  */

const profileDialog = document.querySelector(".popup_type_edit");
const profileDialogButton = document.querySelector(".profile__edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profieForm = profileDialog.querySelector(".popup__form");

profileDialogButton.addEventListener("click", () => {
    openDialog(profileDialog);
    profieForm.elements.name.value = profileTitle.textContent;
    profieForm.elements.description.value = profileDescription.textContent;
})

function profileFormHandler(e) {
    e.preventDefault();

    const name = profieForm.elements.name.value;
    const description = profieForm.elements.description.value;

    profileTitle.textContent = name;
    profileDescription.textContent = description;

    closeDialog(profileDialog);
}

profieForm.addEventListener("submit", profileFormHandler);

const dialogs = [imageDialog, cardDialog, profileDialog];
dialogs.forEach((dialog) => {
    const closeButton = dialog.querySelector(".popup__close");
    closeButton.addEventListener("click", () => closeDialog(dialog));

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
            closeDialog(dialog);
        }
    })
})

