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
  profileAvatar,
  buttonsTrash,
  popupRemove,
} from "./utils/constants.js";

import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithOneQuestion } from "./components/PopupWithOneQuestion.js";
export { newValidFormAdd, newValidFormEdit, generateNewCard };
import { Api } from "./components/Api.js";

export { api };

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-57",
  headers: {
    authorization: "7cacf04c-d1ed-448d-9334-771e83ca7b52",
    "Content-Type": "application/json",
  },
});

api.getUserData();

const itemsApi = api.getInitialCards();

const newPopupWithImage = new PopupWithImage(popupImg);

function generateNewCard(form_link, form_name, cardId, userId) {
  const newCard = new Card(
    form_link,
    form_name,
    cardId,
    ".cards",
    () => {
      newPopupWithImage.open(form_name, form_link);
    },
    () => {
      const newPopupRemoveCard = new PopupWithOneQuestion(popupRemove, () => {
        api.removeCard(cardId).then(() => {
          newCard.deleteCard();
        });
      });
      newPopupRemoveCard.open();
      newPopupRemoveCard.setEventListeners();
    }
  );

  const cardReturn = newCard.createCard();
  userApi.then((data) => {
    if (userId != data._id) {
      const trashButton = cardReturn.querySelector(".card__trash");
      trashButton.remove();
    }
  });

  return cardReturn;
}
const userApi = api.getUserData();
userApi.then((data) => {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.src = data.avatar;
});

itemsApi.then((data) => {
  const newSections = new Section(
    {
      items: data.map((item) => {
        return {
          name: item.name,
          link: item.link,
          id: item._id,
          user: item.owner._id,
        };
      }),
      renderer: (item) => {
        const cardReturn = generateNewCard(
          item.link,
          item.name,
          item.id,
          item.user
        );
        newSections.addItems(cardReturn);
      },
    },
    cardTemplateElement
  );
  newSections.renderItems();
});

const newValidFormAdd = new FormValidator(validationData, formAdd);
const newValidFormEdit = new FormValidator(validationData, formEdit);

const newUserInfo = new UserInfo({
  name: profileName,
  info: profileDescription,
});

const newPopupWithEditForm = new PopupWithForm(popupEdit, ({ name, info }) => {
  newUserInfo.setUserInfo({ name: nameInput.value, info: jobInput.value });
  api.saveEditData(nameInput.value, jobInput.value);
});

profileEditButton.addEventListener("click", () => {
  const userData = newUserInfo.getUserInfo();
  newPopupWithEditForm.open();
  nameInput.value = userData.name;
  jobInput.value = userData.info;
  newValidFormEdit.hideFormErrors();
  newValidFormEdit.disablButton();
});

const newSection = new Section(
  {
    items: { link: linkAddImg.value, name: nameAddImg.value },
    renderer: () => {
      newSection.renderItems();
    },
  },
  cardTemplateElement
);

const newPopupWithAddForm = new PopupWithForm(popupAdd, ({ nameAdd, link }) => {
  api.addNewCard(nameAdd, link).then((res) => {
    const cardReturn = generateNewCard(
      res.link,
      res.name,
      res._id,
      res.owner._id
    );
    newSection.addItem(cardReturn);
  });
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
