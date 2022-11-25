function showInputError(input, errorMessage, form, validationData) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove(validationData.inputClass);
  input.classList.add(validationData.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(validationData.errorMessageClass);
}
function hideInputError(input, form, validationData) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove(validationData.inputErrorClass);
  input.classList.add(validationData.inputClass);
  error.textContent = "";
  error.classList.remove(validationData.errorMessageClass);
}
function checkInputValidity(input, form, validationData) {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, form, validationData);
  } else {
    hideInputError(input, form, validationData);
  }
}

const setEventListeners = (formElement, validationData) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationData.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationData.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, formElement, validationData);
      toggleButtonState(inputList, buttonElement, validationData);
    });
  });
};

function enableValidation(validationData) {
  const formList = Array.from(
    document.querySelectorAll(validationData.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationData);
  });
}
const validationData = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inputClass: "form__input",
  inputErrorClass: "form__input-error",
  inactiveButtonClass: "form__button_disabled",
  errorMessageClass: "form__massage-error",
};
enableValidation(validationData);

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationData) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationData.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(validationData.inactiveButtonClass);
  }
};
