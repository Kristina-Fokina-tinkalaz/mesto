const formClasses = {
  formSelector: "form",
  input: "form__input",
  inputError: "form__input-error",
  massageError: "form__massage-error",
  buttonDisabled: "form__button_disabled",
};

function showInputError(input, errorMessage, form) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove(formClasses.input);
  input.classList.add(formClasses.inputError);
  error.textContent = errorMessage;
  error.classList.add(formClasses.massageError);
}
function hideInputError(input, form) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove(formClasses.inputError);
  input.classList.add(formClasses.input);
  error.textContent = "";
  error.classList.remove(formClasses.massageError);
}
function checkInputValidity(input, form) {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage, form);
  } else {
    hideInputError(input, form);
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
      checkInputValidity(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
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

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: ".form__button_disabled",
  inputErrorClass: ".form__input-error",
  errorMessageCorrect: ".form__massage-correct",
  errorMessage: ".form__massage-error",
});

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(formClasses.buttonDisabled);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(formClasses.buttonDisabled);
  }
};
