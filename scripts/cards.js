import { openPopup } from "./index.js";

export class card {
  constructor(image, title, templateSelector) {
    this._image = image;
    this._title = title;
    this._templateSelector = templateSelector;
  }
  _changeHeart(evt) {
    evt.target.classList.toggle("card__heart_change");
  }
  _deleteCard(evt) {
    evt.target.closest(".card").remove();
  }
  _openPopupImg(evt) {
    const popupImg = document.querySelector("#popup__galery");
    const imgGallery = document.querySelector(".popup__img");
    const imagePopupCaption = document.querySelector(".popup__text");
    openPopup(popupImg);
    imgGallery.src = evt.target.src;
    imgGallery.alt = evt.target.alt;
    imagePopupCaption.textContent = evt.target.alt;
  }

  createCard() {
    const cardClone = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const heart = cardClone.querySelector(".card__heart");
    const buttonsTrash = cardClone.querySelector(".card__trash");
    const cardImage = cardClone.querySelector(".card__image");

    cardImage.src = this._image;
    cardImage.alt = this._title;
    cardClone.querySelector(".card__text").textContent = this._title;

    heart.addEventListener("click", this._changeHeart);
    buttonsTrash.addEventListener("click", this._deleteCard);
    cardImage.addEventListener("click", this._openPopupImg);
    return cardClone;
  }
}
