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
const nameInputAdd = formAdd.elements.nameAdd;
const linkInput = formAdd.elements.link;
const buttonAdd = formAdd.elements.button;

const iconsClose = document.querySelectorAll(".close-icon");
const cards = document.querySelector(".cards");
const cardsContent = document.querySelector(".cards").content;
const card = cardsContent.querySelector(".card");
const mestoButtonAdd = profile.querySelector(".profile__button");
const popupImg = document.querySelector("#popup__galery");
const cardButtons = cards.querySelectorAll(".card__image");
const imgGalery = document.querySelector(".popup__img");
const text = document.querySelector(".popup__text");

const overlay = document.querySelector(".overlay");

function createCard(cardData) {
  const cardClone = card.cloneNode(true);
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
  cards.append(cardReturn);
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
  const iconsClose = popup.querySelector(".close-icon");
  iconsClose.addEventListener("click", function () {
    closePopup(popup);
  });
}
function hideFormErrors(form) {
  const inputs = form.querySelectorAll(".form__input");
  inputs.forEach(function (item) {
    hideInputError(item, form);
  });
}
function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  hideFormErrors(formEdit);
}
function openPopupAdd() {
  openPopup(popupAdd);
  formAdd.reset();
  hideFormErrors(formAdd);
  buttonAdd.setAttribute("disabled", true);
  buttonAdd.classList.add("form__button_disabled");
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.removeEventListener("keydown", closePopupClickEsc);
  const iconsClose = popup.querySelector(".close-icon");
  iconsClose.removeEventListener("click", function () {
    closePopup(popup);
  });
}

function openPopupImg(evt) {
  openPopup(popupImg);
  imgGalery.src = evt.target.src;
  imgGalery.alt = evt.target.alt;
  text.textContent = evt.target.alt;
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
  cards.prepend(createCard(cardData));
  const popupOpen = document.querySelector(".popup__opened");
  closePopup(popupOpen);
}

function changeHeart(evt) {
  evt.target.classList.toggle("card__heart_change");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

profileEditButton.addEventListener("click", openPopupEdit);

formEdit.addEventListener("submit", handleSubmitEditForm);
formAdd.addEventListener("submit", handleCardFormSubmit);
mestoButtonAdd.addEventListener("click", openPopupAdd);

const popupCards = Array.from(document.querySelectorAll(".popup"));
function closePopupClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpen = document.querySelector(".popup__opened");
    closePopup(popupOpen);
  }
}
popupCards.forEach(function (item) {
  item.addEventListener("click", closePopupClickOverlay);
});
