import "./index.css";
import { Card } from "./components/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { initialCards } from "./scripts/initialCards.js";
import { Section } from "./components/Section.js";
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
} from "./utils/constants.js";
import { Popup } from "./components/Popup.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
export {
  openNewPopup,
  newValidFormAdd,
  newValidFormEdit,
  closeNewPopup,
  generateNewCard,
};

function openNewPopup(popup) {
  const newPopup = new Popup(popup);
  newPopup.open();
  newPopup.setEventListeners();
}
function closeNewPopup(popup) {
  const newPopup = new Popup(popup);
  newPopup.close();
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
  const newCard = new Card(form_link, form_name, ".cards", () => {
    const cardImage = newCard.createCard().querySelector(".card__image");
    const newPopupWithImage = new PopupWithImage(
      cardImage,
      form_link,
      form_name
    );
    newPopupWithImage.open();
  });
  const cardReturn = newCard.createCard();
  return cardReturn;
}

const newUserInfo = new UserInfo({
  name: profileName,
  info: profileDescription,
});

profileEditButton.addEventListener("click", () => {
  openNewPopup(popupEdit);
  nameInput.value = newUserInfo.getUserInfo().name.textContent;
  jobInput.value = newUserInfo.getUserInfo().info.textContent;
  newValidFormEdit.hideFormErrors();
});
formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  newUserInfo.setUserInfo({
    name: nameInput.value,
    info: jobInput.value,
  });
  closeNewPopup(popupEdit);
});

mestoButtonAdd.addEventListener("click", () => {
  const NewPopupWithForm = new PopupWithForm(popupAdd, (cardReturn) => {
    cardTemplateElement.prepend(cardReturn);
  });
  NewPopupWithForm.open();
  NewPopupWithForm.setEventListeners();
});

newValidFormAdd.enableValidation();

newValidFormEdit.enableValidation();
