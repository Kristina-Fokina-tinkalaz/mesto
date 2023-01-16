import { Popup } from "./Popup.js";
export { PopupWithImage };

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imgGallery = popup.querySelector(".popup__img");
    this._imagePopupCaption = popup.querySelector(".popup__text");
  }

  open(title, image) {
    this._imgGallery.src = image;
    this._imgGallery.alt = title;
    this._imagePopupCaption.textContent = title;
    super.open();
  }
}
