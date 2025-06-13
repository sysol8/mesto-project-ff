function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_is-invalid");
  errorElement.classList.add("error_is-visible");
  errorElement.textContent = errorMessage;
}

function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_is-invalid");
  errorElement.classList.remove("error_is-visible");
  errorElement.textContent = "";
}

function checkValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement)
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__button");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkValidity(formElement, inputElement);
    });
  });
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  });
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
