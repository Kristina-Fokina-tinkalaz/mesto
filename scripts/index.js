const popupEdit = document.querySelector("#popup__edit");
const popupAdd = document.querySelector("#popup__add");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDiscription = profile.querySelector(".profile__discription");
const profileEditbutton = profile.querySelector(".profile__editbutton");
const formElement = document.querySelector("#form_edit");
const formAdd = document.querySelector("#form_add");
const nameInput = formElement.querySelector("#name");
const nameInputAdd = formAdd.querySelector("#name_add");
const jobInput = formElement.querySelector("#description");
const linkInput = formAdd.querySelector("#link");
const iconsClose = document.querySelectorAll(".close-icon");
const elements = document.querySelector(".elements");
const elementsContent = document.querySelector(".elements").content;
const mestoButtonAdd = profile.querySelector(".profile__button");
const popupImg = document.querySelector("#popup__galery");
const elementButtons = elements.querySelectorAll(".element__image");




function createCard(name, link){
  const element = elementsContent.querySelector(".element").cloneNode(true);
  const heart = element.querySelector(".element__heart");
  const buttonsTrash = element.querySelector(".element__trash");
  const elementButton = element.querySelector(".element__image");

  
  element.querySelector(".element__image").src = link;
  element.querySelector(".element__image").alt = name;
  element.querySelector(".element__text").textContent = name;

  heart.addEventListener("click", changeHeart);
  buttonsTrash.addEventListener("click", deleteCard);
  elementButton.addEventListener("click", openPopupImg);
  return element;
}


initialCards.forEach(function( item ) {
  const cardReturn = createCard(item.name, item.link);
  elements.append(cardReturn);
});

function openPopup(popup){
  popup.classList.add("popup__opened");
}
function openPopupEdit() {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    jobInput.value = profileDiscription.textContent;
}
function openPopupAdd(){
    openPopup(popupAdd);
    linkInput.value = '';
    nameInputAdd.value = '';
}

function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup__opened");
}

function openPopupImg(evt) {
  const imgGalery = document.querySelector('.popup__img');
  const text = document.querySelector(".popup__text");
  openPopup(popupImg);
  imgGalery.src =  evt.target.src ;
  imgGalery.alt = evt.target.alt;
  text.textContent = evt.target.alt;;
}

function handleSubmitForm(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDiscription.textContent = jobInput.value;
    popupEdit.classList.remove("popup__opened");
}
function renderCard(evt) {
  evt.preventDefault();
  elements.prepend(createCard(formAdd.name.value, formAdd.link.value));
  closePopup(evt);
}

function changeHeart(heart) {
  heart.target.classList.toggle("element__heart_change");
}

function deleteCard(evt){
  evt.target.closest(".element").remove();
}

profileEditbutton.addEventListener("click", openPopupEdit);

iconsClose.forEach(function(item){
  item.addEventListener("click", closePopup)
});

formElement.addEventListener("submit", handleSubmitForm);
formAdd.addEventListener("submit", renderCard);
mestoButtonAdd.addEventListener("click", openPopupAdd);

elementButtons.forEach(function(item){
  item.addEventListener("click", openPopupImg)
});