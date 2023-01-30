import { Popup } from "./Popup.js";
export { PopupConfirmation };

class PopupConfirmation extends Popup {
  constructor(popup, submit) {
    super(popup);

    this._submit = submit;
    this._iconClose = popup.querySelector(".close-icon");
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
      // this.close();
    });
  }
}
