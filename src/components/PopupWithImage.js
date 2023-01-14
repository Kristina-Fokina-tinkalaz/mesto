import { Popup } from "./Popup.js";
import { openNewPopup } from "../index.js";
import { imgGallery, imagePopupCaption, popupImg } from "../utils/constants.js";
export { PopupWithImage };

class PopupWithImage extends Popup {
  constructor(SelectorPopup, image, title) {
    super(SelectorPopup);
    this._image = image;
    this._title = title;
  }
  open() {
    this._selectorPopup.classList.add("popup__opened");
    this.setEventListeners();
    imgGallery.src = this._image;
    imgGallery.alt = this._title;
    imagePopupCaption.textContent = this._title;
    openNewPopup(popupImg);
  }
}
