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
const closeIcons = document.querySelectorAll(".close-icon");
const elements = document.querySelector(".elements");
const elementsContent = document.querySelector(".elements").content;
const addMestobutton = profile.querySelector(".profile__button");
const popupImg = document.querySelector("#popup__galery");
const elementButtons = elements.querySelectorAll(".element__image");



const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

initialCards.forEach(function(item) {
    const element = elementsContent.querySelector(".element").cloneNode(true);
    element.querySelector(".element__image").src = item.link;
    element.querySelector(".element__image").alt = item.name;
    element.querySelector(".element__text").textContent = item.name;
    elements.append(element);
});

function openPopup() {
    popupEdit.classList.add("popup__opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDiscription.textContent;
}
function openPopupAdd(){
    popupAdd.classList.add("popup__opened");
    linkInput.value = '';
    nameInputAdd.value = '';
}

function closePopup() {
    popupEdit.classList.remove("popup__opened");
    popupAdd.classList.remove("popup__opened");
    popupImg.classList.remove("popup__opened");
}


function openPopupImg(evt) {
  const imgGalery = document.querySelector('.popup__img');
  const text = document.querySelector(".popup__text");
  popupImg.classList.add("popup__opened");
  console.log(evt.target);
  imgGalery.src =  evt.target.src ;
  imgGalery.alt = evt.target.alt;
  text.textContent = evt.target.alt;;
  find();
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    console.log('text');
    profileDiscription.textContent = jobInput.value;
    closePopup();
}
function addNewCart(evt) {
  evt.preventDefault(); 
  const element = elementsContent.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = linkInput.value;
  element.querySelector(".element__image").alt = nameInputAdd.value;
  element.querySelector(".element__text").textContent = nameInputAdd.value;
  elements.prepend(element);
  closePopup();
  find();
}


function ChangeHeart(heart) {
  heart.target.classList.toggle("element__heart_change");
}


function trash(evt){
  evt.target.parentNode.remove();
  find();
}

function find(){
  const hearts = document.querySelectorAll(".element__heart");
  const trashButtons = elements.querySelectorAll(".element__trash");
  const elementButtons = elements.querySelectorAll(".element__image");
  hearts.forEach(function(heart){
    heart.addEventListener("click", ChangeHeart)
  });
  trashButtons.forEach(function(button){
    button.addEventListener("click", trash)
  });
  elementButtons.forEach(function(item){
    item.addEventListener("click", openPopupImg)
  });
}


profileEditbutton.addEventListener("click", openPopup);

closeIcons.forEach(function(item){
  item.addEventListener("click", closePopup)
});

formElement.addEventListener("submit", formSubmitHandler);
formAdd.addEventListener("submit", addNewCart);
addMestobutton.addEventListener("click", openPopupAdd);

elementButtons.forEach(function(item){
  item.addEventListener("click", openPopupImg)
});

find();

