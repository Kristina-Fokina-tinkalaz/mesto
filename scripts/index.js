
const popup = document.querySelector(".popup");
const profile = document.querySelector(".profile");
const profile__name = profile.querySelector(".profile__name");
const profile__discription = profile.querySelector(".profile__discription");
const profile__editbutton = profile.querySelector(".profile__editbutton");
const formElement = document.querySelector(".edit-form");
const nameInput = formElement.querySelector("#name");
const jobInput = formElement.querySelector("#description");
const closeIcon = document.querySelector(".close-icon");

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = profile__name.textContent;
    jobInput.value = profile__discription.textContent;
}

function closePopup() {
    // profile__name.textContent = profile__name.textContent;
    // profile__discription.textContent = profile__discription.textContent;
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profile__name.textContent = nameInput.value;
    console.log('text');
    profile__discription.textContent = jobInput.value;
    closePopup();
}

profile__editbutton.addEventListener("click", openPopup);
closeIcon.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
