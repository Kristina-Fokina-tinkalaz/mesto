import { openPopup, popupImg, imgGallery, imagePopupCaption } from "./index.js";

export class Card {
  constructor(image, title, templateSelector) {
    this._image = image;
    this._title = title;
    this._templateSelector = templateSelector;
    this._cardHeartChangeClass = "card__heart_change";
    this._cardSelector = ".card";
    this._cardImageSelector = ".card__image";
    this._cardHeartSelector = ".card__heart";
    this._cardTrashSelector = ".card__trash";
    this._cardTextSelector = ".card__text";
  }
  _changeHeart(evt) {
    evt.target.classList.toggle(this._cardHeartChangeClass);
  }
  _deleteCard(evt) {
    evt.target.closest(this._cardSelector).remove();
  }
  _openPopupImg() {
    imgGallery.src = this._image;
    imgGallery.alt = this._title;
    imagePopupCaption.textContent = this._title;
    openPopup(popupImg);
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
  }
  _setEventListeners() {
    const cardImage = this._element.querySelector(this._cardImageSelector);
    const heart = this._element.querySelector(this._cardHeartSelector);
    const buttonsTrash = this._element.querySelector(this._cardTrashSelector);

    heart.addEventListener("click", (evt) => {
      this._changeHeart(evt);
    });
    buttonsTrash.addEventListener("click", (evt) => {
      this._deleteCard(evt);
    });
    cardImage.addEventListener("click", () => {
      this._openPopupImg();
    });
  }
  createCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(this._cardImageSelector);

    cardImage.src = this._image;
    cardImage.alt = this._title;
    this._element.querySelector(this._cardTextSelector).textContent =
      this._title;

    this._setEventListeners();

    return this._element;
  }
}