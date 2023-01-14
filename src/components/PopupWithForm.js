import { Popup } from "./Popup.js";
import { formAdd, iconsClose, popupCards } from "../utils/constants.js";
import { newValidFormAdd, closeNewPopup, generateNewCard } from "../index.js";
export { PopupWithForm };

class PopupWithForm extends Popup {
  constructor(SelectorPopup, sabmit) {
    super(SelectorPopup);
    this._sabmit = sabmit;
  }
  _getInputValues(evt) {
    evt.preventDefault();
    const cardReturn = generateNewCard(
      formAdd.link.value,
      formAdd.nameAdd.value
    );

    this._sabmit(cardReturn);
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
    this._selectorPopup.addEventListener("submit", (evt) => {
      this._getInputValues(evt);
      this.close();
    });
  }

  close() {
    closeNewPopup(this._selectorPopup);
    formAdd.reset();
    newValidFormAdd.disablButton();
    newValidFormAdd.hideFormErrors();
  }
}
