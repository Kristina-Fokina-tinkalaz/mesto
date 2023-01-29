import { Popup } from "./Popup.js";
export { PopupWithForm };

class PopupWithForm extends Popup {
  constructor(popup, submit) {
    super(popup);
    this._submit = submit;
    this._iconClose = popup.querySelector(".close-icon");
    this._inputs = popup.querySelectorAll(".form__input");
    this._buttonSubmit = popup.querySelector(".form__button");
  }
  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(function (input) {
      inputValues[input.name] = input.value;
    });
    this._inputValues = inputValues;
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = "Сохранение...";
    } else {
      this._buttonSubmit.textContent = "Сохранить";
    }
  }
}
