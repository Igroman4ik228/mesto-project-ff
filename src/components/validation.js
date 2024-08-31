function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

  buttonElement.classList.add(validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(profileForm,
      inputElement,
      validationConfig.inputErrorClass,
      validationConfig.errorClass);
  });
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
  if (hasInvalidInput(inputList))
    buttonElement.classList.add(inactiveButtonClass);
  else
    buttonElement.classList.remove(inactiveButtonClass);
};

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid
  });
};

function showInputError(formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};

function hideInputError(formElement,
  inputElement,
  inputErrorClass,
  errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
};

export { clearValidation, enableValidation };
