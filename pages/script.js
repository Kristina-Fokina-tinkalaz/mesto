let profile__editbutton = document.querySelector(".profile__editbutton");
let popup = document.querySelector(".popup");

function openPopup() {
    popup.classList.add("popup_opened");
}

profile__editbutton.addEventListener("click", openPopup);

let closeIcon = document.querySelector(".close-icon");
function closePopup() {
    popup.classList.remove("popup_opened");
}
closeIcon.addEventListener("click", closePopup);

let formElement = document.querySelector(".edit-form");
let nameInput = formElement.querySelector("#name");
let jobInput = formElement.querySelector("#description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    let profile__name = document.querySelector(".profile__name");
    let profile__discription = document.querySelector(".profile__discription");

    profile__name.textContent = nameInput.value;
    profile__discription.textContent = jobInput.value;
    popup.classList.remove("popup_opened");
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
