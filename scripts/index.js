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

const cardTemplateElement = document.querySelector(".cards");
const cardTemplateContent = cardTemplateElement.content.querySelector(".card");
const mestoButtonAdd = profile.querySelector(".profile__button");
const popupImg = document.querySelector("#popup__galery");
const imgGallery = document.querySelector(".popup__img");
const imagePopupCaption = document.querySelector(".popup__text");

const overlay = document.querySelector(".overlay");
const iconsClose = document.querySelectorAll(".close-icon");

function createCard(cardData) {
  const cardClone = cardTemplateContent.cloneNode(true);
  const heart = cardClone.querySelector(".card__heart");
  const buttonsTrash = cardClone.querySelector(".card__trash");
  const cardImage = cardClone.querySelector(".card__image");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardClone.querySelector(".card__text").textContent = cardData.name;

  heart.addEventListener("click", changeHeart);
  buttonsTrash.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", openPopupImg);
  return cardClone;
}

initialCards.forEach(function (item) {
  const cardData = { name: item.name, link: item.link };
  const cardReturn = createCard(cardData);
  cardTemplateElement.append(cardReturn);
});

const closePopupClickEsc = (evt) => {
  const popupOpen = document.querySelector(".popup__opened");
  if (popupOpen && evt.key === "Escape") {
    closePopup(popupOpen);
  }
};

function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener("keydown", closePopupClickEsc);
}

function hideFormErrors(form, validationData) {
  const inputs = form.querySelectorAll(validationData.inputSelector);
  inputs.forEach(function (item) {
    hideInputError(item, form, validationData);
  });
}

iconsClose.forEach(function (item) {
  item.addEventListener("click", function () {
    const popupOpen = document.querySelector(".popup__opened");
    closePopup(popupOpen);
  });
});

function openPopupEdit(validationData) {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  hideFormErrors(formEdit, validationData);
}
function openPopupAdd(validationData) {
  openPopup(popupAdd);
  formAdd.reset();
  hideFormErrors(formAdd, validationData);
  buttonAdd.setAttribute("disabled", true);
  buttonAdd.classList.add(validationData.inactiveButtonClass);
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.removeEventListener("keydown", closePopupClickEsc);
}

function openPopupImg(evt) {
  openPopup(popupImg);
  imgGallery.src = evt.target.src;
  imgGallery.alt = evt.target.alt;
  imagePopupCaption.textContent = evt.target.alt;
}

function handleSubmitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: formAdd.nameAdd.value, link: formAdd.link.value };
  cardTemplateElement.prepend(createCard(cardData));
  const popupOpen = document.querySelector(".popup__opened");
  closePopup(popupOpen);
}

function changeHeart(evt) {
  evt.target.classList.toggle("card__heart_change");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

profileEditButton.addEventListener("click", function () {
  openPopupEdit(validationData);
});

formEdit.addEventListener("submit", handleSubmitEditForm);
formAdd.addEventListener("submit", handleCardFormSubmit);
mestoButtonAdd.addEventListener("click", function () {
  openPopupAdd(validationData);
});

const popupCards = Array.from(document.querySelectorAll(".popup"));
function closePopupClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}
popupCards.forEach(function (item) {
  item.addEventListener("click", closePopupClickOverlay);
});
