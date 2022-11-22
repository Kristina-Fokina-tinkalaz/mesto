function showInputError(input, errorMessage, form) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove("form__input");
  input.classList.add("form__input-error");
  error.textContent = errorMessage;
  error.classList.add("form__massage-error");
}
function hideInputError(input, form) {
  const error = form.querySelector(`#${input.name}-error`);
  input.classList.remove("form__input-error");
  input.classList.add("form__input");
  error.textContent = "";
  error.classList.remove("form__massage-error");
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

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: ".form__button_disable",
  inputErrorClass: ".form__input-correct",
  errorClass: "/form__massage-error",
});

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add("form__button_disabled");
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove("form__button_disabled");
  }
};
