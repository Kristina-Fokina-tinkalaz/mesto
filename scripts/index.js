const popupEdit = document.querySelector("#popup__edit");
const popupAdd = document.querySelector("#popup__add");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDiscription = profile.querySelector(".profile__discription");
const profileEditbutton = profile.querySelector(".profile__editbutton");

const formEdit = document.forms.form;
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;
const buttonEdit = formEdit.elements.button;

const formAdd = document.forms.addCart;
const nameInputAdd = formAdd.elements.nameAdd;
const linkInput = formAdd.elements.link;
const buttonAdd = formAdd.elements.button;

const iconsClose = document.querySelectorAll(".close-icon");
const elements = document.querySelector(".elements");
const elementsContent = document.querySelector(".elements").content;
const mestoButtonAdd = profile.querySelector(".profile__button");
const popupImg = document.querySelector("#popup__galery");
const elementButtons = elements.querySelectorAll(".element__image");


function createCard(name, link){
  const element = elementsContent.querySelector(".element").cloneNode(true);
  const heart = element.querySelector(".element__heart");
  const buttonsTrash = element.querySelector(".element__trash");
  const elementButton = element.querySelector(".element__image");

  
  element.querySelector(".element__image").src = link;
  element.querySelector(".element__image").alt = name;
  element.querySelector(".element__text").textContent = name;

  heart.addEventListener("click", changeHeart);
  buttonsTrash.addEventListener("click", deleteCard);
  elementButton.addEventListener("click", openPopupImg);
  return element;
}


initialCards.forEach(function( item ) {
  const cardReturn = createCard(item.name, item.link);
  elements.append(cardReturn);
});

function openPopup(popup){
  popup.classList.add("popup__opened");
}
function openPopupEdit() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDiscription.textContent;
    hideInputError (nameInput, formEdit) ;
    hideInputError (jobInput, formEdit) ;
}
function openPopupAdd(){
    openPopup(popupAdd);
    formAdd.reset();
    hideInputError (nameInputAdd, formAdd) ;
    hideInputError (linkInput, formAdd) ;
}

function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup__opened");
}

function openPopupImg(evt) {
  const imgGalery = document.querySelector('.popup__img');
  const text = document.querySelector(".popup__text");
  openPopup(popupImg);
  imgGalery.src =  evt.target.src ;
  imgGalery.alt = evt.target.alt;
  text.textContent = evt.target.alt;;
}

function handleSubmitForm(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDiscription.textContent = jobInput.value;
    popupEdit.classList.remove("popup__opened");
}


function renderCard(evt) {
  evt.preventDefault();
  elements.prepend(createCard(formAdd.name.value, formAdd.link.value));
  closePopup(evt);
}

function changeHeart(heart) {
  heart.target.classList.toggle("element__heart_change");
}

function deleteCard(evt){
  evt.target.closest(".element").remove();
}

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
function isValidInput(input, form){                                   /*проверяем валидность input и выводим ошибку*/ 
  if (!input.validity.valid ){
    showInputError(input, input.validationMessage, form);
  }
  else {
    hideInputError(input, form);
  }
}
function isValidInputs(inputFirst, inputSecond, button){                /*проверяем валидность формы и блокируем кнопку*/ 
  if (inputFirst.validity.valid && inputSecond.validity.valid) {
    button.removeAttribute('disabled');
    button.classList.remove('form__button_disabled');
  }
  else {
    button.setAttribute('disabled', true);
    button.classList.add('form__button_disabled');
  }
}


nameInput.addEventListener('input', function(evt){            /*при изменении input появляется/исчезает ошибка под Input*/ 
  evt.preventDefault();
  isValidInput(nameInput, formEdit);
})
jobInput.addEventListener('input', function(evt){
  evt.preventDefault();
  isValidInput(jobInput, formEdit);
})
nameInputAdd.addEventListener('input', function(evt){
  evt.preventDefault();
  isValidInput(nameInputAdd, formAdd);
})
linkInput.addEventListener('input',function(evt){
  evt.preventDefault();
  isValidInput(linkInput, formAdd);
})

formEdit.addEventListener('input', function(evt){     /*при изменении input-ов блокируется/активируется кнопка*/ 
  evt.preventDefault();
  isValidInputs(nameInput, jobInput, buttonEdit);
})
formAdd.addEventListener('input', function(evt){
  evt.preventDefault();
  isValidInputs(nameInputAdd, linkInput, buttonAdd);
})


profileEditbutton.addEventListener("click", openPopupEdit);

iconsClose.forEach(function(item){
  item.addEventListener("click", closePopup)
});


formEdit.addEventListener("submit", handleSubmitForm);
formAdd.addEventListener("submit", renderCard);
mestoButtonAdd.addEventListener("click", openPopupAdd);

elementButtons.forEach(function(item){
  item.addEventListener("click", openPopupImg)
});



