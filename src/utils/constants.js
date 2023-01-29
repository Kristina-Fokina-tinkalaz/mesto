export {
  validationData,
  popupEdit,
  popupAdd,
  profile,
  profileName,
  profileDescription,
  profileEditButton,
  formEdit,
  nameInput,
  jobInput,
  formAdd,
  popupOpen,
  mestoButtonAdd,
  popupCards,
  iconsClose,
  cardTemplateElement,
  popupImg,
  imgGallery,
  imagePopupCaption,
  nameAddImg,
  linkAddImg,
  profileAvatar,
  popupRemove,
  profileAvatarEdit,
  popupEditAvatarForm,
  formEditAvatar,
};
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
const profileAvatar = profile.querySelector(".profile__avatar");
const profileAvatarEdit = profile.querySelector(".profile__avatar-edit");

const formEdit = document.forms.form;
const nameInput = formEdit.elements.name;
const jobInput = formEdit.elements.description;

const formAdd = document.forms.addCart;
const nameAddImg = formAdd.elements.nameAdd;
const linkAddImg = formAdd.elements.link;

const popupRemove = document.querySelector("#popupRemove");
const popupEditAvatarForm = document.querySelector("#popupEditAvatarForm");
const formEditAvatar = document.forms.editAvatarForm;

const popupOpen = document.querySelector(".popup__opened");
const mestoButtonAdd = profile.querySelector(".profile__button");
const popupCards = Array.from(document.querySelectorAll(".popup"));
const iconsClose = document.querySelectorAll(".close-icon");
const cardTemplateElement = document.querySelector(".cards");
const popupImg = document.querySelector("#popup__galery");
const imgGallery = document.querySelector(".popup__img");
const imagePopupCaption = document.querySelector(".popup__text");
