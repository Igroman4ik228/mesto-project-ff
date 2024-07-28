import './pages/index.css';
import initialCards from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, handlePressEscape, handleOverlayOrCloseBtn } from './components/modal.js';

// DOM узлы
const placesList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const placeNameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const linkInput = popupTypeNewCard.querySelector('.popup__input_type_url');

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Вывод начальных карточек
initialCards.forEach((initialCard) => {
  const resultCard = createCard(initialCard, deleteCard, likeCard, showCard);
  placesList.append(resultCard);
});

// Функция открытия карточки
function showCard(evt) {
  popupImage.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  document.addEventListener('keydown', handlePressEscape);
  popupTypeImage.addEventListener('click', handleOverlayOrCloseBtn);

  openModal(popupTypeImage);
}

// Слушатель для кнопки редактирования профиля
profileEditButton.addEventListener('click', () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  document.addEventListener('keydown', handlePressEscape);
  popupTypeEdit.addEventListener('click', handleOverlayOrCloseBtn);
  popupTypeEdit.addEventListener('submit', handleFormSubmit);

  openModal(popupTypeEdit);
});

// Слушатель для кнопки добавления новой карточки
profileAddButton.addEventListener('click', () => {
  document.addEventListener('keydown', handlePressEscape);
  popupTypeNewCard.addEventListener('click', handleOverlayOrCloseBtn);
  popupTypeNewCard.addEventListener('submit', handleFormSubmit);

  openModal(popupTypeNewCard);
});

// Функция обработки формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const modal = evt.currentTarget;
  if (modal === popupTypeEdit) {
    name.textContent = nameInput.value
    job.textContent = jobInput.value;
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

  closeModal(modal);
}
