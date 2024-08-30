import { getInitialCards, getUserInfo, updateUserAvatar, updateUserInfo } from './components/api.js';
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
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, initialCards]) => {
    profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    profileName.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;

    initialCards.forEach((initialCard) => {
      const resultCard = createCard(initialCard, deleteCard, likeCard, showCard);
      placesList.append(resultCard);
    });
  });

// Функция открытия карточки
function showCard(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  openModal(popupTypeImage);
}

// Функция обработки формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const modal = evt.currentTarget;
  if (modal === popupTypeEdit) {
    profileName.textContent = nameInput.value
    profileDesc.textContent = descInput.value;
  }
  else if (modal === popupTypeNewCard) {
    const cardData = {
      name: placeNameInput.value,
      link: linkInput.value,
    }
    const resultCard = createCard(cardData, deleteCard, likeCard, showCard);
    placesList.prepend(resultCard);

    const form = modal.querySelector('.popup__form');

    form.reset();
  }
  else if (modal === popupTypeAvatar) {
    profileImage.style.backgroundImage = `url(${linkInputAvatar.value})`;
    updateUserAvatar(linkInputAvatar.value);
  }

  // Обновление данных профиля на сервере
  updateUserInfo(nameInput.value, descInput.value);

  closeModal(modal);
}

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
profileAddButton.addEventListener('click', () => {
  // Очистка ошибок валидации
  const profileForm = popupTypeNewCard.querySelector(".popup__form");
  clearValidation(profileForm, validationConfig);

  openModal(popupTypeNewCard);
});

profileImage.addEventListener('click', () => {
  openModal(popupTypeAvatar);
});

// Включение валидации форм
enableValidation(validationConfig);

// Другие слушатели
popupTypeImage.addEventListener('click', handleOverlayOrCloseBtn);

popupTypeEdit.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeEdit.addEventListener('submit', handleFormSubmit);

popupTypeNewCard.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeNewCard.addEventListener('submit', handleFormSubmit);

popupTypeAvatar.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeAvatar.addEventListener('submit', handleFormSubmit);
