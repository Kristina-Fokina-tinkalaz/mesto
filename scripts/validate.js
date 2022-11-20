function showInputError (input, errorMessage, form) {       
    const error = form.querySelector(`#${input.name}-error`);
    input.classList.remove('form__input');
    input.classList.add('form__input-error');
    error.textContent = errorMessage;
    error.classList.add('form__massage-error');
  }
  function hideInputError (input, form) {
    const error = form.querySelector(`#${input.name}-error`);
    input.classList.remove('form__input-error');
    input.classList.add('form__input');
    error.textContent = '';
    error.classList.remove('form__massage-error');
  }
  function isValid(input, form){                                 
    if (!input.validity.valid ){
      showInputError(input, input.validationMessage, form);
    }
    else {
      hideInputError(input, form);
    }
  }
  function isValidInputs(formElement, button){                
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        if (!inputElement.validity.valid) {
          button.setAttribute('disabled', true);
          button.classList.add('form__button_disabled');
        }
        else {
          button.removeAttribute('disabled');
          button.classList.remove('form__button_disabled');
        }
      })
    })
  }
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__button');
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(inputElement, formElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  enableValidation();
  
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add('form__button_disabled');
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove('form__button_disabled');
    }
  };