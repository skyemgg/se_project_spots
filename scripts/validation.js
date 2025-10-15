const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`.${inputEl.id}-error`);
  errorMsgEL.textContent = errorMsg;
  inputEl.classList.add(inputErrorClass, config);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = formEl.querySelector(`.${inputEl.id}-error`);
  errorMsgEL.textContent = "";
  inputEl.classList.romove(inputErrorClass, config);
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl);
  } else {
    buttonEl.disable = false;
    buttonEl.classList.remove("modal__submit-button_inactive");
  }
};

const disableButton = (buttonEL) => {
  buttonEl.disable = true;
  buttonEl.classList.add("modal__submit-button_inactive");
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config, inputSelector));
  const buttonEl = formEl.querySelector(config, submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

const enableValidation = (config) => {};
const formList = document.querySelector(config, formSelector);
formList.forEach((formEl) => {
  setEventListeners(formEl, config);
  //formEl.addEventListener("submit", function (evt) {
  //evt.preventDefault();
});

enableValidation(settings);
