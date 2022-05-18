
const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDiscription = profile.querySelector(".profile__discription");
const profileEditbutton = profile.querySelector(".profile__editbutton");
const formElement = document.querySelector(".edit-form");
const nameInput = formElement.querySelector("#name");
const jobInput = formElement.querySelector("#description");
const closeIcon = document.querySelector(".close-icon");

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    jobInput.value = profileDiscription.textContent;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    console.log('text');
    profileDiscription.textContent = jobInput.value;
    closePopup();
}

profileEditbutton.addEventListener("click", openPopup);
closeIcon.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
