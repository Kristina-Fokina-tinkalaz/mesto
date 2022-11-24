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

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".form__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(
    document.querySelectorAll(formClasses.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.attr = "disabled";
    buttonElement.classList.add(formClasses.buttonDisabled);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(formClasses.buttonDisabled);
  }
};
