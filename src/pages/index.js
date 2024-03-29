import "./index.css";
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
  popupImg,
  nameAddImg,
  linkAddImg,
  profileAvatar,
  popupRemove,
  profileAvatarEdit,
  popupEditAvatarForm,
  formEditAvatar,
} from "../utils/constants.js";

import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupConfirmation } from "../components/PopupConfirmation.js";
export { newValidFormAdd, newValidFormEdit, generateNewCard };
import { Api } from "../components/Api.js";

export { api };

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-57",
  headers: {
    authorization: "7cacf04c-d1ed-448d-9334-771e83ca7b52",
    "Content-Type": "application/json",
  },
});

const newPopupWithImage = new PopupWithImage(popupImg);

function generateNewCard(
  form_link,
  form_name,
  cardId,
  userId,
  arrayLikes,
  UserIdMe
) {
  const popupWithConfirmation = new PopupConfirmation(popupRemove, () => {
    api
      .removeCard(cardId)
      .then(() => {
        newCard.deleteCard();
        popupWithConfirmation.close();
      })
      .catch((err) => console.log(err));
  });

  const newCard = new Card(
    form_link,
    form_name,
    cardId,
    arrayLikes,
    userId,
    ".cards",
    () => {
      newPopupWithImage.open(form_name, form_link);
    },
    () => {
      popupWithConfirmation.open();
      popupWithConfirmation.setEventListeners();
    },
    (evt) => {
      if (evt.target.classList.contains("card__heart_change")) {
        api
          .deleteLike(cardId)
          .then((data) => {
            newCard.deleteLike(data);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .addLike(cardId)
          .then((data) => {
            newCard.addLike(data);
          })
          .catch((err) => console.log(err));
      }
    },
    () => {
      if (arrayLikes.some((item) => item._id === UserIdMe)) {
        newCard.activeLike();
      } else {
        newCard.noLike();
      }
    }
  );

  const cardReturn = newCard.createCard();
  newCard.removeTrash(UserIdMe);

  return cardReturn;
}
// api
//   .getUserData()
//   .then((data) => {
//     profileName.textContent = data.name;
//     profileDescription.textContent = data.about;
//     profileAvatar.src = data.avatar;
//     profileName.id = data._id;
//   })
//   .catch((err) => console.log(err));

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([dataUser, dataCards]) => {
    const sectionInitialCards = new Section(
      {
        items: dataCards.map((item) => {
          return {
            name: item.name,
            link: item.link,
            id: item._id,
            user: item.owner._id,
            likes: item.likes,
          };
        }),
        renderer: (item) => {
          const cardReturn = generateNewCard(
            item.link,
            item.name,
            item.id,
            item.user,
            item.likes,
            dataUser._id
          );
          profileName.textContent = dataUser.name;
          profileDescription.textContent = dataUser.about;
          profileAvatar.src = dataUser.avatar;
          profileName.id = dataUser._id;

          sectionInitialCards.appendItem(cardReturn);
        },
      },
      cardTemplateElement
    );

    sectionInitialCards.renderItems();
  })
  .catch((err) => console.log(err));

const newValidFormAdd = new FormValidator(validationData, formAdd);
const newValidFormEdit = new FormValidator(validationData, formEdit);
const newValidFormEditAvatar = new FormValidator(
  validationData,
  formEditAvatar
);

const newUserInfo = new UserInfo({
  name: profileName,
  info: profileDescription,
});

const newPopupWithEditForm = new PopupWithForm(popupEdit, ({ name, info }) => {
  newPopupWithEditForm.renderLoading(true);
  api
    .saveEditData(nameInput.value, jobInput.value)
    .then((res) => {
      newUserInfo.setUserInfo({ name: nameInput.value, info: jobInput.value });

      newPopupWithEditForm.close();
      return res.json();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newPopupWithEditForm.renderLoading(false);
    });
});

const newPopupWithEditAvatar = new PopupWithForm(
  popupEditAvatarForm,
  ({ link_avatar }) => {
    newPopupWithEditAvatar.renderLoading(true);
    api
      .changeAvatar(link_avatar)
      .then((res) => {
        profileAvatar.src = res.avatar;
        newPopupWithEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        newPopupWithEditAvatar.renderLoading(false);
      });
  }
);
profileAvatarEdit.addEventListener("click", () => {
  formEditAvatar.reset();

  newPopupWithEditAvatar.open();

  newValidFormEditAvatar.hideFormErrors();
  newValidFormEditAvatar.disablButton();
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
  newPopupWithAddForm.renderLoading(true);

  api
    .addNewCard(nameAdd, link)
    .then((dataCard) => {
      const cardReturn = generateNewCard(
        dataCard.link,
        dataCard.name,
        dataCard._id,
        dataCard.owner._id,
        dataCard.likes,
        profileName.id
      );

      newSection.addItem(cardReturn);
      newPopupWithAddForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newPopupWithAddForm.renderLoading(false);
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
newPopupWithEditAvatar.setEventListeners();
newValidFormEditAvatar.enableValidation();
