export class formValidator {
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
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
  hideFormErrors() {
    const inputs = this._form.querySelectorAll(this._formInputErrorSelector);
    inputs.forEach((item) => {
      this._hideInputError(item);
    });
  }
  enableValidation() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement, this._form);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
}
