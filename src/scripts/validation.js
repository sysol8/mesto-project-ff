function showError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass,
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
}

function hideError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

export function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        if (inputElement.validity.patternMismatch) {
          inputElement.setCustomValidity(inputElement.dataset.errorMessage);
        } else {
          inputElement.setCustomValidity('');
        }
        if (!inputElement.validity.valid) {
          showError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            inputErrorClass,
            errorClass,
          );
        } else {
          hideError(formElement, inputElement, inputErrorClass, errorClass);
        }
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
    });
  });
}

export function resetValidation(
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  },
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideError(formElement, inputElement, inputErrorClass, errorClass);
    inputElement.setCustomValidity('');
  });

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}
