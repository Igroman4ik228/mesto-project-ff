import { addCard, getInitialCards, getUserInfo, removeCard, updateUserAvatar, updateUserInfo, validateImageUrl } from './components/api.js';
import { createCard, likeCard } from './components/card.js';
import { closeModal, handleOverlayOrCloseBtn, openModal } from './components/modal.js';
import { clearValidation, enableValidation, handleErrorLink } from './components/validation.js';
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

const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let infoForDeleteCard = {};

// Функция подтверждения удаления карточки 
const confirmDeleteCard = (cardElement, cardId) => {
  infoForDeleteCard.elementCardForDelete = cardElement;
  infoForDeleteCard.cardIdForDelete = cardId;

  openModal(popupConfirmDelete)
};

const cardActions = {
  confirmDeleteCardFunc: confirmDeleteCard,
  showCardFunc: showCard,
  likeCardFunc: likeCard
};

// Функция открытия карточки
function showCard(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  openModal(popupTypeImage);
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = popupTypeEdit.querySelector(".popup__button")

  renderLoading(submitButton, true)
  // Обновление данных профиля
  updateUserInfo(nameInput.value, descInput.value)
    .then(res => {
      profileName.textContent = res.name;
      profileDesc.textContent = res.about;

      closeModal(popupTypeEdit);
    })
    .catch(err => console.error(err))
    .finally(() => renderLoading(submitButton, false));
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = popupTypeAvatar.querySelector(".popup__button")
  const url = linkInputAvatar.value

  renderLoading(submitButton, true)
  // Проверка URL
  validateImageUrl(url)
    .then(isValidUrl => {
      if (!isValidUrl) {
        const linkInputAvatarError = popupTypeAvatar.querySelector(".link-input-avatar-error");

        handleErrorLink({
          inputElement: linkInputAvatar,
          linkInputError: linkInputAvatarError,
          submitButton: submitButton
        }, validationConfig);
        return;
      };

      // Обновление аватарки профиля
      updateUserAvatar(url)
        .then(res => profileImage.style.backgroundImage = `url(${res.avatar})`)
        .catch(err => console.error(err));

      closeModal(popupTypeAvatar);
    })
    .catch(err => console.error(err))
    .finally(() => renderLoading(submitButton, false));
};

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = popupTypeNewCard.querySelector(".popup__button")
  const url = linkInput.value

  renderLoading(submitButton, true)
  // Проверка URL
  validateImageUrl(url)
    .then(isValidUrl => {
      if (!isValidUrl) {
        const linkInputError = popupTypeNewCard.querySelector(".link-input-error");
        handleErrorLink({
          inputElement: linkInput,
          linkInputError: linkInputError,
          submitButton: submitButton
        }, validationConfig);
        return;
      };

      // Добавление карточки
      addCard(placeNameInput.value, linkInput.value)
        .then(newCardData => {
          const resultCard = createCard({
            cardData: newCardData,
            isOwner: true,
            isLiked: false
          }, cardActions);
          placesList.prepend(resultCard);

          // Очистка формы
          const newCardForm = popupTypeNewCard.querySelector('.popup__form');
          newCardForm.reset();
          clearValidation(newCardForm, validationConfig);

          closeModal(popupTypeNewCard);
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err))
    .finally(() => renderLoading(submitButton, false));
};

function handleConfirmDeleteFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = popupConfirmDelete.querySelector(".popup__button")

  renderLoading(submitButton, true, { messageLoading: "Удаление..." })
  // Удаление карточки
  removeCard(infoForDeleteCard.cardIdForDelete)
    .then(() => {
      infoForDeleteCard.elementCardForDelete.remove();
      closeModal(popupConfirmDelete);
    })
    .catch(err => console.error(err))
    .finally(() => renderLoading(submitButton, false, { messageBack: "Да" }));
};

function renderLoading(submitButton, isLoading,
  { messageLoading = "Сохранение...", messageBack = "Сохранить" } = {}) {
  submitButton.textContent = isLoading ? messageLoading : messageBack;
}

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

      const resultCard = createCard({
        cardData: cardData,
        isOwner: isOwner,
        isLiked: isLiked
      }, cardActions);
      placesList.append(resultCard);
    });
  })
  .catch(err => console.error(err))

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
popupTypeEdit.addEventListener('submit', handleProfileFormSubmit);

popupTypeAvatar.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeAvatar.addEventListener('submit', handleAvatarFormSubmit);

popupTypeNewCard.addEventListener('click', handleOverlayOrCloseBtn);
popupTypeNewCard.addEventListener('submit', handleNewCardFormSubmit);

popupConfirmDelete.addEventListener('click', handleOverlayOrCloseBtn);
popupConfirmDelete.addEventListener('submit', handleConfirmDeleteFormSubmit);

popupTypeImage.addEventListener('click', handleOverlayOrCloseBtn);
