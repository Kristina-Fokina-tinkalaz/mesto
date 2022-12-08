import { card } from "./cards.js";
import { formValidator } from "./FormValidator.js";
export { openPopup };

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
const buttonAdd = formAdd.elements.button;

const mestoButtonAdd = profile.querySelector(".profile__button");
const popupCards = Array.from(document.querySelectorAll(".popup"));
const iconsClose = document.querySelectorAll(".close-icon");
const cardTemplateElement = document.querySelector(".cards");

const newValidFormAdd = new formValidator(validationData, formAdd);
const newValidFormEdit = new formValidator(validationData, formEdit);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
  buttonAdd.setAttribute("disabled", true);
  buttonAdd.classList.add("form__button_disabled");
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
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = new card(
    formAdd.link.value,
    formAdd.nameAdd.value,
    ".cards"
  );
  const cardReturn = cardData.createCard();
  cardTemplateElement.prepend(cardReturn);
  const popupOpen = document.querySelector(".popup__opened");
  closePopup(popupOpen);
}
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
  const popupOpen = document.querySelector(".popup__opened");
  if (popupOpen && evt.key === "Escape") {
    closePopup(popupOpen);
  }
};
iconsClose.forEach(function (item) {
  item.addEventListener("click", () => {
    const popupOpen = document.querySelector(".popup__opened");
    closePopup(popupOpen);
  });
});

newValidFormAdd.enableValidation();

newValidFormEdit.enableValidation();

initialCards.forEach(function (item) {
  const newCard = new card(item.link, item.name, ".cards");
  const cardReturn = newCard.createCard();
  cardTemplateElement.append(cardReturn);
});
