import { addCard, getInitialCards, getUserInfo, updateUserAvatar, updateUserInfo, validateImageUrl } from './components/api.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { closeModal, handleOverlayOrCloseBtn, openModal } from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';
import './pages/index.css';

// DOM узлы
const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const descInput = popupTypeEdit.querySelector('.popup__input_type_description');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placeNameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const linkInput = popupTypeNewCard.querySelector('.popup__input_type_url');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const linkInputAvatar = popupTypeAvatar.querySelector('.popup__input_type_url');

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


// Функция открытия карточки
function showCard(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  openModal(popupTypeImage);
};

// Функция для ошибок валидации ссылок
function handleErrorLink(input,
  errorElement,
  submitButton,
  message = "Неверная ссылка на изображение или файл не доступен.") {
  errorElement.textContent = message;
  errorElement.classList.add(validationConfig.errorClass);
  input.classList.add(validationConfig.inputErrorClass);
  submitButton.classList.toggle(validationConfig.inactiveButtonClass);
}

// Функция обработки формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const modal = evt.currentTarget;
  const submitButton = modal.querySelector(".popup__button")
  submitButton.textContent = "Сохранение...";
  if (modal === popupTypeEdit) {
    // Обновление данных профиля
    updateUserInfo(nameInput.value, descInput.value)
      .then(() => {
        profileName.textContent = nameInput.value
        profileDesc.textContent = descInput.value;

        closeModal(modal);
      })
      .finally(() => submitButton.textContent = "Сохранить");
  }
  else if (modal === popupTypeNewCard) {
    const url = linkInput.value
    // Проверка URL
    validateImageUrl(url)
      .then(isValidUrl => {
        if (!isValidUrl) {
          const linkInputError = popupTypeNewCard.querySelector(".link-input-error");
          handleErrorLink(linkInput, linkInputError, submitButton)
          return;
        };

        // Добавление карточки
        addCard(placeNameInput.value, linkInput.value)
          .then((newCardData) => {
            const resultCard = createCard(newCardData, true, false, deleteCard, likeCard, showCard);
            placesList.prepend(resultCard);

            // Очистка формы
            const form = modal.querySelector('.popup__form');
            form.reset();

            // Очистка ошибок валидации
            const newCardForm = modal.querySelector(".popup__form");
            clearValidation(newCardForm, validationConfig);

            closeModal(modal);
          });
      })
      .finally(() => submitButton.textContent = "Сохранить");
  }
  else if (modal === popupTypeAvatar) {
    const url = linkInputAvatar.value
    // Проверка URL
    validateImageUrl(url)
      .then(isValidUrl => {
        if (!isValidUrl) {
          const linkInputAvatarError = popupTypeAvatar.querySelector(".link-input-avatar-error");
          handleErrorLink(linkInputAvatar, linkInputAvatarError, submitButton);
          return;
        };

        // Обновление аватарки профиля
        updateUserAvatar(url)
          .then(() => {
            profileImage.style.backgroundImage = `url(${url})`
          });

        closeModal(modal);
      })
      .finally(() => submitButton.textContent = "Сохранить");
  }
};

// Включение валидации форм
enableValidation(validationConfig);

// Загрузка начальных данных
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    profileName.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;

    initialCards.forEach(cardData => {
      const isOwner = userInfo._id === cardData.owner._id
      const isLiked = cardData.likes.some(like => like._id === userInfo._id);

      const resultCard = createCard(cardData, isOwner, isLiked, deleteCard, likeCard, showCard);
      placesList.append(resultCard);
    });
  });

// Слушатель для кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descInput.value = profileDesc.textContent;

  // Очистка ошибок валидации
  const profileForm = popupTypeEdit.querySelector(".popup__form");
  clearValidation(profileForm, validationConfig);

  openModal(popupTypeEdit);
});

// Слушатель для кнопки добавления новой карточки
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

// Слушатель для кнопки редактирования аватарки
profileImage.addEventListener('click', () => {
  const imageUrl = profileImage.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/, '$1');
  linkInputAvatar.value = imageUrl;

  // Очистка ошибок валидации
  const avatarForm = popupTypeAvatar.querySelector(".popup__form");
  clearValidation(avatarForm, validationConfig);

  openModal(popupTypeAvatar)
});


// Другие слушатели
popupTypeEdit.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeEdit.addEventListener('submit', handleFormSubmit);

popupTypeAvatar.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeAvatar.addEventListener('submit', handleFormSubmit);

popupTypeNewCard.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeNewCard.addEventListener('submit', handleFormSubmit);

popupTypeImage.addEventListener('click', handleOverlayOrCloseBtn);
