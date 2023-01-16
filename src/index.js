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
  popupImg,
  nameAddImg,
  linkAddImg,
} from "./utils/constants.js";

import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
export { newValidFormAdd, newValidFormEdit, generateNewCard };

const newPopupWithImage = new PopupWithImage(popupImg);
function generateNewCard(form_link, form_name) {
  const newCard = new Card(form_link, form_name, ".cards", () => {
    newPopupWithImage.open(form_name, form_link);
  });
  const cardReturn = newCard.createCard();
  return cardReturn;
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

const newUserInfo = new UserInfo({
  name: profileName,
  info: profileDescription,
});

const newPopupWithEditForm = new PopupWithForm(popupEdit, ({ name, info }) => {
  newUserInfo.setUserInfo({ name: nameInput.value, info: jobInput.value });
});

profileEditButton.addEventListener("click", () => {
  const userData = newUserInfo.getUserInfo();
  newPopupWithEditForm.open();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  newValidFormEdit.hideFormErrors();
  newValidFormEdit.disablButton();
});

const newPopupWithAddForm = new PopupWithForm(popupAdd, ({ nameAdd, link }) => {
  console.log({ nameAdd });
  const cartReturn = generateNewCard(link, nameAdd);
  cardTemplateElement.prepend(cartReturn);
});

mestoButtonAdd.addEventListener("click", () => {
  newPopupWithAddForm.open();
  formAdd.reset();
  newValidFormAdd.disablButton();
  newValidFormAdd.hideFormErrors();
});

newPopupWithEditForm.setEventListeners();
newValidFormAdd.enableValidation();
newValidFormEdit.enableValidation();
newPopupWithAddForm.setEventListeners();
newPopupWithImage.setEventListeners();
