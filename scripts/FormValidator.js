export class FormValidator {
  constructor(formData, form) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._formInputErrorSelector = formData.formInputErrorSelector;
    this._inputClass = formData.inputClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._errorMessageClass = formData.errorMessageClass;
    this._form = form;
    this._inputList = Array.from(form.querySelectorAll(formData.inputSelector));
    this._buttonElement = form.querySelector(formData.submitButtonSelector);
  }
  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.name}-error`);
    input.classList.remove(this._inputClass);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorMessageClass);
  }
  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.name}-error`);
    input.classList.remove(this._inputErrorClass);
    input.classList.add(this._inputClass);
    error.textContent = " ";
    error.classList.remove(this._errorMessageClass);
  }
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  disablButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disablButton();
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
  hideFormErrors() {
    const inputs = this._form.querySelectorAll(this._formInputErrorSelector);
    inputs.forEach((item) => {
      this._hideInputError(item);
    });
  }
  enableValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, this._form);
        this._toggleButtonState();
      });
    });
  }
}
