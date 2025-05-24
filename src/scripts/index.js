import avatar from "../images/avatar.jpg";
import logo from "../images/logo.svg";

import "../styles/pages/index.css";
import { openPopup } from "./modal";

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.logo').src = logo;

const editPopup = document.querySelector(".popup_type_edit");
const editPopupButtonOpen = document.querySelector(".profile__edit-button");
const editPopupButtonClose = editPopup.querySelector(".popup__close");

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardPopupButtonOpen = document.querySelector(".profile__add-button");
const addCardPopupButtonClose = addCardPopup.querySelector(".popup__close");

const editAvatarPopup = document.querySelector(".popup_type_image");
const editAvatarPopupButtonOpen = document.querySelector(".profile__image");
const editAvatarPopupButtonClose = editAvatarPopup.querySelector(".popup__close");

openPopup(editPopupButtonOpen, editPopup, editPopupButtonClose);
openPopup(addCardPopupButtonOpen, addCardPopup, addCardPopupButtonClose);
openPopup(editAvatarPopupButtonOpen, editAvatarPopup, editAvatarPopupButtonClose);