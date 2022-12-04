const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
class card {
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
initialCards.forEach(function (item) {
  const cardTemplateElement = document.querySelector(".cards");
  const newCard = new card(item.link, item.name, ".cards");
  const cardReturn = newCard.createCard();
  cardTemplateElement.append(cardReturn);
});
