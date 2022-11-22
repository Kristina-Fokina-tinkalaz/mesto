const popupEdit = document.querySelector("#popup__edit");
const popupAdd = document.querySelector("#popup__add");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDiscription = profile.querySelector(".profile__discription");
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
const mestoButtonAdd = profile.querySelector(".profile__button");
const popupImg = document.querySelector("#popup__galery");
const cardButtons = cards.querySelectorAll(".card__image");

const overlay = document.querySelector(".overlay");

function createCard(name, link) {
  const card = cardsContent.querySelector(".card").cloneNode(true);
  const heart = card.querySelector(".card__heart");
  const buttonsTrash = card.querySelector(".card__trash");
  const cardButton = card.querySelector(".card__image");

  card.querySelector(".card__image").src = link;
  card.querySelector(".card__image").alt = name;
  card.querySelector(".card__text").textContent = name;

  heart.addEventListener("click", changeHeart);
  buttonsTrash.addEventListener("click", deleteCard);
  cardButton.addEventListener("click", openPopupImg);
  return card;
}

initialCards.forEach(function (item) {
  const cardReturn = createCard(item.name, item.link);
  cards.append(cardReturn);
});

const closePopupClickEsc = (evt) => {
  const popupOpen = document.querySelector(".popup__opened");
  if (popupOpen && evt.key === "Escape") {
    popupOpen.classList.remove("popup__opened");
  }
};

function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener("keydown", closePopupClickEsc);
}
function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDiscription.textContent;
  hideInputError(nameInput, formEdit);
  hideInputError(jobInput, formEdit);
}
function openPopupAdd() {
  openPopup(popupAdd);
  formAdd.reset();
  hideInputError(nameInputAdd, formAdd);
  hideInputError(linkInput, formAdd);
  buttonAdd.setAttribute("disabled", true);
  buttonAdd.classList.add("form__button_disabled");
}

function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup__opened");
  document.removeEventListener("keydown", closePopupClickEsc);
}

function openPopupImg(evt) {
  const imgGalery = document.querySelector(".popup__img");
  const text = document.querySelector(".popup__text");
  openPopup(popupImg);
  imgGalery.src = evt.target.src;
  imgGalery.alt = evt.target.alt;
  text.textContent = evt.target.alt;
}

function handleSubmitForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = jobInput.value;
  popupEdit.classList.remove("popup__opened");
}

function renderCard(evt) {
  evt.preventDefault();
  cards.prepend(createCard(formAdd.nameAdd.value, formAdd.link.value));
  closePopup(evt);
}

function changeHeart(heart) {
  heart.target.classList.toggle("card__heart_change");
}

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

profileEditButton.addEventListener("click", openPopupEdit);

iconsClose.forEach(function (item) {
  item.addEventListener("click", closePopup);
});

formEdit.addEventListener("submit", handleSubmitForm);
formAdd.addEventListener("submit", renderCard);
mestoButtonAdd.addEventListener("click", openPopupAdd);

const popupCard = Array.from(document.querySelectorAll(".popup"));
function closePopupClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt);
  }
}
popupCard.forEach(function (item) {
  item.addEventListener("click", closePopupClickOverlay);
});
