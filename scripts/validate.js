const formData = {
  formSelector: "form",
  input: "form__input",
  inputError: "form__input-error",
  massageError: "massage-error",
  buttonDisabled: "form__button_disabled",
};

function showInputError(input, errorMessage, form) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove(formData.input);
  input.classList.add(formData.inputError);
  error.textContent = errorMessage;
  error.classList.add(formData.massageError);
}
function hideInputError(input, form) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove(formData.inputError);
  input.classList.add(formData.input);
  error.textContent = "";
  error.classList.remove(formData.massageError);
}
function isValid(input, form) {
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
      isValid(inputElement, formElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(formData.formSelector));
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
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(formData.buttonDisabled);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(formData.buttonDisabled);
  }
};
