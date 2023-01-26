export { Card };

class Card {
  constructor(
    image,
    title,
    cardId,
    templateSelector,
    handleCardClick,
    deleteCard
  ) {
    this._image = image;
    this._title = title;
    this._cardId = cardId;
    this._templateSelector = templateSelector;
    this._cardHeartChangeClass = "card__heart_change";
    this._cardSelector = ".card";
    this._cardsSelector = ".cards";
    this._cardImageSelector = ".card__image";
    this._cardHeartSelector = ".card__heart";
    this._cardTrashSelector = ".card__trash";
    this._cardTextSelector = ".card__text";
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
  }
  _changeHeart(evt) {
    evt.target.classList.toggle(this._cardHeartChangeClass);
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
  }
  deleteCard() {
    this._element.remove();
  }
  _setEventListeners() {
    const heart = this._element.querySelector(this._cardHeartSelector);
    const buttonsTrash = this._element.querySelector(this._cardTrashSelector);

    heart.addEventListener("click", (evt) => {
      this._changeHeart(evt);
    });
    buttonsTrash.addEventListener("click", () => {
      this._deleteCard();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector(this._cardTextSelector).textContent =
      this._title;
    this._element.id = this._cardId;
    this._setEventListeners();

    return this._element;
  }
}
