export { Card };

class Card {
  constructor(
    image,
    title,
    cardId,
    arrayLikes,
    userId,
    templateSelector,
    handleCardClick,
    deleteCardClick,
    changeHeartApi,
    getHeart
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
    this._deleteCardClick = deleteCardClick;
    this._arrayLikes = arrayLikes;
    this._userId = userId;
    this._changeHeartApi = changeHeartApi;
    this._getHeart = getHeart;
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(this._cardSelector)
      .cloneNode(true);
  }

  activeLike() {
    const heart = this._element.querySelector(this._cardHeartSelector);
    heart.classList.add(this._cardHeartChangeClass);
  }
  noLike() {
    const heart = this._element.querySelector(this._cardHeartSelector);
    heart.classList.remove(this._cardHeartChangeClass);
  }

  addLike(data) {
    this._likes = this._element.querySelector(".card__number");
    this._likes.textContent = data.likes.length;
    this.activeLike();
  }
  deleteLike(data) {
    this._likes = this._element.querySelector(".card__number");
    this._likes.textContent = data.likes.length;
    this.noLike();
  }

  deleteCard() {
    this._element.remove();
  }
  _setEventListeners() {
    const heart = this._element.querySelector(this._cardHeartSelector);
    const buttonsTrash = this._element.querySelector(this._cardTrashSelector);

    heart.addEventListener("click", (evt) => {
      this._changeHeartApi(evt);
    });
    buttonsTrash.addEventListener("click", this._deleteCardClick);
    this._cardImage.addEventListener("click", this._handleCardClick);
  }

  removeTrash(profileUser) {
    if (this._userId != profileUser) {
      const trashButton = this._element.querySelector(".card__trash");
      trashButton.remove();
    }
  }
  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector(this._cardTextSelector).textContent =
      this._title;
    this._element.id = this._cardId;

    this._likes = this._element.querySelector(".card__number");
    this._likes.textContent = this._arrayLikes.length;

    this._setEventListeners();
    this._getHeart();

    return this._element;
  }
}
