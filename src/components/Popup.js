export { Popup };
import { iconsClose, popupCards } from "../utils/constants.js";

class Popup {
  constructor(SelectorPopup) {
    this._selectorPopup = SelectorPopup;
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
    this._selectorPopup.classList.add("popup__opened");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._selectorPopup.classList.remove("popup__opened");
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  setEventListeners() {
    iconsClose.forEach((item) => {
      item.addEventListener("click", () => {
        this.close();
      });
    });
    popupCards.forEach((item) => {
      item.addEventListener("click", (evt) => {
        this._closePopupClickOverlay(evt);
      });
    });
  }
}
