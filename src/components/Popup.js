export { Popup };

class Popup {
  constructor(popup) {
    this._popup = popup;
    this._iconClose = popup.querySelector(".close-icon");
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _closePopupClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup__opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._iconClose.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener(
      "click",
      this._closePopupClickOverlay.bind(this)
    );
  }
}
