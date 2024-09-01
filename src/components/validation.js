function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(profileForm,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass);
  });
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
};

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement,
        inputElement,
        validationConfig.inputErrorClass,
        validationConfig.errorClass);

      toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
    });
  });
};

function checkInputValidity(formElement,
  inputElement,
  inputErrorClass,
  errorClass) {
  if (inputElement.validity.patternMismatch)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  else
    inputElement.setCustomValidity("");

  if (!inputElement.validity.valid)
    showInputError(formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass);
  else
    hideInputError(formElement,
      inputElement,
      inputErrorClass,
      errorClass);
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }

};

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid
  });
};

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  inputElement.setCustomValidity("");
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
};

// Обработчик для ошибок валидации ссылок
function handleErrorLink(elements, validationConfig,
  message = "Неверная ссылка на изображение или файл не доступен.") {
  const { inputElement, linkInputError, submitButton } = elements;

  linkInputError.textContent = message;
  linkInputError.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;
};

export { clearValidation, enableValidation, handleErrorLink };

