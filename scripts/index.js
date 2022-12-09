import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";
export { openPopup, popupImg, imgGallery, imagePopupCaption };

const validationData = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  formInputErrorSelector: ".form__input-error",
  inputClass: "form__input",
  inputErrorClass: "form__input-error",
  inactiveButtonClass: "form__button_disabled",
  errorMessageClass: "form__massage-error",
};

const popupEdit = document.querySelector("#popup__edit");
const popupAdd = document.querySelector("#popup__add");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__editbutton");

const formEdit = document.forms.form;
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

const formAdd = document.forms.addCart;

const popupOpen = document.querySelector(".popup__opened");
const mestoButtonAdd = profile.querySelector(".profile__button");
const popupCards = Array.from(document.querySelectorAll(".popup"));
const iconsClose = document.querySelectorAll(".close-icon");
const cardTemplateElement = document.querySelector(".cards");
const popupImg = document.querySelector("#popup__galery");
const imgGallery = document.querySelector(".popup__img");
const imagePopupCaption = document.querySelector(".popup__text");

const newValidFormAdd = new FormValidator(validationData, formAdd);
const newValidFormEdit = new FormValidator(validationData, formEdit);

function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener("keydown", closePopupClickEsc);
}

function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  newValidFormEdit.hideFormErrors();
}
function openPopupAdd() {
  openPopup(popupAdd);
  formAdd.reset();
  newValidFormAdd.disablButton();
  newValidFormAdd.hideFormErrors();
}
function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.removeEventListener("keydown", closePopupClickEsc);
}
function handleSubmitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

function generateNewCard(form_link, form_name) {
  const newCard = new Card(form_link, form_name, ".cards");
  const cardReturn = newCard.createCard();
  return cardReturn;
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardReturn = generateNewCard(formAdd.link.value, formAdd.nameAdd.value);
  cardTemplateElement.prepend(cardReturn);
  const popupOpen = document.querySelector(".popup__opened"); //если вынести за функцию, он не видит эту константу
  closePopup(popupOpen);
}
initialCards.forEach(function (item) {
  const cardReturn = generateNewCard(item.link, item.name);
  cardTemplateElement.append(cardReturn);
});

profileEditButton.addEventListener("click", function () {
  openPopupEdit();
});
formEdit.addEventListener("submit", handleSubmitEditForm);
formAdd.addEventListener("submit", handleCardFormSubmit);
mestoButtonAdd.addEventListener("click", function () {
  openPopupAdd();
});

function closePopupClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}
popupCards.forEach(function (item) {
  item.addEventListener("click", closePopupClickOverlay);
});
const closePopupClickEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup__opened"); //если вынести за функцию, он не видит эту константу
    closePopup(popupOpen);
  }
};
iconsClose.forEach(function (item) {
  item.addEventListener("click", () => {
    const popupOpen = document.querySelector(".popup__opened"); //если вынести за функцию, он не видит эту константу
    closePopup(popupOpen);
  });
});

newValidFormAdd.enableValidation();

newValidFormEdit.enableValidation();
