import { Card } from "../components/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { initialCards } from "../scripts/initialCards.js";
import { Section } from "../components/Section.js";
import {
  popupEdit,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  popupAdd,
  formAdd,
  cardTemplateElement,
  validationData,
  formEdit,
  profileEditButton,
  mestoButtonAdd,
} from "../utils/constants.js";
import { Popup } from "../components/Popup.js";
export { openNewPopup };
// function openPopup(popup) {
//   popup.classList.add("popup__opened");
//   document.addEventListener("keydown", closePopupClickEsc);
// }
function openNewPopup(popup) {
  const newPopup = new Popup(popup);
  newPopup.open();
  newPopup.setEventListeners();
}
function closeNewPopup(popup) {
  const newPopup = new Popup(popup);
  newPopup.close();
}
function openPopupEdit() {
  openNewPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  newValidFormEdit.hideFormErrors();
}
function openPopupAdd() {
  openNewPopup(popupAdd);
  formAdd.reset();
  newValidFormAdd.disablButton();
  newValidFormAdd.hideFormErrors();
}
// function closePopup(popup) {
//   popup.classList.remove("popup__opened");
//   document.removeEventListener("keydown", closePopupClickEsc);
// }
function handleSubmitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeNewPopup(popupEdit);
}

const newSections = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardReturn = generateNewCard(item.link, item.name);
      newSections.addItems(cardReturn);
    },
  },
  cardTemplateElement
);

newSections.renderItems();

const newValidFormAdd = new FormValidator(validationData, formAdd);
const newValidFormEdit = new FormValidator(validationData, formEdit);

function generateNewCard(form_link, form_name) {
  const newCard = new Card(form_link, form_name, ".cards");
  const cardReturn = newCard.createCard();
  return cardReturn;
}

// initialCards.forEach(function (item) {
//   const cardReturn = generateNewCard(item.link, item.name);
//   cardTemplateElement.append(cardReturn);
// });

profileEditButton.addEventListener("click", function () {
  openPopupEdit();
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardReturn = generateNewCard(formAdd.link.value, formAdd.nameAdd.value);
  cardTemplateElement.prepend(cardReturn);
  closeNewPopup(popupAdd);
}

formEdit.addEventListener("submit", handleSubmitEditForm);
formAdd.addEventListener("submit", handleCardFormSubmit);
mestoButtonAdd.addEventListener("click", function () {
  openPopupAdd();
});

// function closePopupClickOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.target);
//   }
// }
// popupCards.forEach(function (item) {
//   item.addEventListener("click", closePopupClickOverlay);
// });
// const closePopupClickEsc = (evt) => {
//   if (evt.key === "Escape") {
//     const popupOpen = document.querySelector(".popup__opened");
//     closePopup(popupOpen);
//   }
// };

newValidFormAdd.enableValidation();

newValidFormEdit.enableValidation();
